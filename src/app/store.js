import { configureStore } from '@reduxjs/toolkit';

// Import reducers as they are created
import authReducer from '../features/authentication/authSlice';
import tarotReadingReducer from '../features/tarotReading/tarotReadingSlice';
import journalingReducer from '../features/journaling/journalingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tarotReading: tarotReadingReducer,
    journaling: journalingReducer,
    // Add other reducers as they are implemented
  },
  // Additional middleware and store enhancers can be added here
});
