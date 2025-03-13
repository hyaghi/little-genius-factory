
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Mail, Send } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
    }, 1500);
  };

  return (
    <section ref={sectionRef} className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div 
          className={`rounded-2xl overflow-hidden shadow-subtle relative transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-ai-blue/10 via-ai-purple/10 to-ai-pink/10 z-0"></div>
          
          {/* Content */}
          <div className="relative z-10 px-6 py-12 md:p-12 text-center">
            <div className="inline-flex justify-center items-center p-3 bg-white rounded-full shadow-subtle mb-6">
              <Mail className="h-6 w-6 text-ai-blue" />
            </div>
            
            <h2 className="mb-4">Stay updated with AI education</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our newsletter to receive the latest updates on courses, learning resources, and 
              tips for helping children succeed in their AI education journey.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-grow">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 px-4 bg-white shadow-subtle border-gray-200"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="h-12 px-6 bg-ai-blue hover:bg-ai-blue/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Subscribing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Subscribe
                      <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
            
            <p className="text-sm text-gray-500 mt-4">
              We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
