import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { interpretReading } from '../../services/interpretationService';
import { saveReading as saveReadingToDb, getUserReadings } from '../../services/supabaseService';

/**
 * Async thunk for generating tarot reading interpretations
 * Uses the interpretation service to generate AI-based readings
 */
export const generateInterpretation = createAsyncThunk(
  'tarotReading/generateInterpretation',
  async ({ question, spread, cards }, { rejectWithValue }) => {
    try {
      console.log('Generating interpretation for:', {
        question,
        spread,
        cards,
      });
      
      // Call the interpretation service
      const { interpretation, error } = await interpretReading({ question, spread, cards });
      
      if (error) throw new Error(error);
      
      // Add additional metadata to the interpretation
      const enhancedInterpretation = {
        ...interpretation,
        timestamp: new Date().toISOString(),
        id: `reading-${Date.now()}`
      };
      
      return enhancedInterpretation;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk for saving a reading to the database
 */
export const saveReading = createAsyncThunk(
  'tarotReading/saveReading',
  async (readingData, { rejectWithValue }) => {
    try {
      console.log('Saving reading to database:', readingData);
      
      // Save to Supabase database
      const { data, error } = await saveReadingToDb(readingData);
      
      if (error) throw new Error(error.message);
      
      // Return saved reading with database ID
      return {
        ...readingData,
        id: data.id,
        saved: true,
        savedAt: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk for fetching user's reading history
 */
export const fetchReadingHistory = createAsyncThunk(
  'tarotReading/fetchReadingHistory',
  async ({ limit = 10, page = 0 }, { rejectWithValue }) => {
    try {
      console.log('Fetching reading history:', { limit, page });
      
      // Get readings from Supabase
      const { readings, count, error } = await getUserReadings(limit, page);
      
      if (error) throw new Error(error.message);
      
      return { readings, count };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Tarot Reading Slice
 */
const tarotReadingSlice = createSlice({
  name: 'tarotReading',

  initialState: {
    // Reading flow state
    activeStep: 'intent', // 'intent', 'spread', 'shuffle', 'draw', 'interpretation'

    // User question data
    question: '',
    focusArea: 'general',

    // Selected spread information
    selectedSpread: null,

    // Cards drawn for the reading
    selectedCards: [],

    // Interpretation of the reading
    interpretation: null,

    // Reading history
    readingHistory: [],
    totalReadings: 0,

    // UI state
    isShuffling: false,
    isGeneratingInterpretation: false,
    isSaving: false,
    isLoadingHistory: false,

    // Errors
    error: null,
  },

  reducers: {
    // Update the active step in the reading flow
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },

    // Set the user's question and focus area
    setQuestion: (state, action) => {
      const { question, focusArea } = action.payload;
      state.question = question;
      state.focusArea = focusArea || state.focusArea;

      // Move to the next step
      if (question) {
        state.activeStep = 'spread';
      }
    },

    // Set the selected spread for the reading
    setSelectedSpread: (state, action) => {
      state.selectedSpread = action.payload;

      // Move to the next step
      if (action.payload) {
        state.activeStep = 'shuffle';
      }
    },

    // Set shuffling state
    setShuffling: (state, action) => {
      state.isShuffling = action.payload;

      // When shuffling completes, move to the next step
      if (action.payload === false && state.activeStep === 'shuffle') {
        state.activeStep = 'draw';
      }
    },

    // Set selected cards for the reading
    setSelectedCards: (state, action) => {
      state.selectedCards = action.payload;

      // If we have all the cards needed for the spread, move to interpretation
      if (
        state.selectedSpread &&
        state.selectedCards.length === state.selectedSpread.layout.cardCount
      ) {
        state.activeStep = 'interpretation';
      }
    },

    // Add a single card to the reading
    addCard: (state, action) => {
      const card = action.payload;

      // Assign the card to the appropriate position based on current count
      const position =
        state.selectedSpread.positions[state.selectedCards.length];

      state.selectedCards.push({
        ...card,
        position: position.id,
        positionName: position.name,
        positionMeaning: position.meaning,
      });

      // If we have all the cards needed for the spread, move to interpretation
      if (
        state.selectedSpread &&
        state.selectedCards.length === state.selectedSpread.layout.cardCount
      ) {
        state.activeStep = 'interpretation';
      }
    },

    // Reset the reading state for a new reading
    resetReading: (state) => {
      // Save the current reading to history if it exists
      if (state.interpretation) {
        state.readingHistory.unshift({
          id: state.interpretation.id || `reading-${Date.now()}`,
          question: state.question,
          focusArea: state.focusArea,
          spread: state.selectedSpread,
          cards: state.selectedCards,
          interpretation: state.interpretation,
          timestamp: new Date().toISOString(),
        });
      }

      // Reset the reading state
      state.activeStep = 'intent';
      state.question = '';
      state.selectedSpread = null;
      state.selectedCards = [];
      state.interpretation = null;
      state.isShuffling = false;
      state.isGeneratingInterpretation = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Handle interpretation generation
      .addCase(generateInterpretation.pending, (state) => {
        state.isGeneratingInterpretation = true;
        state.error = null;
      })
      .addCase(generateInterpretation.fulfilled, (state, action) => {
        state.isGeneratingInterpretation = false;
        state.interpretation = action.payload;
      })
      .addCase(generateInterpretation.rejected, (state, action) => {
        state.isGeneratingInterpretation = false;
        state.error = action.payload || 'Failed to generate interpretation';
      })

      // Handle reading saving
      .addCase(saveReading.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(saveReading.fulfilled, (state, action) => {
        state.isSaving = false;

        // Find and update the reading in history if it exists
        const index = state.readingHistory.findIndex(
          (r) => r.id === action.payload.id
        );
        if (index !== -1) {
          state.readingHistory[index] = action.payload;
        } else {
          // Add to history if it doesn't exist
          state.readingHistory.unshift(action.payload);
        }
      })
      .addCase(saveReading.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload || 'Failed to save reading';
      })
      
      // Handle reading history fetching
      .addCase(fetchReadingHistory.pending, (state) => {
        state.isLoadingHistory = true;
        state.error = null;
      })
      .addCase(fetchReadingHistory.fulfilled, (state, action) => {
        state.isLoadingHistory = false;
        state.readingHistory = action.payload.readings;
        state.totalReadings = action.payload.count;
      })
      .addCase(fetchReadingHistory.rejected, (state, action) => {
        state.isLoadingHistory = false;
        state.error = action.payload || 'Failed to load reading history';
      });
  },
});

// Export actions
export const {
  setActiveStep,
  setQuestion,
  setSelectedSpread,
  setShuffling,
  setSelectedCards,
  addCard,
  resetReading,
} = tarotReadingSlice.actions;

// Export selectors
export const selectActiveStep = (state) => state.tarotReading.activeStep;
export const selectQuestion = (state) => state.tarotReading.question;
export const selectFocusArea = (state) => state.tarotReading.focusArea;
export const selectSelectedSpread = (state) =>
  state.tarotReading.selectedSpread;
export const selectSelectedCards = (state) => state.tarotReading.selectedCards;
export const selectInterpretation = (state) =>
  state.tarotReading.interpretation;
export const selectReadingHistory = (state) =>
  state.tarotReading.readingHistory;
export const selectTotalReadings = (state) => state.tarotReading.totalReadings;
export const selectIsShuffling = (state) => state.tarotReading.isShuffling;
export const selectIsGeneratingInterpretation = (state) =>
  state.tarotReading.isGeneratingInterpretation;
export const selectIsSaving = (state) => state.tarotReading.isSaving;
export const selectIsLoadingHistory = (state) => state.tarotReading.isLoadingHistory;
export const selectError = (state) => state.tarotReading.error;

// Export reducer
export default tarotReadingSlice.reducer;
