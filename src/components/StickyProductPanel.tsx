import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Import workout images with correct paths
import workoutImage from "../assets/images/704ddea0-3151-415c-8f0f-ce1e90c8086c.jpg";
import angleImage from "../assets/images/5f4f9360-8da7-44eb-b1de-4ba1d23d11a4-png_1180xaf.png";
import frontView from "../assets/images/634e80cb-b4a6-49d9-8b0c-d29a49bc619d-png_1180xaf.png";
import detailView from "../assets/images/13cdd7ee-223a-4053-a80a-80b40148f4e2-png_1180xaf.png";

const StickyProductPanel = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([false, false, false, false]);
  
  const panels = [
    {
      title: "Chest & Arm Workouts",
      description: "Target your chest, biceps, triceps and shoulders with over 15 specialized cable movements. Isolate muscle groups or combine for compound growth.",
      image: workoutImage,
      color: "#3B82F6" // Blue
    },
    {
      title: "Leg & Glute Targeting",
      description: "From squats to leg extensions, hit your lower body with precision. The adjustable bench and cable system allows for complete leg development.",
      image: angleImage,
      color: "#10B981" // Green
    },
    {
      title: "Core & Cable Work",
      description: "Develop a rock-solid core with rotational movements and anti-rotation holds. The smooth cable system ensures constant tension for maximum results.",
      image: frontView,
      color: "#8B5CF6" // Purple
    },
    {
      title: "Custom Attachments",
      description: "Switch between bars, handles, straps and more with our quick-release attachment system. Each designed for specific movement patterns.",
      image: detailView,
      color: "#F59E0B" // Amber
    }
  ];

  // Preload images
  useEffect(() => {
    panels.forEach((panel, index) => {
      const img = new Image();
      img.src = panel.image;
      img.onload = () => {
        setImageLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });
  }, []);

  // Handle scroll-based panel transitions
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !contentRef.current) return;
      
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate overall scroll progress
      const progress = Math.max(0, Math.min(1, 1 - (top / (viewportHeight - height * 0.5))));
      setScrollProgress(progress);
      
      // Calculate active panel index based on content scroll position
      const contentRect = contentRef.current.getBoundingClientRect();
      const contentCenter = contentRect.top + contentRect.height / 2;
      const windowCenter = window.innerHeight / 2;
      
      // Get panel elements
      const panelElements = Array.from(contentRef.current.querySelectorAll('.panel-item'));
      
      // Find the panel closest to the center of the viewport
      let closestPanel = 0;
      let minDistance = Infinity;
      
      panelElements.forEach((panel, index) => {
        const rect = panel.getBoundingClientRect();
        const panelCenter = rect.top + rect.height / 2;
        const distance = Math.abs(panelCenter - windowCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestPanel = index;
        }
      });
      
      setActivePanel(closestPanel);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-gradient-to-b from-asita-dark to-black min-h-[250vh] py-24"
      id="sticky-panel"
    >
      <div className="absolute inset-0 w-full h-full opacity-30">
        <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-asita-blue/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-asita-blue/5 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            The <span className="text-asita-blue">Complete</span> Home Gym Experience
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-asita-muted text-xl max-w-3xl mx-auto"
          >
            One machine, unlimited possibilities. Target every muscle group with expert precision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left side - Sticky Images with 3D effect */}
          <div className="lg:col-span-6 lg:sticky top-24 h-[80vh] flex items-center">
            <div className="w-full h-full relative overflow-hidden rounded-2xl">
              {/* 3D rotating effect using perspective */}
              <div 
                className="w-full h-full perspective-1000"
                style={{ 
                  perspective: "1000px",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Image container with dynamic rotation */}
                <motion.div 
                  className="relative w-full h-full"
                  style={{ 
                    transformStyle: "preserve-3d",
                    rotateY: scrollProgress * 25 - 5,
                    rotateX: scrollProgress * -10
                  }}
                  animate={{
                    scale: [1, 1.02, 1],
                    transition: { duration: 5, repeat: Infinity, repeatType: "reverse" }
                  }}
                >
                  {panels.map((panel, index) => (
                    <motion.div 
                      key={index}
                      className="absolute inset-0 rounded-2xl overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: activePanel === index ? 1 : 0,
                        scale: activePanel === index ? 1 : 0.9
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {imageLoaded[index] ? (
                        <>
                          <div 
                            className="absolute inset-0 z-10"
                            style={{
                              background: `radial-gradient(circle at center, ${panel.color}20, transparent 70%)`,
                              boxShadow: `inset 0 0 100px ${panel.color}30`
                            }}
                          ></div>
                          <img 
                            src={panel.image}
                            alt={panel.title}
                            className="w-full h-full object-cover rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                          />
                          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20"></div>
                          <div 
                            className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/70 to-transparent"
                          ></div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-asita-darker rounded-2xl">
                          <div className="w-12 h-12 border-4 border-t-transparent border-asita-blue rounded-full animate-spin"></div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  {/* Glowing orb effect */}
                  <div className="absolute right-1/4 top-1/4 w-32 h-32 rounded-full blur-3xl opacity-30"
                    style={{ 
                      background: panels[activePanel].color,
                      transform: `translateZ(40px)`
                    }}
                  ></div>
                </motion.div>
              </div>
              
              {/* Active panel indicator */}
              <motion.div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {panels.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activePanel === index 
                        ? `w-6 bg-${panels[activePanel].color}`
                        : 'bg-white/30'
                    }`}
                    style={{
                      backgroundColor: activePanel === index ? panels[activePanel].color : 'rgba(255,255,255,0.3)'
                    }}
                  ></div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right side - Content Panels with large spacing */}
          <div 
            ref={contentRef}
            className="lg:col-span-6 space-y-[60vh]"
          >
            {panels.map((panel, index) => (
              <motion.div 
                key={index}
                className="panel-item"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0
                }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.1 
                }}
                viewport={{ once: false, margin: "-100px" }}
              >
                <div 
                  className={`relative p-8 md:p-10 rounded-2xl transition-all duration-500 overflow-hidden ${
                    activePanel === index 
                      ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-white/10 shadow-lg' 
                      : 'bg-transparent border border-white/5'
                  }`}
                >
                  {/* Background glow effect */}
                  {activePanel === index && (
                    <div 
                      className="absolute top-0 left-0 w-full h-full blur-2xl opacity-20"
                      style={{ 
                        background: `radial-gradient(circle at top left, ${panel.color}, transparent 70%)`
                      }}
                    ></div>
                  )}
                  
                  {/* Indicator number */}
                  <div 
                    className="absolute -top-6 -left-6 w-16 h-16 flex items-center justify-center text-4xl font-bold opacity-10"
                  >
                    {index + 1}
                  </div>
                  
                  {/* Content with dynamic accent color */}
                  <div className="relative z-20">
                    <motion.div
                      animate={{ y: activePanel === index ? [0, -5, 0] : 0 }}
                      transition={{ duration: 3, repeat: activePanel === index ? Infinity : 0, repeatType: "reverse" }}
                    >
                      <div 
                        className={`w-16 h-1 mb-6 transition-all duration-500 ${activePanel === index ? 'w-24' : ''}`}
                        style={{ backgroundColor: panel.color }}
                      ></div>
                      
                      <h3 
                        className="text-3xl md:text-4xl font-bold mb-4 transition-all duration-300"
                        style={{ color: activePanel === index ? panel.color : '#FFF' }}
                      >
                        {panel.title}
                      </h3>
                      
                      <p className="text-lg md:text-xl text-white/80 max-w-lg">
                        {panel.description}
                      </p>
                      
                      {/* Action button that appears when panel is active */}
                      {activePanel === index && (
                        <motion.button
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="mt-8 px-6 py-3 rounded-full text-white font-medium flex items-center gap-2 transition-all"
                          style={{ 
                            backgroundColor: panel.color,
                            boxShadow: `0 10px 25px -5px ${panel.color}80`
                          }}
                        >
                          Learn more
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </motion.button>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyProductPanel;
