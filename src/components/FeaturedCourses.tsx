
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Clock, Code, BarChart3, Users, Star, ChevronRight, ChevronLeft, 
  Cpu, Bot, Brain, ArrowRight, Lightbulb 
} from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Introduction to Machine Learning',
    description: 'A beginner-friendly introduction to machine learning concepts for children.',
    level: 'Beginner',
    duration: '4 weeks',
    students: 2104,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    icon: <Brain className="h-6 w-6" />,
    color: 'from-ai-blue to-ai-purple',
  },
  {
    id: 2,
    title: 'Coding with AI Assistants',
    description: 'Learn to code with the help of AI tools designed for young programmers.',
    level: 'Intermediate',
    duration: '6 weeks',
    students: 1852,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    icon: <Code className="h-6 w-6" />,
    color: 'from-ai-purple to-ai-pink',
  },
  {
    id: 3,
    title: 'Building Your First AI Robot',
    description: 'Create a simple robot that uses AI to navigate and interact with its environment.',
    level: 'Intermediate',
    duration: '8 weeks',
    students: 1435,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    icon: <Bot className="h-6 w-6" />,
    color: 'from-ai-orange to-ai-yellow',
  },
  {
    id: 4,
    title: 'AI Art & Creativity',
    description: 'Explore how AI can enhance creativity and help create amazing digital art.',
    level: 'Beginner',
    duration: '5 weeks',
    students: 1728,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
    icon: <Lightbulb className="h-6 w-6" />,
    color: 'from-ai-teal to-ai-blue',
  },
];

const CourseCard = ({ course, isVisible }: { course: typeof courses[0], isVisible: boolean }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className={`rounded-xl shadow-subtle overflow-hidden hover-card transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } transition-all duration-700`}
      style={{ transitionDelay: `${course.id * 100}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r ${course.color} opacity-50`}></div>
        <img
          src={course.image}
          alt={course.title}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-subtle">
          <div className={`bg-gradient-to-r ${course.color} bg-clip-text text-transparent`}>
            {course.icon}
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-white">
        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2 text-ai-blue" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <BarChart3 className="h-4 w-4 mr-2 text-ai-orange" />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2 text-ai-purple" />
            <span>{course.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Star className="h-4 w-4 mr-2 text-ai-yellow" />
            <span>{course.rating}/5 rating</span>
          </div>
        </div>
        
        <Button className={`w-full bg-gradient-to-r ${course.color} text-white hover:opacity-90`}>
          <span>Learn more</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const FeaturedCourses = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const coursesPerPage = 3;

  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const paginatedCourses = [];
  
  for (let i = 0; i < courses.length; i += coursesPerPage) {
    paginatedCourses.push(courses.slice(i, i + coursesPerPage));
  }

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
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
    <section id="courses" ref={sectionRef} className="py-20">
      <div className="section-container">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="mb-4">Featured Courses</h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Carefully crafted learning experiences that make AI concepts fun and accessible for young minds
            </p>
          </div>
          
          <div className="hidden md:flex space-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={prevPage}
              className="rounded-full h-10 w-10 border border-gray-200"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              className="rounded-full h-10 w-10 border border-gray-200"
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedCourses[currentPage]?.map((course) => (
            <CourseCard key={course.id} course={course} isVisible={isInView} />
          ))}
        </div>
        
        <div className="mt-10 flex justify-center md:hidden space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            className="rounded-full h-10 w-10 border border-gray-200"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            className="rounded-full h-10 w-10 border border-gray-200"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="mt-16 text-center">
          <Button variant="outline" className="bg-white text-ai-blue border-ai-blue/20 hover:bg-ai-blue/5">
            View all courses <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
