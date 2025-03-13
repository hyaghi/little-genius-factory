
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Clock, BarChart3, Users, Star, ArrowRight } from 'lucide-react';
import { CourseType } from './course-types';

interface CourseCardProps {
  course: CourseType;
  isVisible: boolean;
}

const CourseCard = ({ course, isVisible }: CourseCardProps) => {
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

export default CourseCard;
