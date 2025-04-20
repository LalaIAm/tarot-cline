import Features from '../../components/ui/Features';
import Header from '../../components/ui/Header';
import Hero from '../../components/ui/Hero';
import Pricing from '../../components/ui/Pricing';

const LandingPage = () => {
  return (
    <>
      <Header />
      <main className='flex flex-col min-h-screen'>
        <Hero />
        <Features />
        <Pricing />
      </main>
    </>
  );
};

export default LandingPage
