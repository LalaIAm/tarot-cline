import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserPassword, selectAuthError, selectAuthLoading, clearError } from './authSlice';
import AuthLayout from './AuthLayout';

const PasswordReset = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthLoading);
  
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  
  const handleChange = (e) => {
    // Clear any previous errors when user starts typing
    if (error) {
      dispatch(clearError());
    }
    
    setEmail(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      // Early return if validation fails
      return;
    }
    
    const resultAction = await dispatch(resetUserPassword(email));
    
    if (resetUserPassword.fulfilled.match(resultAction)) {
      setResetSent(true);
    }
  };
  
  return (
    <AuthLayout 
      title="Reset your password" 
      subtitle="Enter your email to receive a password reset link"
      authType="reset"
    >
      {resetSent ? (
        <div className="mt-8 text-center">
          <div className="mb-4 mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Check your email</h3>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a password reset link to <span className="font-medium">{email}</span>.
            Please check your inbox and follow the instructions.
          </p>
        </div>
      ) : (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-50 text-red-500 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-300"
            >
              {isLoading ? (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : null}
              {isLoading ? 'Sending...' : 'Send reset link'}
            </button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};

export default PasswordReset;
