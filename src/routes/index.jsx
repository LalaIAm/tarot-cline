import { createBrowserRouter } from 'react-router-dom';

// Layouts
import RootLayout from '../layouts/RootLayout';

// Pages
// These components will be created later in Milestone 1
const LandingPage = () => <div>Landing Page</div>;
const AuthPage = () => <div>Authentication Page</div>;
const DashboardPage = () => <div>Dashboard Page</div>;
const NotFoundPage = () => <div>404 - Page Not Found</div>;

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
        path: 'auth',
        element: <AuthPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
    ],
  },
]);
