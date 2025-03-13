
import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import CourseCard from './courses/CourseCard';
import CoursePagination from './courses/CoursePagination';
import { courses } from './courses/course-data';

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
          
          <CoursePagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={nextPage}
            onPrevPage={prevPage}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedCourses[currentPage]?.map((course) => (
            <CourseCard key={course.id} course={course} isVisible={isInView} />
          ))}
        </div>
        
        <CoursePagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={nextPage}
          onPrevPage={prevPage}
          isMobile={true}
        />
        
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
