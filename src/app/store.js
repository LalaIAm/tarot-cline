import { configureStore } from '@reduxjs/toolkit';

// Import reducers as they are created
import authReducer from '../features/authentication/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers as they are implemented
  },
  // Additional middleware and store enhancers can be added here
});
