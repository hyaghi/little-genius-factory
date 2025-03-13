
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronRight, Code, Database, Puzzle, Robot, Sparkles } from 'lucide-react';

const paths = [
  {
    id: 'path-1',
    title: 'AI Fundamentals',
    description: 'An introduction to AI concepts, machine learning basics, and how AI works in everyday life.',
    icon: <Sparkles className="h-8 w-8 text-ai-blue" />,
    color: 'blue',
    delay: 100,
  },
  {
    id: 'path-2',
    title: 'Coding for AI',
    description: 'Learn the building blocks of programming that power AI systems, from basic algorithms to data structures.',
    icon: <Code className="h-8 w-8 text-ai-purple" />,
    color: 'purple',
    delay: 200,
  },
  {
    id: 'path-3',
    title: 'Robotics & AI',
    description: 'Discover how AI powers robots and automation, with hands-on projects to build your own smart robots.',
    icon: <Robot className="h-8 w-8 text-ai-pink" />,
    color: 'pink',
    delay: 300,
  },
  {
    id: 'path-4',
    title: 'Data Science Jr.',
    description: 'Explore how to collect, analyze, and visualize data to make predictions and solve real-world problems.',
    icon: <Database className="h-8 w-8 text-ai-teal" />,
    color: 'teal',
    delay: 400,
  },
];

const LearningPaths = () => {
  const [selectedPath, setSelectedPath] = useState('path-1');
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
    <section id="learning-paths" ref={sectionRef} className="py-20 bg-gradient-subtle">
      <div className="section-container">
        <div className="mb-12 text-center">
          <h2 className="mb-4">Learning Paths</h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg">
            Structured learning journeys designed to develop key AI skills at each child's own pace
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Path Selection */}
          <div className="md:col-span-1 space-y-4">
            {paths.map((path) => (
              <button
                key={path.id}
                onClick={() => setSelectedPath(path.id)}
                className={cn(
                  "w-full text-left p-6 rounded-xl transition-all duration-300 animate-fade-right",
                  {
                    "glass shadow-lg border-ai-blue/20 transform scale-[1.03]": selectedPath === path.id,
                    "bg-white/50 hover:bg-white/80 shadow-subtle": selectedPath !== path.id,
                    "opacity-0 translate-x-8": !isInView,
                    "opacity-100 translate-x-0": isInView
                  }
                )}
                style={{ transitionDelay: `${path.delay}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-white shadow-subtle`}>
                    {path.icon}
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 text-ai-${path.color}`}>
                      {path.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {path.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Path Details */}
          <div className="md:col-span-2">
            <div className={cn(
              "bg-white rounded-xl shadow-subtle p-8 h-full animate-fade-left",
              {
                "opacity-0 translate-x-[-20px]": !isInView,
                "opacity-100 translate-x-0": isInView
              }
            )}>
              {selectedPath === 'path-1' && (
                <div>
                  <h3 className="text-2xl font-bold text-ai-blue mb-4">AI Fundamentals</h3>
                  <p className="text-gray-600 mb-6">
                    This learning path introduces young minds to the exciting world of artificial intelligence through engaging, 
                    age-appropriate activities and explanations. Students will discover the basic concepts behind AI and how 
                    it shapes the technology around us.
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-3">What you'll learn:</h4>
                    <ul className="space-y-3">
                      {['What is artificial intelligence?', 'How machines learn from examples', 'Pattern recognition basics', 'Ethical AI and responsibility'].map((item, index) => (
                        <li key={index} className="flex items-center">
                          <div className="bg-ai-blue/10 p-1 rounded mr-3">
                            <ChevronRight className="h-4 w-4 text-ai-blue" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-3">Perfect for:</h4>
                    <p className="text-gray-600">
                      Children ages 8-12 who are curious about AI and technology, with no prior coding experience required.
                    </p>
                  </div>
                  
                  <Button className="bg-ai-blue hover:bg-ai-blue/90 text-white">
                    Explore this path
                  </Button>
                </div>
              )}
              
              {selectedPath === 'path-2' && (
                <div>
                  <h3 className="text-2xl font-bold text-ai-purple mb-4">Coding for AI</h3>
                  <p className="text-gray-600 mb-6">
                    Learn the programming foundations that power AI systems. This path takes children from basic 
                    programming concepts to creating their own simple AI programs using kid-friendly coding platforms.
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-3">What you'll learn:</h4>
                    <ul className="space-y-3">
                      {['Programming fundamentals', 'Algorithms and logical thinking', 'Simple machine learning models', 'Building AI-powered projects'].map((item, index) => (
                        <li key={index} className="flex items-center">
                          <div className="bg-ai-purple/10 p-1 rounded mr-3">
                            <ChevronRight className="h-4 w-4 text-ai-purple" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-3">Perfect for:</h4>
                    <p className="text-gray-600">
                      Children ages 10-14 who have basic computer skills and are ready to start their coding journey.
                    </p>
                  </div>
                  
                  <Button className="bg-ai-purple hover:bg-ai-purple/90 text-white">
                    Explore this path
                  </Button>
                </div>
              )}
              
              {selectedPath === 'path-3' && (
                <div>
                  <h3 className="text-2xl font-bold text-ai-pink mb-4">Robotics & AI</h3>
                  <p className="text-gray-600 mb-6">
                    Discover how AI and robotics work together in this hands-on learning path. Students will learn about sensors, 
                    actuators, and how AI helps robots make decisions and interact with the world around them.
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-3">What you'll learn:</h4>
                    <ul className="space-y-3">
                      {['Robotics fundamentals', 'Sensors and data collection', 'Programming robot behaviors', 'AI-powered robot projects'].map((item, index) => (
                        <li key={index} className="flex items-center">
                          <div className="bg-ai-pink/10 p-1 rounded mr-3">
                            <ChevronRight className="h-4 w-4 text-ai-pink" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-3">Perfect for:</h4>
                    <p className="text-gray-600">
                      Children ages 9-14 who love building, creating, and working with physical technology.
                    </p>
                  </div>
                  
                  <Button className="bg-ai-pink hover:bg-ai-pink/90 text-white">
                    Explore this path
                  </Button>
                </div>
              )}
              
              {selectedPath === 'path-4' && (
                <div>
                  <h3 className="text-2xl font-bold text-ai-teal mb-4">Data Science Jr.</h3>
                  <p className="text-gray-600 mb-6">
                    This path introduces young learners to the world of data, teaching them how to collect, 
                    analyze, and visualize information to make predictions and solve problems.
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-3">What you'll learn:</h4>
                    <ul className="space-y-3">
                      {['Data collection techniques', 'Data visualization', 'Making predictions from data', 'Solving problems with data analysis'].map((item, index) => (
                        <li key={index} className="flex items-center">
                          <div className="bg-ai-teal/10 p-1 rounded mr-3">
                            <ChevronRight className="h-4 w-4 text-ai-teal" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-3">Perfect for:</h4>
                    <p className="text-gray-600">
                      Children ages 10-14 who enjoy math, patterns, and solving puzzles with information.
                    </p>
                  </div>
                  
                  <Button className="bg-ai-teal hover:bg-ai-teal/90 text-white">
                    Explore this path
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;
