
import { Brain, Code, Bot, Lightbulb } from 'lucide-react';
import { CourseType } from './course-types';

export const courses: CourseType[] = [
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
