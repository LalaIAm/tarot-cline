import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './app/store';

// Expose store when in development or testing environment
if (import.meta.env.DEV || import.meta.env.MODE === 'test') {
  window.store = store;
}
import { router } from './routes/index';
import { setUser } from './features/authentication/authSlice';
import { setupAuthListener } from './services/supabaseService';

// Auth state listener component
const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Setup Supabase auth listener to update Redux state when auth changes
    const subscription = setupAuthListener((event, session) => {
      console.log('Supabase auth event:', event);
      
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        dispatch(setUser(session?.user || null));
      } else if (event === 'SIGNED_OUT') {
        dispatch(setUser(null));
      }
    });

    // Clean up subscription on unmount
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [dispatch]);

  return children;
};

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  );
}

export default App;
