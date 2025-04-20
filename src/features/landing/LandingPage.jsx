import Features from '../../components/ui/Features';
import Header from '../../components/ui/Header';
import Hero from '../../components/ui/Hero';

const LandingPage = () => {
  return (
    <>
      <Header />
      <main className='flex flex-col min-h-screen'>
        <Hero />
        <Features />
      </main>
    </>
  );
};

export default LandingPage