import { Outlet } from 'react-router-dom';
import Navigation from '../components/shared/Navigation';
import Footer from '../components/shared/Footer';

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navigation />
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
