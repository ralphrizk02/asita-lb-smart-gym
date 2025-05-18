import { useEffect, useRef, useState } from 'react';
import IntersectionObserver from '../IntersectionObserver';

// Import image
import machineImage from "../../assets/images/5cd91e37-21af-482d-b35d-6f7589b3242d.png";

interface PartProps {
  name: string;
  description: string;
  position: string; // CSS classes for positioning
  animationDelay: number;
}

const parts: PartProps[] = [
  { 
    name: "Resistance Core", 
    description: "Variable weight stack with electromagnetic resistance adjustment",
    position: "top-1/4 -right-20 md:-right-32",
    animationDelay: 0
  },
  { 
    name: "Pulley Mechanics", 
    description: "360° motion range with frictionless rotation",
    position: "top-1/2 -left-20 md:-left-36",
    animationDelay: 300
  },
  { 
    name: "Smart Safety Lock", 
    description: "Auto-locking mechanism prevents misuse",
    position: "bottom-1/4 -right-20 md:-right-32",
    animationDelay: 600
  },
  { 
    name: "Ergonomic Pad System", 
    description: "Body-conforming padding with moisture-wicking material",
    position: "bottom-1/3 -left-20 md:-left-36",
    animationDelay: 900
  }
];

const ExplodedView = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const machineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    // Preload the machine image
    const img = new Image();
    img.src = machineImage;
    img.onload = () => setImageLoaded(true);
    
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const { top, height } = section.getBoundingClientRect();
      const scrollPosition = window.innerHeight - top;
      const progress = Math.max(0, Math.min(1, scrollPosition / (window.innerHeight + height/2)));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="min-h-[200vh] relative" 
      id="exploded-view"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FF6B0010,transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <IntersectionObserver className="reveal mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Unpack</span> the Machine
            </h2>
            <p className="text-asita-muted max-w-2xl mx-auto">
              Discover what makes the ASITA Smart Gym an engineering masterpiece. Every component has been meticulously designed for performance.
            </p>
          </IntersectionObserver>
          
          <div
            ref={machineRef}
            className="relative mx-auto w-full max-w-xl aspect-square"
            style={{
              transform: `scale(${1 + scrollProgress * 0.3})`,
              opacity: 1 - (scrollProgress > 0.8 ? (scrollProgress - 0.8) * 5 : 0)
            }}
          >
            {/* Base machine image */}
            <div className="absolute inset-0 flex items-center justify-center">
              {imageLoaded ? (
                <img 
                  src={machineImage} 
                  alt="ASITA Smart Gym" 
                  className="w-3/4 h-3/4 object-contain"
                />
              ) : (
                <div className="w-3/4 h-3/4 bg-asita-darker rounded-lg flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-asita-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            
            {/* Exploded parts with animation based on scroll */}
            {parts.map((part, index) => (
              <div
                key={index}
                className={`absolute ${part.position} transform transition-all duration-1000`}
                style={{
                  opacity: scrollProgress > 0.2 ? 1 : 0,
                  transform: `translateX(${scrollProgress > 0.2 ? '0' : (part.position.includes('left') ? '-50px' : '50px')})`,
                  transitionDelay: `${part.animationDelay}ms`
                }}
              >
                <div className="bg-asita-dark/80 backdrop-blur-sm border border-asita-blue/40 p-4 rounded-lg shadow-lg shadow-asita-blue/20 max-w-xs">
                  <h3 className="text-asita-blue font-bold mb-1">{part.name}</h3>
                  <p className="text-sm text-asita-muted">{part.description}</p>
                </div>
                <div 
                  className={`absolute top-1/2 h-px bg-asita-blue w-16 ${part.position.includes('left') ? 'right-full' : 'left-full'}`}
                  style={{
                    width: `${16 + (scrollProgress * 30)}px`,
                    opacity: scrollProgress > 0.2 ? 0.6 : 0
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExplodedView;
