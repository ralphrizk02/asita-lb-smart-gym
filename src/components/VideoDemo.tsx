import { Play } from "lucide-react";
import IntersectionObserver from "./IntersectionObserver";
import { useState, useEffect, useRef } from "react";

// Import workout image for thumbnail and video
import workoutImage from "../assets/images/70433530-2de3-4f76-bd81-efb1a59eadc6-jpg_1920xaf.jpg";
import asitaVideo from "../assets/images/WhatsApp Video 2025-05-17 at 12.02.17 PM.webm";

const VideoDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Preload image
    const img = new Image();
    img.src = workoutImage;
    img.onload = () => setImageLoaded(true);
    
    // Check for mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handlePlayVideo = () => {
    setIsPlaying(true);
    // Small timeout to ensure DOM is updated before playing
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.error("Error playing video:", error);
          // Fallback if autoplay fails due to browser policies
          setIsPlaying(false);
        });
      }
    }, 100);
  };

  return (
    <section className="section bg-asita-dark py-20" id="video-demo">
      <div className="container mx-auto px-4">
        <IntersectionObserver className="reveal mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            See <span className="text-gradient">ASITA</span> in Action
          </h2>
          <p className="text-asita-muted text-center max-w-2xl mx-auto">
            Watch how ASITA transforms your home workout experience with its versatile design and premium functionality.
          </p>
        </IntersectionObserver>

        <IntersectionObserver className="reveal-zoom relative rounded-lg overflow-hidden shadow-lg shadow-asita-blue/20">
          {!isPlaying ? (
            <div className="relative aspect-video bg-asita-darker">
              {imageLoaded ? (
                <img 
                  src={workoutImage} 
                  alt="Video thumbnail" 
                  className="w-full h-full object-cover opacity-70"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-asita-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={handlePlayVideo}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-asita-blue/90 flex items-center justify-center hover:bg-asita-blue transition-colors duration-300"
                  aria-label="Play video"
                >
                  <Play className="w-6 h-6 md:w-8 md:h-8 text-white" fill="white" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-xl md:text-2xl font-bold">ASITA Smart Gym Workout Example</h3>
                <p className="text-sm md:text-base opacity-80">Strength Training Demonstration</p>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-asita-darker">
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                poster={workoutImage}
                playsInline
              >
                <source src={asitaVideo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </IntersectionObserver>
      </div>
    </section>
  );
};

export default VideoDemo;
