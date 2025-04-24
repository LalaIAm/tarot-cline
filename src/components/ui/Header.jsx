import { Link } from 'react-router-dom';
import { Button } from './Button';
import { MoonIcon, SunIcon, MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <header className='py-4 border-b bg-background/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50'>
      <div className='container flex items-center justify-between'>
        <Link to='/' className='flex items-center gap-2'>
          <span className='text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text'>
            TarotLyfe
          </span>
        </Link>
        <nav className='hidden md:flex items-center gap-6'>
          <Link
            to='#features'
            className='text-sm font-medium hover:text-primary/80 transition-colors'
          >
            Features
          </Link>
          <Link
            href='#readings'
            className='text-sm font-medium hover:text-primary/80 transition-colors'
          >
            Readings
          </Link>
          <Link
            href='#pricing'
            className='text-sm font-medium hover:text-primary/80 transition-colors'
          >
            Pricing
          </Link>
          <Link
            href='#about'
            className='text-sm font-medium hover:text-primary/80 transition-colors'
          >
            About
          </Link>
        </nav>
        <div className='hidden md:flex items-center gap-4'>
          <Button
            onClick={() => navigate('/auth/login')}
            variant='outline'
            size='sm'
            data-test='log-in'
          >
            Log In
          </Button>
          <Button
            size='sm'
            onClick={() => navigate('/auth/signup')}
            data-test='sign-up'
          >
            Sign Up
          </Button>
        </div>
        <button
          className='md:hidden p-2'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <MenuIcon className='h-6 w-6' />
        </button>
      </div>
      {mobileMenuOpen && (
        <div className='md:hidden absolute top-full left-0 right-0 bg-background border-b shadow-lg'>
          <div className='container py-4 flex flex-col gap-4'>
            <Link
              href='#features'
              className='text-sm font-medium hover:text-primary/80 transition-colors'
            >
              Features
            </Link>
            <Link
              href='#readings'
              className='text-sm font-medium hover:text-primary/80 transition-colors'
            >
              Readings
            </Link>
            <Link
              href='#pricing'
              className='text-sm font-medium hover:text-primary/80 transition-colors'
            >
              Pricing
            </Link>
            <Link
              href='#about'
              className='text-sm font-medium hover:text-primary/80 transition-colors'
            >
              About
            </Link>
            <div className='flex flex-col gap-2 mt-2'>
              <Button variant='outline' size='sm' className='w-full'>
                Log in
              </Button>
              <Button size='sm' className='w-full'>
                Sign up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
