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
export const getUserReadings = async (limit = 10, page = 0) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');
    
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
