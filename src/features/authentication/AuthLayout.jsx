import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle, authType }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <Link to="/">
            <h2 className="text-3xl font-extrabold text-purple-700 hover:text-purple-800 transition-colors">
              TarotLyfe
            </h2>
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
        </div>
        
        {children}
        
        <div className="mt-6 text-center text-sm">
          {authType === 'login' ? (
            <div className="space-y-2">
              <p>
                Don't have an account?{' '}
                <Link 
                  to="/auth/signup" 
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Sign up
                </Link>
              </p>
              <p>
                <Link 
                  to="/auth/reset-password" 
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Forgot your password?
                </Link>
              </p>
            </div>
          ) : authType === 'signup' ? (
            <p>
              Already have an account?{' '}
              <Link 
                to="/auth/login" 
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Log in
              </Link>
            </p>
          ) : authType === 'reset' ? (
            <p>
              Remember your password?{' '}
              <Link 
                to="/auth/login" 
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Back to login
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
