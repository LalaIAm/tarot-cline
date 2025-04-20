import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Async thunk for generating tarot reading interpretations
 * This is a placeholder for the AI interpretation feature
 */
export const generateInterpretation = createAsyncThunk(
  'tarotReading/generateInterpretation',
  async ({ question, spread, cards }, { rejectWithValue }) => {
    try {
      // This is a placeholder for the actual API call that will be implemented
      // In Phase 3 of the milestone 2 implementation
      
      console.log('Generating interpretation for:', { question, spread, cards });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response data
      const interpretation = {
        summary: `Your reading regarding "${question}" reveals important insights about your current situation...`,
        overall: "The cards suggest that you are at a pivotal moment of transition. The energies around you support introspection and thoughtful planning before taking decisive action.",
        cards: cards.map(card => ({
          ...card,
          interpretation: `In the ${card.position} position, ${card.name} (${card.orientation}) suggests that ${
            card.orientation === 'upright' 
              ? card.meanings.upright.split(',')[0]
              : card.meanings.reversed.split(',')[0]
          } is influencing this aspect of your situation.`
        })),
        advice: "Consider taking time for self-reflection while remaining open to new opportunities. The cards indicate that balance is key during this period.",
        timestamp: new Date().toISOString(),
        id: `reading-${Date.now()}`
      };
      
      return interpretation;
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
      // This is a placeholder for the actual database save
      // that will be implemented in Phase 5 of milestone 2
      
      console.log('Saving reading:', readingData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      return {
        id: `reading-${Date.now()}`,
        ...readingData,
        saved: true,
        savedAt: new Date().toISOString()
      };
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
    
    // UI state
    isShuffling: false,
    isGeneratingInterpretation: false,
    isSaving: false,
    
    // Errors
    error: null
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
      if (state.selectedSpread && 
          state.selectedCards.length === state.selectedSpread.layout.cardCount) {
        state.activeStep = 'interpretation';
      }
    },
    
    // Add a single card to the reading
    addCard: (state, action) => {
      const card = action.payload;
      
      // Assign the card to the appropriate position based on current count
      const position = state.selectedSpread.positions[state.selectedCards.length];
      
      state.selectedCards.push({
        ...card,
        position: position.id,
        positionName: position.name,
        positionMeaning: position.meaning
      });
      
      // If we have all the cards needed for the spread, move to interpretation
      if (state.selectedSpread && 
          state.selectedCards.length === state.selectedSpread.layout.cardCount) {
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
          timestamp: new Date().toISOString()
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
    }
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
        const index = state.readingHistory.findIndex(r => r.id === action.payload.id);
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
      });
  }
});

// Export actions
export const { 
  setActiveStep,
  setQuestion,
  setSelectedSpread,
  setShuffling,
  setSelectedCards,
  addCard,
  resetReading
} = tarotReadingSlice.actions;

// Export selectors
export const selectActiveStep = state => state.tarotReading.activeStep;
export const selectQuestion = state => state.tarotReading.question;
export const selectFocusArea = state => state.tarotReading.focusArea;
export const selectSelectedSpread = state => state.tarotReading.selectedSpread;
export const selectSelectedCards = state => state.tarotReading.selectedCards;
export const selectInterpretation = state => state.tarotReading.interpretation;
export const selectReadingHistory = state => state.tarotReading.readingHistory;
export const selectIsShuffling = state => state.tarotReading.isShuffling;
export const selectIsGeneratingInterpretation = state => state.tarotReading.isGeneratingInterpretation;
export const selectIsSaving = state => state.tarotReading.isSaving;
export const selectError = state => state.tarotReading.error;

// Export reducer
export default tarotReadingSlice.reducer;
