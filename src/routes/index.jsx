import { createBrowserRouter } from 'react-router-dom';

// Layouts
import RootLayout from '../layouts/RootLayout';

// Auth Components
import AuthContainer from '../features/authentication/AuthContainer';
import ProtectedRoute from '../components/shared/ProtectedRoute';

// Pages
import LandingPage from '../features/landing/LandingPage';
import Dashboard from '../features/dashboard/Dashboard';
import NotFoundPage from '../components/shared/NotFoundPage';

// Demo Components
import ButtonDemo from '../components/ButtonDemo';

// Create router
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'auth/*',
        element: <AuthContainer />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'button-demo',
        element: <ButtonDemo />,
      },
    ],
  },
]);
