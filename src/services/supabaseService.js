import supabase from './supabase';

/**
 * Authentication Services
 */

// Sign up with email and password
export const signUp = async (email, password, userData = {}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error signing up:', error.message);
    return { data: null, error };
  }
};

// Sign in with email and password
export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error signing in:', error.message);
    return { data: null, error };
  }
};

// Sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error signing out:', error.message);
    return { error };
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error resetting password:', error.message);
    return { data: null, error };
  }
};

// Get the current session
export const getCurrentSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { session: data.session, error: null };
  } catch (error) {
    console.error('Error getting current session:', error.message);
    return { session: null, error };
  }
};

// Get the current user
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user: data.user, error: null };
  } catch (error) {
    console.error('Error getting current user:', error.message);
    return { user: null, error };
  }
};

/**
 * User Profile Services
 */

// Get a user's profile
export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return { profile: data, error: null };
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    return { profile: null, error };
  }
};

// Update a user's profile
export const updateUserProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating user profile:', error.message);
    return { data: null, error };
  }
};

// Set up the auth state change listener
export const setupAuthListener = (callback) => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
  
  return data.subscription; // Return subscription for cleanup
};

/**
 * Tarot Reading Services
 */

// Save a reading to the database
export const saveReading = async (readingData) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('readings')
      .insert({
        user_id: user.user.id,
        question: readingData.question,
        spread_type: readingData.spread.id,
        reading_data: readingData.cards,
        interpretation: readingData.interpretation
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error saving reading:', error.message);
    return { data: null, error };
  }
};

// Get a reading by ID
export const getReadingById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('readings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { reading: data, error: null };
  } catch (error) {
    console.error('Error fetching reading:', error.message);
    return { reading: null, error };
  }
};

// Get all readings for the current user
export const getUserReadings = async (limit = 10, page = 0, countOnly = false) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');
    
    // If countOnly is true, just get the count without fetching the actual data
    if (countOnly) {
      const { count, error } = await supabase
        .from('readings')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.user.id);
        
      if (error) throw error;
      return { readings: [], count, error: null };
    }
    
    const { data, error, count } = await supabase
      .from('readings')
      .select('*', { count: 'exact' })
      .eq('user_id', user.user.id)
      .order('created_at', { ascending: false })
      .range(page * limit, (page + 1) * limit - 1);

    if (error) throw error;
    return { readings: data, count, error: null };
  } catch (error) {
    console.error('Error fetching user readings:', error.message);
    return { readings: [], count: 0, error };
  }
};

// Delete a reading
export const deleteReading = async (id) => {
  try {
    const { error } = await supabase
      .from('readings')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting reading:', error.message);
    return { error };
  }
};

/**
 * Journal Services
 */

// Create a new journal entry
export const createJournalEntry = async (journalData) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('journals')
      .insert({
        user_id: user.user.id,
        title: journalData.title,
        content: journalData.content,
        mood: journalData.mood,
        reading_id: journalData.readingId || null
      })
      .select()
      .single();

    if (error) throw error;
    
    // If tags were provided, add them to the journal entry
    if (journalData.tags && journalData.tags.length > 0) {
      await addTagsToJournal(data.id, journalData.tags);
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Error creating journal entry:', error.message);
    return { data: null, error };
  }
};

// Update an existing journal entry
export const updateJournalEntry = async (id, journalData) => {
  try {
    const { data, error } = await supabase
      .from('journals')
      .update({
        title: journalData.title,
        content: journalData.content,
        mood: journalData.mood,
        reading_id: journalData.readingId || null,
        updated_at: new Date()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    // If tags were provided, update them
    if (journalData.tags) {
      // First remove all existing tags
      await removeAllTagsFromJournal(id);
      
      // Then add the new tags
      if (journalData.tags.length > 0) {
        await addTagsToJournal(id, journalData.tags);
      }
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Error updating journal entry:', error.message);
    return { data: null, error };
  }
};

// Get a journal entry by ID
export const getJournalById = async (id) => {
  try {
    const { data: journal, error: journalError } = await supabase
      .from('journals')
      .select('*')
      .eq('id', id)
      .single();

    if (journalError) throw journalError;
    
    // Get tags for this journal entry
    const { tags } = await getJournalTags(id);
    
    return { journal: { ...journal, tags }, error: null };
  } catch (error) {
    console.error('Error fetching journal entry:', error.message);
    return { journal: null, error };
  }
};

// Get all journal entries for the current user
export const getUserJournals = async (limit = 10, page = 0, filters = {}, countOnly = false) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');
    
    // If countOnly is true, just get the count without fetching the actual data
    if (countOnly) {
      const { count, error } = await supabase
        .from('journals')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.user.id);
        
      if (error) throw error;
      return { journals: [], count, error: null };
    }
    
    let hasTags = filters.tags && filters.tags.length > 0;
    
    // Determine if we need to join with tag mappings
    let query;
    
    if (hasTags) {
      // When filtering by tags, we need to use a more complex query
      // First, get journals that match tag filters
      query = supabase
        .from('journals')
        .select(`
          *,
          journal_tag_mappings!inner(tag_id)
        `, { count: 'exact' })
        .eq('user_id', user.user.id);
      
      // Filter by tags - ensure journal has ALL selected tags (AND logic)
      filters.tags.forEach(tagId => {
        query = query.or(`journal_tag_mappings.tag_id.eq.${tagId}`);
      });
    } else {
      // Simple query without tag filtering
      query = supabase
        .from('journals')
        .select('*', { count: 'exact' })
        .eq('user_id', user.user.id);
    }
    
    // Apply other filters
    if (filters.readingId === 'has_reading') {
      query = query.not('reading_id', 'is', null);
    } else if (filters.readingId === 'no_reading') {
      query = query.is('reading_id', null);
    } else if (filters.readingId) {
      query = query.eq('reading_id', filters.readingId);
    }
    
    if (filters.mood) {
      query = query.eq('mood', filters.mood);
    }
    
    if (filters.dateRange && filters.dateRange.startDate) {
      query = query.gte('created_at', filters.dateRange.startDate);
    }
    
    if (filters.dateRange && filters.dateRange.endDate) {
      query = query.lte('created_at', filters.dateRange.endDate);
    }
    
    if (filters.search && filters.search.trim()) {
      // Enhanced search to handle partial word matches and improve relevance
      const searchTerms = filters.search.trim().split(/\s+/);
      
      // Build OR conditions for each search term
      const searchConditions = searchTerms.map(term => {
        return `or(title.ilike.%${term}%,content.ilike.%${term}%)`
      }).join(',');
      
      query = query.or(searchConditions);
    }
    
    // Apply sorting and pagination
    // Default to newest first
    const sortField = filters.sortField || 'created_at';
    const sortDirection = filters.sortDirection || false; // false = descending
    
    const { data, error, count } = await query
      .order(sortField, { ascending: sortDirection })
      .range(page * limit, (page + 1) * limit - 1);

    if (error) throw error;
    
    // Get tags for each journal entry
    const journalsWithTags = await Promise.all(
      data.map(async (journal) => {
        const { tags } = await getJournalTags(journal.id);
        return { ...journal, tags };
      })
    );
    
    return { journals: journalsWithTags, count, error: null };
  } catch (error) {
    console.error('Error fetching user journals:', error.message);
    return { journals: [], count: 0, error };
  }
};

// Delete a journal entry
export const deleteJournal = async (id) => {
  try {
    // Due to ON DELETE CASCADE, this will also delete associated tag mappings
    const { error } = await supabase
      .from('journals')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting journal entry:', error.message);
    return { error };
  }
};

/**
 * Journal Tags Services
 */

// Create a new tag
export const createTag = async (tagName) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');
    
    // Check if tag already exists for this user
    const { data: existingTag } = await supabase
      .from('journal_tags')
      .select('*')
      .eq('user_id', user.user.id)
      .eq('name', tagName)
      .maybeSingle();
    
    if (existingTag) {
      return { data: existingTag, error: null };
    }
    
    // Create new tag if it doesn't exist
    const { data, error } = await supabase
      .from('journal_tags')
      .insert({
        user_id: user.user.id,
        name: tagName
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating tag:', error.message);
    return { data: null, error };
  }
};

// Get all tags for the current user
export const getUserTags = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('journal_tags')
      .select('*')
      .eq('user_id', user.user.id)
      .order('name');

    if (error) throw error;
    return { tags: data, error: null };
  } catch (error) {
    console.error('Error fetching user tags:', error.message);
    return { tags: [], error };
  }
};

// Delete a tag
export const deleteTag = async (id) => {
  try {
    const { error } = await supabase
      .from('journal_tags')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting tag:', error.message);
    return { error };
  }
};

/**
 * Journal Tag Mapping Services
 */

// Get all tags for a specific journal entry
export const getJournalTags = async (journalId) => {
  try {
    const { data, error } = await supabase
      .from('journal_tag_mappings')
      .select(`
        tag_id,
        journal_tags (
          id,
          name
        )
      `)
      .eq('journal_id', journalId);

    if (error) throw error;
    
    // Transform the data to a more usable format
    const tags = data.map(item => ({
      id: item.journal_tags.id,
      name: item.journal_tags.name
    }));
    
    return { tags, error: null };
  } catch (error) {
    console.error('Error fetching journal tags:', error.message);
    return { tags: [], error };
  }
};

// Add a tag to a journal entry
export const addTagToJournal = async (journalId, tagId) => {
  try {
    const { data, error } = await supabase
      .from('journal_tag_mappings')
      .insert({
        journal_id: journalId,
        tag_id: tagId
      })
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error adding tag to journal:', error.message);
    return { data: null, error };
  }
};

// Helper function to add multiple tags to a journal entry
export const addTagsToJournal = async (journalId, tagNames) => {
  try {
    // First, ensure all tags exist (create them if they don't)
    const tagPromises = tagNames.map(name => createTag(name));
    const tagResults = await Promise.all(tagPromises);
    
    // Then map tags to the journal
    const mappingPromises = tagResults.map(result => {
      if (result.data) {
        return addTagToJournal(journalId, result.data.id);
      }
      return Promise.resolve({ data: null, error: new Error('Failed to create tag') });
    });
    
    await Promise.all(mappingPromises);
    
    return { error: null };
  } catch (error) {
    console.error('Error adding tags to journal:', error.message);
    return { error };
  }
};

// Remove a tag from a journal entry
export const removeTagFromJournal = async (journalId, tagId) => {
  try {
    const { error } = await supabase
      .from('journal_tag_mappings')
      .delete()
      .eq('journal_id', journalId)
      .eq('tag_id', tagId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error removing tag from journal:', error.message);
    return { error };
  }
};

// Remove all tags from a journal entry
export const removeAllTagsFromJournal = async (journalId) => {
  try {
    const { error } = await supabase
      .from('journal_tag_mappings')
      .delete()
      .eq('journal_id', journalId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error removing all tags from journal:', error.message);
    return { error };
  }
};
