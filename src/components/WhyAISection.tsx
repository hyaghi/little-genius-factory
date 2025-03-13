
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ChevronsUp, Cpu, Globe, GraduationCap, Users } from 'lucide-react';

const benefits = [
  {
    title: 'Future-Ready Skills',
    description: 'AI will shape nearly every industry. We prepare kids with the skills they'll need for tomorrow's world.',
    icon: <ChevronsUp className="h-6 w-6 text-ai-blue" />,
    delay: 100,
  },
  {
    title: 'Creative Problem Solving',
    description: 'AI education teaches children to think critically, analyze data, and approach problems in innovative ways.',
    icon: <Cpu className="h-6 w-6 text-ai-purple" />,
    delay: 200,
  },
  {
    title: 'Ethical Understanding',
    description: 'Kids learn to navigate AI responsibly, understanding the social impact and ethical considerations.',
    icon: <Users className="h-6 w-6 text-ai-orange" />,
    delay: 300,
  },
  {
    title: 'Global Perspective',
    description: 'AI connects students to global issues and solutions, broadening their worldview and impact.',
    icon: <Globe className="h-6 w-6 text-ai-teal" />,
    delay: 400,
  },
];

const WhyAISection = () => {
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

  return (
    <section id="why-ai" ref={sectionRef} className="py-20 bg-ai-light">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-6 inline-flex">
              <span className="bg-ai-blue/10 text-ai-blue px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center">
                <GraduationCap className="h-4 w-4 mr-2" />
                Why AI Education Matters
              </span>
            </div>
            
            <h2 className="mb-6">Preparing children for an AI-powered future</h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Artificial intelligence isn't just the future—it's already here. By introducing children to AI concepts early, 
              we're equipping them with the knowledge, skills, and ethical foundation they'll need to thrive in a world 
              increasingly shaped by intelligent technologies.
            </p>
            
            <div className="space-y-5 mb-8">
              {['Develop technical literacy from an early age', 'Build confidence with cutting-edge technology', 'Foster creativity alongside technical skills', 'Prepare for careers that don't even exist yet'].map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-start transition-all duration-500 ${
                    isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-20px]'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="h-6 w-6 text-ai-blue shrink-0 mt-0.5 mr-3" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
            
            <Button className="bg-ai-blue hover:bg-ai-blue/90 text-white">
              Learn more about our approach
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-xl bg-white shadow-subtle hover-card transform transition-all duration-500 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${benefit.delay}ms` }}
              >
                <div className="p-3 bg-white rounded-lg shadow-subtle inline-block mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAISection;
