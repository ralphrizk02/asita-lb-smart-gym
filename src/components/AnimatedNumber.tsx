
import { useEffect, useRef, useState } from 'react';
import IntersectionObserver from './IntersectionObserver';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  threshold?: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 2000,
  delay = 0,
  suffix = '',
  threshold = 0.2,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const startTime = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isVisible) return;
    
    const animateNumber = (timestamp: number) => {
      if (startTime.current === null) {
        startTime.current = timestamp;
      }
      
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      
      setDisplayValue(Math.floor(progress * value));
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateNumber);
      }
    };
    
    setTimeout(() => {
      animationRef.current = requestAnimationFrame(animateNumber);
    }, delay);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, value, duration, delay]);

  return (
    <IntersectionObserver
      threshold={threshold}
      animationClass=''
      rootMargin="-50px"
    >
      <span
        className="font-bold text-4xl md:text-5xl text-asita-blue"
        onTransitionEnd={() => setIsVisible(true)}
      >
        {displayValue}{suffix}
      </span>
    </IntersectionObserver>
  );
};

export default AnimatedNumber;
