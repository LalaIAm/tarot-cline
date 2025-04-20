import { Card, CardContent } from './Card';
import { Sparkles, BookText, BookOpen, Lightbulb } from 'lucide-react';

function Features() {
  return (
    <section className='py-16 md:py-24 bg-black'>
      <div className='container'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white'>
            Unlock the Power of{' '}
            <span className='bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text'>
              Tarot
            </span>
          </h2>
          <p className='text-lg text-gray-300 max-w-2xl mx-auto'>
            Discover our comprehensive suite of tools designed to deepen your
            connection with tarot and enhance your spiritual journey.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
          {/* AI Tarot Interpretations */}
          <Card className='group hover:shadow-lg transition-all duration-300 border-purple-500/30 hover:border-purple-500/50 bg-gray-900'>
            <CardContent className='p-6 flex flex-col items-center text-center'>
              <div className='w-12 h-12 rounded-full bg-purple-900/80 flex items-center justify-center mb-4 group-hover:bg-purple-800 transition-colors'>
                <Sparkles className='w-6 h-6 text-purple-300' />
              </div>
              <h3 className='text-xl font-semibold mb-2 text-white'>
                AI Tarot Interpretations
              </h3>
              <p className='text-gray-300'>
                Receive personalized card readings with AI-powered
                interpretations tailored to your unique situation and questions.
              </p>
            </CardContent>
          </Card>

          {/* Journaling */}
          <Card className='group hover:shadow-lg transition-all duration-300 border-indigo-500/30 hover:border-indigo-500/50 bg-gray-900'>
            <CardContent className='p-6 flex flex-col items-center text-center'>
              <div className='w-12 h-12 rounded-full bg-indigo-900/80 flex items-center justify-center mb-4 group-hover:bg-indigo-800 transition-colors'>
                <BookText className='w-6 h-6 text-indigo-300' />
              </div>
              <h3 className='text-xl font-semibold mb-2 text-white'>
                Tarot Journaling
              </h3>
              <p className='text-gray-300'>
                Document your readings, reflections, and spiritual growth with
                our intuitive journaling tools designed for tarot practitioners.
              </p>
            </CardContent>
          </Card>

          {/* Card Definitions */}
          <Card className='group hover:shadow-lg transition-all duration-300 border-blue-500/30 hover:border-blue-500/50 bg-gray-900'>
            <CardContent className='p-6 flex flex-col items-center text-center'>
              <div className='w-12 h-12 rounded-full bg-blue-900/80 flex items-center justify-center mb-4 group-hover:bg-blue-800 transition-colors'>
                <BookOpen className='w-6 h-6 text-blue-300' />
              </div>
              <h3 className='text-xl font-semibold mb-2 text-white'>
                Card Definitions
              </h3>
              <p className='text-gray-300'>
                Access comprehensive meanings for all 78 tarot cards, including
                upright and reversed interpretations, symbolism, and historical
                context.
              </p>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card className='group hover:shadow-lg transition-all duration-300 border-cyan-500/30 hover:border-cyan-500/50 bg-gray-900'>
            <CardContent className='p-6 flex flex-col items-center text-center'>
              <div className='w-12 h-12 rounded-full bg-cyan-900/80 flex items-center justify-center mb-4 group-hover:bg-cyan-800 transition-colors'>
                <Lightbulb className='w-6 h-6 text-cyan-300' />
              </div>
              <h3 className='text-xl font-semibold mb-2 text-white'>
                Personalized Insights
              </h3>
              <p className='text-gray-300'>
                Gain deeper understanding of patterns in your readings over time
                with AI-powered analytics and personalized spiritual insights.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className='mt-16 text-center'>
          <div className='inline-block p-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg'>
            <div className='bg-gray-900 rounded-md px-6 py-2'>
              <p className='text-sm font-medium text-white'>
                Join thousands of seekers who have transformed their spiritual
                practice with TarotLyfe
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features