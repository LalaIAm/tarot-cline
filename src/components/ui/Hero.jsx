import { Button } from "./Button";

const Hero = () => {
    return (
      <section className='pt-24 pb-16 md:pt-32 md:pb-24'>
        <div className='container'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div className='flex flex-col gap-6'>
              <div>
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4'>
                  Discover Your Path with{' '}
                  <span className='bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text'>
                    TarotLyfe
                  </span>
                </h1>
                <p className='text-lg md:text-xl text-muted-foreground'>
                  Unlock the wisdom of tarot cards with personalized readings,
                  interpretations, and guidance for your life journey.
                </p>
              </div>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Button
                  size='lg'
                  className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                >
                  Get Started
                </Button>
                <Button size='lg' variant='outline'>
                  Learn More
                </Button>
              </div>
              <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                <div className='flex -space-x-2'>
                  <div className='w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center'>
                    <span className='text-xs text-purple-700'>★</span>
                  </div>
                  <div className='w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center'>
                    <span className='text-xs text-indigo-700'>★</span>
                  </div>
                  <div className='w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center'>
                    <span className='text-xs text-blue-700'>★</span>
                  </div>
                </div>
                <span>Trusted by 10,000+ seekers worldwide</span>
              </div>
            </div>
            <div className='relative h-[400px] md:h-[500px] flex items-center justify-center'>
              <div className='absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-lg'></div>
              <div className='relative w-full h-full flex items-center justify-center'>
                <div className='relative w-[220px] h-[380px] transform rotate-[-5deg] transition-all duration-500 hover:rotate-0 hover:scale-105'>
                  <div className='absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-xl'></div>
                  <div className='absolute inset-2 bg-black/90 rounded-lg flex flex-col items-center justify-center p-4'>
                    <div className='w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center'>
                      <span className='text-2xl'>✨</span>
                    </div>
                    <h3 className='text-white text-lg font-semibold mb-2'>
                      The Star
                    </h3>
                    <p className='text-gray-300 text-sm text-center'>
                      Hope, inspiration, and spiritual guidance for your journey
                      ahead.
                    </p>
                  </div>
                </div>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-[60%] -translate-y-[120%] w-[180px] h-[320px] rotate-[15deg] transition-all duration-500 hover:rotate-0 hover:scale-105 z-10'>
                  <div className='absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl shadow-xl'></div>
                  <div className='absolute inset-2 bg-black/90 rounded-lg flex flex-col items-center justify-center p-4'>
                    <div className='w-12 h-12 mb-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center'>
                      <span className='text-xl'>🌙</span>
                    </div>
                    <h3 className='text-white text-base font-semibold mb-2'>
                      The Moon
                    </h3>
                    <p className='text-gray-300 text-xs text-center'>
                      Intuition and the mysteries of the subconscious mind.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Hero