
import { useEffect, useRef, useState } from 'react';
import { Shield, SlidersHorizontal, Layers, Lock } from "lucide-react";

interface FeatureSection {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

const features: FeatureSection[] = [
  {
    id: "resistance",
    title: "Resistance Engine",
    description: "Adaptive resistance technology that adjusts to your strength and movement patterns for optimal muscle engagement.",
    icon: <SlidersHorizontal className="w-12 h-12" />,
    color: "from-blue-500 to-cyan-300"
  },
  {
    id: "pulley",
    title: "Pulley Mechanism",
    description: "Frictionless 360° rotation system provides smooth, consistent resistance throughout the entire range of motion.",
    icon: <Layers className="w-12 h-12" />,
    color: "from-purple-500 to-pink-300"
  },
  {
    id: "frame",
    title: "Frame Durability",
    description: "Commercial-grade steel construction rated for 1000kg and designed to withstand years of intensive use.",
    icon: <Shield className="w-12 h-12" />,
    color: "from-red-500 to-orange-300"
  },
  {
    id: "safety",
    title: "Safety Lock System",
    description: "Intelligent auto-locking mechanism prevents accidents and ensures proper form during every exercise.",
    icon: <Lock className="w-12 h-12" />,
    color: "from-green-500 to-emerald-300"
  }
];

const FeatureScrollLock = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    // Initialize refs array
    sectionRefs.current = features.map((_, i) => 
      document.getElementById(`feature-section-${i}`)
    );
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Find which section is currently in view
      for (let i = 0; i < sectionRefs.current.length; i++) {
        const section = sectionRefs.current[i];
        if (!section) continue;
        
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveFeature(i);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="bg-black text-white">
      {features.map((feature, index) => (
        <section
          key={feature.id}
          id={`feature-section-${index}`}
          className="min-h-screen flex items-center justify-center relative snap-start"
        >
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 transition-opacity duration-1000 ${activeFeature === index ? 'opacity-10' : 'opacity-0'}`}
          ></div>
          
          <div className="max-w-5xl mx-auto px-6 py-24 text-center">
            <div 
              className={`transform transition-all duration-700 ${activeFeature === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="flex justify-center mb-8">
                <div className={`p-4 rounded-full bg-gradient-to-br ${feature.color} bg-opacity-20`}>
                  {feature.icon}
                </div>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold mb-6">
                {feature.title}
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                {feature.description}
              </p>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-0 w-full flex justify-center gap-4">
            {features.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${activeFeature === i ? 'bg-asita-blue w-6' : 'bg-white/30'}`}
                onClick={() => {
                  document.getElementById(`feature-section-${i}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label={`Go to feature ${i + 1}`}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default FeatureScrollLock;
