import { Card, CardContent } from './Card';
import { Button } from './Button';
import { Check, Sparkles, Star, Zap } from 'lucide-react';

function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-black">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
              Spiritual Journey
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Select the plan that aligns with your path to self-discovery and transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Free Plan */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-purple-500/30 hover:border-purple-500/50 bg-gray-900">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="mb-4">
                <Star className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Explorer</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">Free</span>
              </div>
              <p className="text-gray-300 mb-6">Perfect for beginners starting their tarot journey.</p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-purple-400 mr-2 shrink-0" />
                  <span className="text-gray-300">1 free reading per day</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-purple-400 mr-2 shrink-0" />
                  <span className="text-gray-300">Basic card meanings</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-purple-400 mr-2 shrink-0" />
                  <span className="text-gray-300">Simple journal entries</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-purple-400 mr-2 shrink-0" />
                  <span className="text-gray-300">Community access</span>
                </li>
              </ul>
              
              <Button className="w-full mt-auto">Get Started</Button>
            </CardContent>
          </Card>

          {/* Premium Plan - Most Popular */}
          <Card className="group relative hover:shadow-lg transition-all duration-300 border-indigo-500/50 hover:border-indigo-500/80 bg-gray-900 scale-105 z-10">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-xs font-semibold text-white">
                Most Popular
              </div>
            </div>
            <CardContent className="p-6 flex flex-col h-full">
              <div className="mb-4">
                <Sparkles className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Seeker</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">$9.99</span>
                <span className="text-gray-400 ml-1">/month</span>
              </div>
              <p className="text-gray-300 mb-6">For dedicated practitioners seeking deeper insights.</p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-indigo-400 mr-2 shrink-0" />
                  <span className="text-gray-300">Unlimited daily readings</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-indigo-400 mr-2 shrink-0" />
                  <span className="text-gray-300">Advanced AI interpretations</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-indigo-400 mr-2 shrink-0" />
                  <span className="text-gray-300">Enhanced journaling tools</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-indigo-400 mr-2 shrink-0" />
                  <span className="text-gray-300">Detailed card meanings</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-indigo-400 mr-2 shrink-0" />
                  <span className="text-gray-300">Reading history & insights</span>
                </li>
              </ul>
              
              <Button className="w-full mt-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">Choose Plan</Button>
            </CardContent>
          </Card>

          {/* Ultimate Plan */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-blue-500/30 hover:border-blue-500/50 bg-gray-900">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="mb-4">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Mystic</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">$19.99</span>
                <span className="text-gray-400 ml-1">/month</span>
              </div>
              <p className="text-gray-300 mb-6">The ultimate tarot experience for spiritual masters.</p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-blue-400 mr-2 shrink-0" />
                  <span className="text-gray-300">Everything in Seeker plan</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-blue-400 mr-2 shrink-0" />
                  <span className="text-gray-300">Priority AI processing</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-blue-400 mr-2 shrink-0" />
                  <span className="text-gray-300">Custom spread creation</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-blue-400 mr-2 shrink-0" />
                  <span className="text-gray-300">Advanced analytics</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-blue-400 mr-2 shrink-0" />
                  <span className="text-gray-300">1-on-1 expert consultations</span>
                </li>
              </ul>
              
              <Button className="w-full mt-auto">Choose Plan</Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg">
            <div className="bg-gray-900 rounded-md px-6 py-2">
              <p className="text-sm font-medium text-white">
                All plans include a 7-day free trial. No credit card required to start.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing
