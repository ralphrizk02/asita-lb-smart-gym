import { ReactNode, useEffect, useRef, useState } from 'react';

interface StickySectionProps {
  children?: ReactNode; // Make children optional
  className?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  id?: string;
}

const StickySection: React.FC<StickySectionProps> = ({
  children,
  className = '',
  leftContent,
  rightContent,
  id,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress
      const progress = 1 - (top / (viewportHeight - height * 0.5));
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className={`section ${className}`} ref={sectionRef} id={id}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div className={`md:sticky top-1/4 transform transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          {leftContent || children}
        </div>
        <div>
          {rightContent || null}
        </div>
      </div>
    </section>
  );
};

export default StickySection;
