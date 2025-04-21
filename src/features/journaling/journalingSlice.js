import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createJournalEntry,
  updateJournalEntry,
  getJournalById,
  getUserJournals,
  deleteJournal,
  getUserTags,
  createTag,
  deleteTag,
} from '../../services/supabaseService';

/**
 * Async thunk for creating a new journal entry
 */
export const createJournal = createAsyncThunk(
  'journaling/createJournal',
  async (journalData, { rejectWithValue }) => {
    try {
      console.log('Creating new journal entry:', journalData);

      const { data, error } = await createJournalEntry(journalData);

      if (error) throw new Error(error.message);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk for updating an existing journal entry
 */
export const updateJournal = createAsyncThunk(
  'journaling/updateJournal',
  async ({ id, journalData }, { rejectWithValue }) => {
    try {
      console.log('Updating journal entry:', { id, journalData });

      const { data, error } = await updateJournalEntry(id, journalData);

      if (error) throw new Error(error.message);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk for fetching a journal entry by ID
 */
export const fetchJournal = createAsyncThunk(
  'journaling/fetchJournal',
  async (id, { rejectWithValue }) => {
    try {
      console.log('Fetching journal entry:', id);

      const { journal, error } = await getJournalById(id);

      if (error) throw new Error(error.message);

      return journal;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk for fetching user's journal entries
 */
export const fetchJournals = createAsyncThunk(
  'journaling/fetchJournals',
  async ({ limit = 10, page = 0, filters = {} }, { rejectWithValue }) => {
    try {
      console.log('Fetching journal entries:', { limit, page, filters });

      const { journals, count, error } = await getUserJournals(
        limit,
        page,
        filters
      );

      if (error) throw new Error(error.message);

      return { journals, count };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk for deleting a journal entry
 */
export const deleteJournalEntry = createAsyncThunk(
  'journaling/deleteJournalEntry',
  async (id, { rejectWithValue }) => {
    try {
      console.log('Deleting journal entry:', id);

      const { error } = await deleteJournal(id);

      if (error) throw new Error(error.message);

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk for fetching user's tags
 */
export const fetchTags = createAsyncThunk(
  'journaling/fetchTags',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching user tags');

      const { tags, error } = await getUserTags();

      if (error) throw new Error(error.message);

      return tags;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk for creating a new tag
 */
export const addTag = createAsyncThunk(
  'journaling/addTag',
  async (tagName, { rejectWithValue }) => {
    try {
      console.log('Creating new tag:', tagName);

      const { data, error } = await createTag(tagName);

      if (error) throw new Error(error.message);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk for deleting a tag
 */
export const removeTag = createAsyncThunk(
  'journaling/removeTag',
  async (id, { rejectWithValue }) => {
    try {
      console.log('Deleting tag:', id);

      const { error } = await deleteTag(id);

      if (error) throw new Error(error.message);

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Journaling Slice
 */
const journalingSlice = createSlice({
  name: 'journaling',

  initialState: {
    // Current journal entry being viewed or edited
    currentJournal: null,

    // List of journal entries
    entries: [],
    totalEntries: 0,

    // Available tags
    tags: [],

    // Form state for creating/editing
    formData: {
      title: '',
      content: '',
      mood: '',
      tags: [],
      readingId: null,
    },

    // Filters for journal list
    filters: {
      search: '',
      tags: [],
      mood: '',
      dateRange: null,
      readingId: null,
      sortField: 'created_at',
      sortDirection: false // false = descending, true = ascending
    },

    // Pagination
    pagination: {
      page: 0,
      limit: 10,
    },

    // UI states
    isCreating: false,
    isUpdating: false,
    isFetching: false,
    isDeleting: false,
    isLoadingTags: false,

    // Errors
    error: null,
  },

  reducers: {
    // Update form data for creating/editing journals
    updateFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },

    // Reset form data
    resetForm: (state) => {
      state.formData = {
        title: '',
        content: '',
        mood: '',
        tags: [],
        readingId: null,
      };
      state.currentJournal = null;
    },

    // Set current journal for editing
    setCurrentJournal: (state, action) => {
      state.currentJournal = action.payload;
      if (action.payload) {
        // Prepopulate form with journal data
        state.formData = {
          title: action.payload.title,
          content: action.payload.content,
          mood: action.payload.mood || '',
          tags: action.payload.tags || [],
          readingId: action.payload.reading_id,
        };
      }
    },

    // Update filters
    updateFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
      // Reset to first page when filters change
      state.pagination.page = 0;
    },

    // Clear all filters
    clearFilters: (state) => {
      state.filters = {
        search: '',
        tags: [],
        mood: '',
        dateRange: null,
        readingId: null,
        sortField: 'created_at',
        sortDirection: false
      };
      state.pagination.page = 0;
    },

    // Update pagination
    setPagination: (state, action) => {
      state.pagination = {
        ...state.pagination,
        ...action.payload,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      // Create journal entry
      .addCase(createJournal.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createJournal.fulfilled, (state, action) => {
        state.isCreating = false;
        // Add new journal to entries list if it exists
        if (state.entries.length) {
          state.entries.unshift(action.payload);
          state.totalEntries++;
        }
        // Clear form after successful creation
        state.formData = {
          title: '',
          content: '',
          mood: '',
          tags: [],
          readingId: null,
        };
      })
      .addCase(createJournal.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload || 'Failed to create journal entry';
      })

      // Update journal entry
      .addCase(updateJournal.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateJournal.fulfilled, (state, action) => {
        state.isUpdating = false;

        // Update entry in the list if it exists
        const index = state.entries.findIndex(
          (entry) => entry.id === action.payload.id
        );
        if (index !== -1) {
          state.entries[index] = action.payload;
        }

        // Update current journal if it's the one being edited
        if (
          state.currentJournal &&
          state.currentJournal.id === action.payload.id
        ) {
          state.currentJournal = action.payload;
        }
      })
      .addCase(updateJournal.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload || 'Failed to update journal entry';
      })

      // Fetch single journal entry
      .addCase(fetchJournal.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchJournal.fulfilled, (state, action) => {
        state.isFetching = false;
        state.currentJournal = action.payload;

        // Prepopulate form with journal data
        state.formData = {
          title: action.payload.title,
          content: action.payload.content,
          mood: action.payload.mood || '',
          tags: action.payload.tags || [],
          readingId: action.payload.reading_id,
        };
      })
      .addCase(fetchJournal.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload || 'Failed to fetch journal entry';
      })

      // Fetch journal entries
      .addCase(fetchJournals.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchJournals.fulfilled, (state, action) => {
        state.isFetching = false;
        state.entries = action.payload.journals;
        state.totalEntries = action.payload.count;
      })
      .addCase(fetchJournals.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload || 'Failed to fetch journal entries';
      })

      // Delete journal entry
      .addCase(deleteJournalEntry.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteJournalEntry.fulfilled, (state, action) => {
        state.isDeleting = false;

        // Remove entry from list
        state.entries = state.entries.filter(
          (entry) => entry.id !== action.payload
        );
        state.totalEntries--;

        // Clear current journal if it's the one being deleted
        if (
          state.currentJournal &&
          state.currentJournal.id === action.payload
        ) {
          state.currentJournal = null;
          state.formData = {
            title: '',
            content: '',
            mood: '',
            tags: [],
            readingId: null,
          };
        }
      })
      .addCase(deleteJournalEntry.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload || 'Failed to delete journal entry';
      })

      // Fetch tags
      .addCase(fetchTags.pending, (state) => {
        state.isLoadingTags = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.isLoadingTags = false;
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.isLoadingTags = false;
        state.error = action.payload || 'Failed to fetch tags';
      })

      // Add tag
      .addCase(addTag.fulfilled, (state, action) => {
        // Add tag to list if it doesn't exist
        if (!state.tags.find((tag) => tag.id === action.payload.id)) {
          state.tags.push(action.payload);
          // Sort tags alphabetically
          state.tags.sort((a, b) => a.name.localeCompare(b.name));
        }
      })

      // Remove tag
      .addCase(removeTag.fulfilled, (state, action) => {
        // Remove tag from list
        state.tags = state.tags.filter((tag) => tag.id !== action.payload);

        // Remove tag from filter if it's being used
        if (state.filters.tags.includes(action.payload)) {
          state.filters.tags = state.filters.tags.filter(
            (id) => id !== action.payload
          );
        }
      });
  },
});

// Export actions
export const {
  updateFormData,
  resetForm,
  setCurrentJournal,
  updateFilters,
  clearFilters,
  setPagination,
} = journalingSlice.actions;

// Export selectors
export const selectCurrentJournal = (state) => state.journaling.currentJournal;
export const selectJournalEntries = (state) => state.journaling.entries;
export const selectTotalEntries = (state) => state.journaling.totalEntries;
export const selectTags = (state) => state.journaling.tags;
export const selectFormData = (state) => state.journaling.formData;
export const selectFilters = (state) => state.journaling.filters;
export const selectPagination = (state) => state.journaling.pagination;
export const selectIsCreating = (state) => state.journaling.isCreating;
export const selectIsUpdating = (state) => state.journaling.isUpdating;
export const selectIsFetching = (state) => state.journaling.isFetching;
export const selectIsDeleting = (state) => state.journaling.isDeleting;
export const selectIsLoadingTags = (state) => state.journaling.isLoadingTags;
export const selectError = (state) => state.journaling.error;

// Export reducer
export default journalingSlice.reducer;
