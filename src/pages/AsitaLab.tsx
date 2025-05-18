import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import SEOMeta from "../components/SEOMeta";

// ASITA color palette - using orange colors from their website
const asitaColors = {
  orange: "#FF6B00", // Primary orange
  darkOrange: "#E05A00",
  lightOrange: "#FF8A3D",
  background: "#121212",
  darkGray: "#1A1A1A",
  lightGray: "#2A2A2A",
  accent: "#FF6B00" // Changed from #1EAEDB to ASITA orange
};

const ParallaxSection = ({ section, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Create parallax effects with different speeds
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  
  // For backgrounds, create different parallax speeds
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  
  return (
    <section 
      ref={ref}
      id={section.id}
      className="h-screen w-full relative overflow-hidden"
    >
      {/* Solid Color Background with Gradient */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <div
          className="absolute inset-0 w-full h-full"
          style={{ 
            background: index === 0 
              ? `radial-gradient(circle at 50% 30%, ${asitaColors.darkGray}, ${asitaColors.background})`
              : index === 1
              ? `linear-gradient(135deg, ${asitaColors.orange}20, ${asitaColors.background})`
              : index === 2
              ? `linear-gradient(135deg, ${asitaColors.darkOrange}20, ${asitaColors.background})`
              : `linear-gradient(135deg, ${asitaColors.lightOrange}20, ${asitaColors.background})`
          }}
        />
      </motion.div>
      
      {/* Parallax Glow Effect */}
      <motion.div 
        className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full opacity-20 blur-[100px]"
        style={{ 
          backgroundColor: index === 0 ? asitaColors.accent : asitaColors.orange,
          y: y3
        }}
      />
      
      {/* Overlay gradient with subtle parallax */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" 
      />
      
      {/* Content with parallax effect */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Text content with parallax effect */}
            <motion.div style={{ y, scale, opacity }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false }}
              >
                <span 
                  className="inline-block px-4 py-1 rounded-full text-sm font-medium tracking-widest mb-6"
                  style={{ 
                    backgroundColor: index === 0 ? asitaColors.accent : asitaColors.orange,
                    color: "#FFFFFF"
                  }}
                >
                  {section.subtitle}
                </span>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">{section.title}</h2>
                <p className="text-xl text-white/80 max-w-md">{section.description}</p>
                
                {/* Only show button in CTA section */}
                {section.id === "cta" && (
                  <button
                    className="mt-8 px-8 py-4 rounded-full text-white font-medium flex items-center gap-2 transition-all"
                    style={{ 
                      backgroundColor: asitaColors.orange,
                      boxShadow: `0 10px 25px -5px ${asitaColors.orange}80`
                    }}
                  >
                    Get early access
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                )}
              </motion.div>
            </motion.div>
            
            {/* Visual element with parallax effect - solid color versions */}
            <div className="hidden md:block">
              <motion.div
                style={{ 
                  y: useTransform(scrollYProgress, [0, 1], [0, -30]),
                  opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
                }}
                className="aspect-square relative overflow-hidden rounded-2xl"
              >
                {/* Different visual elements based on section */}
                {index === 0 && (
                  <div className="relative w-full h-full">
                    <motion.div 
                      className="absolute inset-0 rounded-2xl" 
                      style={{
                        background: `radial-gradient(circle at center, ${asitaColors.accent}40, ${asitaColors.background})`,
                        boxShadow: `inset 0 0 50px ${asitaColors.accent}20`,
                        y: useTransform(scrollYProgress, [0, 1], [0, -15])
                      }}
                    />
                    <div className="h-full flex items-center justify-center">
                      <motion.div 
                        style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 10]) }}
                        className="text-8xl font-bold text-white/10"
                      >
                        ASITA
                      </motion.div>
                    </div>
                  </div>
                )}
                
                {index === 1 && (
                  <div className="relative w-full h-full overflow-hidden rounded-2xl">
                    <motion.div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(45deg, ${asitaColors.darkGray}, ${asitaColors.orange}30, ${asitaColors.darkGray})`,
                        scale: useTransform(scrollYProgress, [0, 1], [1, 1.1]),
                        y: useTransform(scrollYProgress, [0, 1], [0, -20])
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <motion.div 
                      className="absolute bottom-8 left-8" 
                      style={{ y: useTransform(scrollYProgress, [0, 1], [0, -10]) }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asitaColors.orange }} />
                        <span className="text-white/80 text-sm">AI-Powered</span>
                      </div>
                    </motion.div>
                    
                    {/* Decorative element */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full" style={{ backgroundColor: `${asitaColors.orange}20` }}>
                      <motion.div 
                        className="w-full h-full flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="w-20 h-1" style={{ backgroundColor: asitaColors.orange }}></div>
                      </motion.div>
                    </div>
                  </div>
                )}
                
                {index === 2 && (
                  <div className="relative w-full h-full overflow-hidden rounded-2xl">
                    <motion.div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${asitaColors.darkOrange}40, ${asitaColors.darkGray})`,
                        scale: useTransform(scrollYProgress, [0, 1], [1, 1.1]),
                        y: useTransform(scrollYProgress, [0, 1], [0, -20])
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <motion.div 
                      className="absolute bottom-8 left-8" 
                      style={{ y: useTransform(scrollYProgress, [0, 1], [0, -10]) }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asitaColors.darkOrange }} />
                        <span className="text-white/80 text-sm">Premium Build</span>
                      </div>
                    </motion.div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid grid-cols-2 gap-4">
                      <motion.div 
                        className="w-16 h-16 rounded-lg border-2"
                        style={{ borderColor: asitaColors.darkOrange }}
                        animate={{ rotate: 45 }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
                      />
                      <motion.div 
                        className="w-16 h-16 rounded-lg border-2"
                        style={{ borderColor: asitaColors.darkOrange }}
                        animate={{ rotate: -45 }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
                      />
                    </div>
                  </div>
                )}
                
                {index === 3 && (
                  <div className="relative w-full h-full overflow-hidden rounded-2xl">
                    <motion.div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(225deg, ${asitaColors.lightOrange}40, ${asitaColors.darkGray})`,
                        scale: useTransform(scrollYProgress, [0, 1], [1, 1.1]),
                        y: useTransform(scrollYProgress, [0, 1], [0, -20])
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <motion.div 
                      className="absolute bottom-8 left-8" 
                      style={{ y: useTransform(scrollYProgress, [0, 1], [0, -10]) }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asitaColors.lightOrange }} />
                        <span className="text-white/80 text-sm">Early Access</span>
                      </div>
                    </motion.div>
                    
                    {/* Animated decorative element */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className="w-32 h-32 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${asitaColors.lightOrange}10` }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <motion.div 
                          className="w-24 h-24 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${asitaColors.lightOrange}20` }}
                          animate={{ scale: [1.2, 1, 1.2] }}
                          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                        >
                          <div className="w-16 h-16 rounded-full" style={{ backgroundColor: `${asitaColors.lightOrange}30` }}></div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom scroll indicator with parallax */}
      {index < 3 && (
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 20]) }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 13l5 5l5-5"></path>
              <path d="M7 6l5 5l5-5"></path>
            </svg>
          </motion.div>
          <span className="text-xs text-white/30 mt-1">Scroll</span>
        </motion.div>
      )}
    </section>
  );
};

const AsitaLab = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  
  // Sections data with animations and content
  const sections = [
    {
      id: "hero",
      title: "ASITA LAB",
      subtitle: "THE FUTURE OF FITNESS",
      description: "Welcome to ASITA Lab, where we're revolutionizing home fitness with cutting-edge technology and design.",
      color: asitaColors.accent
    },
    {
      id: "features",
      title: "SMART FEATURES",
      subtitle: "INTELLIGENT DESIGN",
      description: "Discover how our AI-powered technology adapts to your fitness journey, providing personalized workouts and real-time feedback.",
      color: asitaColors.orange
    },
    {
      id: "materials",
      title: "PREMIUM MATERIALS",
      subtitle: "BUILT TO LAST",
      description: "Every component is crafted from the highest quality materials, ensuring durability, stability, and performance for years to come.",
      color: asitaColors.darkOrange
    },
    {
      id: "cta",
      title: "JOIN THE REVOLUTION",
      subtitle: "ELEVATE YOUR FITNESS",
      description: "Be among the first to experience the future of home fitness with ASITA Smart Gym. Limited units available for early adopters.",
      color: asitaColors.lightOrange
    }
  ];

  // Update active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate active section based on scroll position
      let newActiveSection = 0;
      
      sections.forEach((_, index) => {
        if (scrollPosition >= index * windowHeight * 0.9) {
          newActiveSection = index;
        }
      });
      
      setActiveSection(newActiveSection);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections.length]);

  return (
    <div 
      ref={containerRef}
      className="bg-black text-white overflow-hidden"
      style={{ backgroundColor: asitaColors.background }}
    >
      <SEOMeta 
        title="ASITA Lab | Experimental Experience"
        description="Explore the cutting-edge experimental features of ASITA Smart Gym."
        type="article"
      />
      
      {/* Return to main site button with updated style */}
      <div className="fixed top-8 left-8 z-50">
        <Link 
          to="/" 
          className="px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center gap-2 hover:bg-white/20 transition-all group"
          style={{ borderColor: `${asitaColors.orange}40` }}
        >
          <span className="text-white">&#8592;</span>
          <span className="text-white/80 group-hover:text-white transition-colors">Return to Fit At Home</span>
        </Link>
      </div>
      
      {/* Progress indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {sections.map((section, index) => (
          <div
            key={index}
            className="relative cursor-pointer"
            onClick={() => {
              const element = document.getElementById(section.id);
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === index ? 'w-3 h-3' : 'bg-white/30'
              }`}
              style={{
                backgroundColor: activeSection === index ? 
                  (index === 0 ? asitaColors.accent : asitaColors.orange) : 
                  'rgba(255,255,255,0.3)'
              }}
            />
            {activeSection === index && (
              <div className="absolute left-4 top-0 text-xs whitespace-nowrap opacity-50">
                {section.id}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Parallax sections */}
      {sections.map((section, index) => (
        <ParallaxSection
          key={section.id}
          section={section}
          index={index}
        />
      ))}
    </div>
  );
};

export default AsitaLab;
