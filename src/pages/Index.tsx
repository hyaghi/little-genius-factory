
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LearningPaths from '@/components/LearningPaths';
import FeaturedCourses from '@/components/FeaturedCourses';
import WhyAISection from '@/components/WhyAISection';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
// Import Firebase to ensure it's initialized
import { initializeAnalytics } from '@/lib/firebase';

const Index = () => {
  useEffect(() => {
    console.log('Firebase initialized on app startup');
    // Initialize analytics
    const setupAnalytics = async () => {
      const analytics = await initializeAnalytics();
      if (analytics) {
        console.log('Firebase Analytics initialized');
      } else {
        console.log('Firebase Analytics not supported in this environment');
      }
    };
    
    setupAnalytics();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <LearningPaths />
        <FeaturedCourses />
        <WhyAISection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
