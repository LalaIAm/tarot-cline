import { Outlet } from 'react-router-dom';
import Navigation from '../components/shared/Navigation';
import Footer from '../components/shared/Footer';

const RootLayout = () => {
  return (
   <Outlet />
  );
};

export default RootLayout;
