
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const AnimatedCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [textProgress, setTextProgress] = useState(0);
  
  const firstMessage = "This is not just a gym machine.";
  const secondMessage = "It's ASITA.";
  
  // Calculate which characters to show based on progress
  const visibleFirstMessage = firstMessage.substring(0, Math.floor(textProgress * firstMessage.length));
  const visibleSecondMessage = secondMessage.substring(
    0, 
    textProgress > 0.6 ? Math.floor((textProgress - 0.6) * 2.5 * secondMessage.length) : 0
  );
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const { top, height } = section.getBoundingClientRect();
      const scrollPosition = window.innerHeight - top;
      const progress = Math.max(0, Math.min(1, scrollPosition / (window.innerHeight + height/2)));
      setTextProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative bg-black"
      id="animated-cta"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FF6B0010,transparent_70%)]"></div>
      
      <div className="container mx-auto px-6 text-center">
        <div className="mb-8">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 h-16">
            {visibleFirstMessage}
            <span className="animate-pulse">|</span>
          </h2>
          
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gradient mb-16 h-20">
            {visibleSecondMessage}
            {visibleSecondMessage === secondMessage ? '' : <span className="animate-pulse">|</span>}
          </h3>
        </div>
        
        <div 
          className="transform transition-all duration-1000"
          style={{
            opacity: textProgress > 0.9 ? 1 : 0,
            transform: textProgress > 0.9 ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          <Link 
            to="/" 
            className="btn-primary group inline-flex items-center text-lg"
          >
            Return to Main Site
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AnimatedCTA;
