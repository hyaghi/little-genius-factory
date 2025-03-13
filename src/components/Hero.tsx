
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Lightbulb, Sparkles } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="pt-32 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ai-blue/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-ai-purple/10 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="text-center max-w-3xl mx-auto">
          <div className={`mb-6 inline-flex transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <span className="bg-ai-blue/10 text-ai-blue px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
              <Sparkles className="h-4 w-4 mr-2" />
              For the future innovators
            </span>
          </div>
          
          <h1 
            className={`mb-6 transition-all duration-700 delay-100 ${
              isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="block text-balance">
              Teaching kids the art of
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-ai-blue via-ai-purple to-ai-pink">
              artificial intelligence
            </span>
          </h1>
          
          <p 
            className={`text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-balance transition-all duration-700 delay-200 ${
              isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'
            }`}
          >
            Our academy makes learning AI fun, accessible, and engaging for children. We nurture the innovators who will shape tomorrow's technological breakthroughs.
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-700 delay-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0 translate-y-10'
            }`}
          >
            <Button className="bg-ai-blue hover:bg-ai-blue/90 text-white px-8 py-6 rounded-xl group h-auto">
              <span>Start learning</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" className="bg-white border-gray-200 shadow-subtle hover:bg-gray-50 px-8 py-6 rounded-xl h-auto">
              <BrainCircuit className="mr-2 h-5 w-5 text-ai-purple" />
              <span>Try a free lesson</span>
            </Button>
          </div>
        </div>
        
        {/* Floating Icons */}
        <div className="absolute top-40 left-10 hidden lg:block">
          <div className="bg-white p-3 rounded-xl shadow-subtle animate-float" style={{ animationDelay: '0.5s' }}>
            <Lightbulb className="h-8 w-8 text-ai-yellow" />
          </div>
        </div>
        <div className="absolute bottom-20 right-10 hidden lg:block">
          <div className="bg-white p-3 rounded-xl shadow-subtle animate-float" style={{ animationDelay: '1.5s' }}>
            <BrainCircuit className="h-8 w-8 text-ai-purple" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
