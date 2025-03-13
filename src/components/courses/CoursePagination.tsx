
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CoursePaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  isMobile?: boolean;
}

const CoursePagination = ({ 
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  isMobile = false 
}: CoursePaginationProps) => {
  return (
    <div className={`${isMobile ? 'flex justify-center md:hidden' : 'hidden md:flex'} space-x-3`}>
      <Button
        variant="outline"
        size="icon"
        onClick={onPrevPage}
        className="rounded-full h-10 w-10 border border-gray-200"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onNextPage}
        className="rounded-full h-10 w-10 border border-gray-200"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default CoursePagination;
