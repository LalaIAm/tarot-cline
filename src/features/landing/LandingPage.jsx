import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../features/authentication/authSlice';
import TarotCard from '../../components/ui/TarotCard';
import MysticalDivider from '../../components/ui/MysticalDivider';
import TarotCardCarousel from '../../components/ui/TarotCardCarousel';

const LandingPage = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state for card animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="bg-parchment dark:bg-midnight min-h-screen overflow-hidden">
      {/* Starry Background */}
      <div className="stars fixed top-0 left-0 w-full h-full pointer-events-none"></div>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-midnight to-twilight">
        <div className="absolute inset-0 opacity-30">
          {/* Additional decorative elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-ethereal rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-2 h-2 bg-ethereal rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-ethereal rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-ember rounded-full animate-pulse opacity-30"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto pt-20 pb-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ethereal mb-6 animate-glow">
              Journey Within through Tarot
            </h1>
            <MysticalDivider symbol="sparkles" className="my-8" />
            <p className="mt-6 text-xl font-serif text-ethereal max-w-3xl mx-auto">
              TarotLyfe combines personalized tarot readings with reflection journaling 
              to guide your path to self-discovery and personal growth.
            </p>
            
            {/* Cards Display */}
            <div className="flex flex-wrap justify-center gap-4 mt-12 perspective-1000">
              <div className={`transform transition-all duration-1000 delay-300 ${isLoading ? 'opacity-0 -translate-x-20' : 'opacity-100 translate-x-0'}`}>
                <TarotCard 
                  frontImage="/images/sun-card.svg" 
                  name="The Sun" 
                  isFlipped={false}
                  className="animate-float"
                />
              </div>
              <div className={`transform transition-all duration-1000 delay-500 ${isLoading ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'}`}>
                <TarotCard 
                  frontImage="/images/moon-card.svg" 
                  name="The Moon" 
                  isFlipped={false}
                  className="animate-float"
                />
              </div>
            </div>
            
            <div className="mt-12 max-w-lg mx-auto">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-display font-medium rounded-md text-midnight bg-ember hover:bg-ember/90 transition-colors shadow-lg"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <div className="flex flex-col sm:flex-row justify-center gap-5">
                  <Link
                    to="/auth/signup"
                    className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-display font-medium rounded-md text-midnight bg-ember hover:bg-ember/90 transition-colors shadow-lg"
                  >
                    Begin Your Journey
                  </Link>
                  <Link
                    to="/auth/login"
                    className="inline-flex items-center justify-center px-8 py-4 border border-ember/60 text-lg font-display font-medium rounded-md text-ethereal hover:bg-twilight/50 transition-colors shadow-lg"
                  >
                    Return to Your Path
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <MysticalDivider symbol="eye" className="my-0" />
      
      {/* Features Section */}
      <div className="py-16 bg-parchment dark:bg-shadow overflow-hidden lg:py-24 relative">
        <div className="absolute inset-0 bg-mystical-pattern opacity-10 dark:opacity-20"></div>
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="relative text-center">
            <h2 className="font-display text-3xl leading-8 font-bold tracking-tight text-midnight dark:text-ethereal sm:text-4xl">
              Illuminate Your Inner Journey
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-shadow dark:text-ethereal/80 font-serif">
              Discover the perfect blend of ancient wisdom and modern reflection techniques for personal growth.
            </p>
          </div>
          
          <MysticalDivider symbol="star" className="my-12" />
          
          <div className="relative mt-12 lg:mt-16 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            {/* Card Display */}
            <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
              <div className="relative mx-auto w-full max-w-md">
                <TarotCard 
                  frontImage="/images/sun-card.svg" 
                  name="The Sun" 
                  canFlip={true}
                  className="mx-auto hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            
            {/* Feature Description */}
            <div className="relative">
              <h3 className="text-2xl font-display font-bold text-mystic dark:text-cosmic tracking-tight sm:text-3xl">
                AI-Powered Tarot Readings
              </h3>
              <p className="mt-3 text-lg text-shadow dark:text-ethereal/80 font-serif">
                Receive personalized tarot interpretations that offer deep insights into your questions and life situations.
              </p>
              
              <dl className="mt-10 space-y-10">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-full bg-mystic dark:bg-cosmic text-ethereal">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-display font-medium text-midnight dark:text-ethereal">
                      Multiple Spread Options
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-shadow/80 dark:text-ethereal/70 font-serif">
                    Choose from single card pulls, three-card spreads, or the detailed Celtic Cross for different levels of insight.
                  </dd>
                </div>
                
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-full bg-mystic dark:bg-cosmic text-ethereal">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-display font-medium text-midnight dark:text-ethereal">
                      Detailed Interpretations
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-shadow/80 dark:text-ethereal/70 font-serif">
                    Get nuanced insights that go beyond basic card meanings, tailored to your specific questions.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          
          <MysticalDivider symbol="moon" className="my-16" />
          
          <div className="relative mt-12 sm:mt-16 lg:mt-24">
            <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="lg:col-start-2">
                <h3 className="text-2xl font-display font-bold text-mystic dark:text-cosmic tracking-tight sm:text-3xl">
                  Integrated Journaling
                </h3>
                <p className="mt-3 text-lg text-shadow dark:text-ethereal/80 font-serif">
                  Document your reflections and track your personal growth journey alongside your tarot readings.
                </p>
                
                <dl className="mt-10 space-y-10">
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-full bg-mystic dark:bg-cosmic text-ethereal">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                      </div>
                      <p className="ml-16 text-lg leading-6 font-display font-medium text-midnight dark:text-ethereal">
                        Link Entries to Readings
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-shadow/80 dark:text-ethereal/70 font-serif">
                      Connect your personal reflections directly to your tarot readings for deeper understanding.
                    </dd>
                  </div>
                  
                  <div className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-full bg-mystic dark:bg-cosmic text-ethereal">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </div>
                      <p className="ml-16 text-lg leading-6 font-display font-medium text-midnight dark:text-ethereal">
                        Track Your Progress
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-shadow/80 dark:text-ethereal/70 font-serif">
                      Review past readings and journal entries to track patterns and growth over time.
                    </dd>
                  </div>
                </dl>
              </div>
              
              <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
                <div className="relative mx-auto w-full max-w-md">
                  <TarotCard 
                    frontImage="/images/moon-card.svg" 
                    name="The Moon" 
                    canFlip={true}
                    className="mx-auto hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <MysticalDivider symbol="infinity" className="my-0" />
      
      {/* Interactive Demo Section */}
      <div className="py-12 bg-gradient-to-b from-twilight/70 to-mystic/70 overflow-hidden lg:py-16 relative">
        <div className="absolute inset-0 bg-mystical-pattern opacity-10"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="stars opacity-70"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Using our new magical TarotCardCarousel component */}
            <TarotCardCarousel 
              cards={[
                {
                  name: "The Sun",
                  frontImage: "/images/sun-card.svg",
                  backImage: "/images/card-back.svg",
                  meaning: "Joy, success, celebration, positivity, clarity, vitality and enlightenment"
                },
                {
                  name: "The Moon",
                  frontImage: "/images/moon-card.svg",
                  backImage: "/images/card-back.svg",
                  meaning: "Intuition, unconscious, illusion, dreams, emotions, the unknown, and mystery"
                },
                {
                  name: "The Magician",
                  frontImage: "/images/moon-card.svg", // Repurposing moon card as magician
                  backImage: "/images/card-back.svg",
                  meaning: "Manifestation, power, action, creativity, and the ability to transform your world"
                }
              ]}
              className="mb-12"
            />
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-ethereal font-serif text-lg max-w-2xl mx-auto mb-8">
              Ready to receive personalized readings, save your insights, and track your spiritual journey?
            </p>
            <Link
              to={isAuthenticated ? "/dashboard" : "/auth/signup"}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-display font-medium rounded-md text-midnight bg-ember hover:bg-ember/90 transition-colors shadow-lg"
            >
              {isAuthenticated ? "Go to Dashboard" : "Begin Your Journey"}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Final CTA */}
      <div className="bg-midnight relative overflow-hidden">
        <div className="stars opacity-50"></div>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between relative z-10">
          <h2 className="text-3xl font-display font-bold tracking-tight text-ethereal sm:text-4xl">
            <span className="block mb-2">Ready to begin your journey?</span>
            <span className="block text-cosmic">Start your tarot practice today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to={isAuthenticated ? "/dashboard" : "/auth/signup"}
                className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-display font-medium rounded-md text-midnight bg-ember hover:bg-ember/90 transition-colors"
              >
                {isAuthenticated ? "Enter Your Dashboard" : "Begin Your Journey"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
