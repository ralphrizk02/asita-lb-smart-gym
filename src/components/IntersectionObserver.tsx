
import { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  animationClass?: string;
  delay?: number;
}

const IntersectionObserver: React.FC<Props> = ({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '0px',
  animationClass = 'active',
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add(animationClass);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [animationClass, rootMargin, threshold, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default IntersectionObserver;
