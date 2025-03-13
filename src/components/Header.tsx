
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LightbulbIcon, MenuIcon, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-md shadow-subtle' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <LightbulbIcon className="h-8 w-8 text-ai-blue mr-2" />
          <span className="font-bold text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-ai-blue to-ai-purple">
            AI Academy
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#learning-paths" className="text-sm font-medium text-gray-700 hover:text-ai-blue transition-colors">
            Learning Paths
          </a>
          <a href="#courses" className="text-sm font-medium text-gray-700 hover:text-ai-blue transition-colors">
            Courses
          </a>
          <a href="#why-ai" className="text-sm font-medium text-gray-700 hover:text-ai-blue transition-colors">
            Why AI for Kids
          </a>
          <Button className="bg-ai-blue hover:bg-ai-blue/90 text-white">
            Get Started
          </Button>
        </nav>
        
        {/* Mobile Menu Trigger */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-fade-down">
          <div className="py-4 px-4 space-y-4">
            <a 
              href="#learning-paths" 
              className="block py-2 text-sm font-medium text-gray-700 hover:text-ai-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Learning Paths
            </a>
            <a 
              href="#courses" 
              className="block py-2 text-sm font-medium text-gray-700 hover:text-ai-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </a>
            <a 
              href="#why-ai" 
              className="block py-2 text-sm font-medium text-gray-700 hover:text-ai-blue"
              onClick={() => setIsMenuOpen(false)}
            >
              Why AI for Kids
            </a>
            <Button 
              className="w-full bg-ai-blue hover:bg-ai-blue/90 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
