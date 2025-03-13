
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="glass rounded-2xl p-8 md:p-12 text-center max-w-md shadow-subtle border border-white/30 animate-fade-up">
        <h1 className="text-5xl font-bold mb-4 text-ai-dark">404</h1>
        <p className="text-xl text-gray-700 mb-8">
          Oops! We couldn't find the page you're looking for.
        </p>
        <Button 
          className="bg-ai-blue hover:bg-ai-blue/90 text-white inline-flex items-center"
          onClick={() => window.location.href = '/'}
        >
          <Home className="mr-2 h-5 w-5" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
