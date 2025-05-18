import { useEffect, useState } from "react";
import IntersectionObserver from "./IntersectionObserver";
import { X } from "lucide-react";

// Import gallery images
import image1 from "../assets/images/58efa3fe-0e20-43ec-ba05-5d4390d1e8fa-png_1180xaf.png";
import image2 from "../assets/images/0aa00581-529e-4a32-af17-641a4ddbd6a7.jpg";
import image3 from "../assets/images/dab244dd-e2ca-41a9-90da-d1ecf43711e3.jpg";
import image4 from "../assets/images/16694612-9162-47ec-a782-b15beeba7e57.jpg";
import image5 from "../assets/images/16194145-6c2a-4a89-b59b-1c12c76b654e.jpg";
import image6 from "../assets/images/5b37e58b-6f02-4c0c-b0b4-2b92479af163.jpg";
import image7 from "../assets/images/8e5241d9-1aa2-4613-a5ac-8194b9759aad-jpg_1920xaf.jpg";
import image8 from "../assets/images/58a58777-6e52-46fc-a269-45c7e1f78aa7.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  // Create an array with gallery images
  const images = [image1, image2, image3, image4, image5, image6, image7, image8];

  useEffect(() => {
    // Initialize the imagesLoaded array
    setImagesLoaded(Array(images.length).fill(false));
    
    // Preload images
    images.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImagesLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });
  }, [images.length]);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="section bg-asita-dark" id="gallery">
      <div className="container mx-auto">
        <IntersectionObserver className="reveal mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            ASITA <span className="text-gradient">Gallery</span>
          </h2>
          <p className="text-asita-muted text-center max-w-2xl mx-auto">
            See the ASITA Smart Gym in action across different workout styles and environments.
          </p>
        </IntersectionObserver>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <IntersectionObserver 
              key={index} 
              className="reveal-zoom" 
              delay={index * 100}
            >
              <div 
                className="aspect-square overflow-hidden rounded-lg cursor-pointer relative group"
                onClick={() => openLightbox(index)}
              >
                <div className={`w-full h-full transition-opacity duration-500 ${imagesLoaded[index] ? 'opacity-100' : 'opacity-0'}`}>
                  <img 
                    src={src} 
                    alt={`ASITA Smart Gym - Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading={index < 4 ? "eager" : "lazy"}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium">View Image</p>
                </div>
              </div>
            </IntersectionObserver>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-4 right-4 text-white hover:text-asita-blue"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={images[selectedImage]} 
              alt={`ASITA Smart Gym - Image ${selectedImage + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
