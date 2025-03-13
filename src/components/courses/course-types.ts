
import { ReactNode } from 'react';

export interface CourseType {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  students: number;
  rating: number;
  image: string;
  icon: ReactNode;
  color: string;
}
