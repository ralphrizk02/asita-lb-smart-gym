import { useEffect, useRef, useState } from 'react';
import IntersectionObserver from '../IntersectionObserver';

// Import machine rotation images directly
import machine01 from "../../assets/images/machine_01.jpg";
import machine02 from "../../assets/images/machine_02.jpg";
import machine03 from "../../assets/images/machine_03.jpg";
import machine04 from "../../assets/images/machine_04.jpg";
import machine05 from "../../assets/images/machine_05.jpg";
import machine06 from "../../assets/images/machine_06.jpg";
import machine07 from "../../assets/images/machine_07.jpg";
import machine08 from "../../assets/images/machine_08.jpg";
import machine09 from "../../assets/images/machine_09.jpg";
import machine10 from "../../assets/images/machine_10.jpg";
import machine11 from "../../assets/images/machine_11.jpg";
import machine12 from "../../assets/images/machine_12.jpg";
import machine13 from "../../assets/images/machine_13.jpg";
import machine14 from "../../assets/images/machine_14.jpg";
import machine15 from "../../assets/images/machine_15.jpg";
import machine16 from "../../assets/images/machine_16.jpg";

// Create array of imported images
const machineImages = [
  machine01, machine02, machine03, machine04,
  machine05, machine06, machine07, machine08,
  machine09, machine10, machine11, machine12,
  machine13, machine14, machine15, machine16
];

const StickyRotation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(Array(machineImages.length).fill(false));
  
  useEffect(() => {
    // Preload images
    const preloadImages = () => {
      machineImages.forEach((path, index) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
          setImagesLoaded(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        };
      });
    };
    
    preloadImages();
    
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      if (!isInView) return;
      
      const { top, height } = section.getBoundingClientRect();
      const scrollPosition = window.innerHeight - top;
      const scrollPercentage = Math.max(0, Math.min(1, scrollPosition / (window.innerHeight + height - 200)));
      
      // Calculate the frame number based on scroll percentage
      const frameIndex = Math.floor(scrollPercentage * (machineImages.length - 1));
      setCurrentFrame(frameIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [machineImages.length, isInView]);
  
  useEffect(() => {
    // Create a native IntersectionObserver (not our component)
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setIsInView(entries[0].isIntersecting);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current && observer) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Check if we should render on a mobile device
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section 
      ref={sectionRef} 
      className="min-h-[200vh] relative flex items-center" 
      id="rotation"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center px-6">
          <div className="relative">
            <div className="bg-[radial-gradient(circle_at_center,#FF6B0020,transparent_70%)] rounded-lg p-4 mb-4">
              {isMobile ? (
                // On mobile, just show a static image
                <img 
                  src={machineImages[0]} 
                  alt="ASITA Machine"
                  className="w-full h-auto aspect-square object-contain rounded-lg"
                  loading="eager"
                />
              ) : (
                // On desktop, show the rotating frames
                <>
                  {machineImages.map((path, index) => (
                    <img 
                      key={index}
                      ref={index === 0 ? imageRef : undefined}
                      src={path} 
                      alt={`ASITA Machine Rotation Frame ${index + 1}`}
                      className={`w-full h-auto aspect-square object-contain rounded-lg absolute top-0 left-0 transition-opacity duration-300 ${
                        currentFrame === index ? 'opacity-100' : 'opacity-0'
                      } ${imagesLoaded[index] ? 'block' : 'hidden'}`}
                      loading={index < 4 ? "eager" : "lazy"}
                      style={{ position: index === 0 ? 'relative' : 'absolute' }}
                    />
                  ))}
                </>
              )}
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
          </div>
          
          <IntersectionObserver className="reveal-right">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">Precision</span>-engineered<br />for every rep.
            </h2>
            <p className="text-xl text-asita-muted mb-6">
              Scroll to explore every angle of the ASITA Smart Gym. Experience the future of home fitness through revolutionary design and engineering.
            </p>
            <p className="text-lg text-asita-blue">
              Scroll down to continue exploring
            </p>
          </IntersectionObserver>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-asita-blue" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyRotation;
