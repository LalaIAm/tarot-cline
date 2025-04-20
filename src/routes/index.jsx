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
import TarotReadingPage from '../features/tarotReading/TarotReadingPage';
import ReadingHistory from '../features/tarotReading/ReadingHistory';
import ReadingInterpretation from '../features/tarotReading/ReadingInterpretation';

// Journaling Components
import JournalingPage from '../features/journaling/JournalingPage';
import JournalEntryForm from '../features/journaling/JournalEntryForm';
import JournalEntryDetail from '../features/journaling/JournalEntryDetail';

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
        path: 'tarot',
        element: (
          <ProtectedRoute>
            <TarotReadingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'tarot/history',
        element: (
          <ProtectedRoute>
            <ReadingHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: 'tarot/reading/:id',
        element: (
          <ProtectedRoute>
            <ReadingInterpretation />
          </ProtectedRoute>
        ),
      },
      {
        path: 'journal',
        element: (
          <ProtectedRoute>
            <JournalingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'journal/new',
        element: (
          <ProtectedRoute>
            <JournalEntryForm />
          </ProtectedRoute>
        ),
      },
      {
        path: 'journal/:id',
        element: (
          <ProtectedRoute>
            <JournalEntryDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: 'journal/edit/:id',
        element: (
          <ProtectedRoute>
            <JournalEntryForm />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
