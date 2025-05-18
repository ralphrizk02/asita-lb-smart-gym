import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import IntersectionObserver from "./IntersectionObserver";
import ParallaxBackground from "./ParallaxBackground";

// Import the hero image
import heroImage from "../assets/images/70433530-2de3-4f76-bd81-efb1a59eadc6-jpg_1920xaf.jpg";

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleScrollDown = () => {
    const nextSection = document.getElementById('product-reveal');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Preload the hero image
    const img = new Image();
    img.src = heroImage;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section className="section relative bg-asita-darker" id="hero">
      <ParallaxBackground className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-asita-darker via-asita-darker/90 to-asita-dark"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FF6B0010,transparent_50%)]"></div>
        {/* Add hero image with fade-in effect */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${imageLoaded ? 'opacity-40' : 'opacity-0'}`}>
          <img 
            src={heroImage} 
            alt="ASITA Smart Gym" 
            className="w-full h-full object-cover object-center" 
            loading="eager" 
          />
        </div>
      </ParallaxBackground>
      
      <div className="container mx-auto flex flex-col items-center justify-center z-10 pt-20 md:pt-0">
        <IntersectionObserver className="reveal" delay={200}>
          <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-4">
            <span className="text-gradient">ASITA</span> Smart Gym
          </h1>
        </IntersectionObserver>
        
        <IntersectionObserver className="reveal" delay={400}>
          <p className="text-xl md:text-2xl text-center mb-10 max-w-2xl text-asita-muted">
            Train Smarter. Move Stronger. Dominate from Home.
          </p>
        </IntersectionObserver>
        
        <IntersectionObserver className="reveal-bounce" delay={600}>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary">
              Request Demo
            </button>
            <button className="btn-secondary">
              See It in Action
            </button>
          </div>
        </IntersectionObserver>
        
        <button 
          onClick={handleScrollDown} 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-asita-muted hover:text-asita-blue transition-colors duration-300"
          aria-label="Scroll down"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
