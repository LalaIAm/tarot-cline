import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import PasswordReset from './PasswordReset';
import Confirmation from './Confirmation';

const AuthContainer = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="reset-password" element={<PasswordReset />} />
      <Route path="confirmation" element={<Confirmation />} />
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
};

export default AuthContainer;
