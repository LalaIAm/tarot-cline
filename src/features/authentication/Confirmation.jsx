import { useLocation, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

const Confirmation = () => {
  const location = useLocation();
  const email = location.state?.email || 'your email';

  return (
    <AuthLayout
      title="Check your email"
      subtitle="Your account is almost ready"
    >
      <div className="mt-8 text-center">
        <div className="mb-6 mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">Verification email sent</h3>
        <p className="mt-2 text-sm text-gray-600">
          We've sent a verification email to <span className="font-medium">{email}</span>.
          Please check your inbox and click the verification link to complete your registration.
        </p>
        
        <div className="mt-8 space-y-4">
          <p className="text-sm text-gray-600">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/auth/signup" 
              className="text-sm font-medium text-purple-600 hover:text-purple-500"
            >
              Try again
            </Link>
            <Link 
              to="/auth/login" 
              className="text-sm font-medium text-purple-600 hover:text-purple-500"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Confirmation;
