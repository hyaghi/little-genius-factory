
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LearningPaths from '@/components/LearningPaths';
import FeaturedCourses from '@/components/FeaturedCourses';
import WhyAISection from '@/components/WhyAISection';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
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
