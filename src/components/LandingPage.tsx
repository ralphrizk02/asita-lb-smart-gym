import { useEffect } from "react";
import Hero from "./Hero";
import ProductReveal from "./ProductReveal";
import Features from "./Features";
import StickyProductPanel from "./StickyProductPanel";
import VideoDemo from "./VideoDemo";
import TechSpecs from "./TechSpecs";
import Gallery from "./Gallery";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import CTA from "./CTA";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const LandingPage = () => {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const setupObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom, .reveal-bounce').forEach((el) => {
        observer.observe(el);
      });
    };

    setupObserver();
    
    return () => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom, .reveal-bounce').forEach((el) => {
        el.classList.remove('active');
      });
    };
  }, []);

  return (
    <div className="bg-asita-dark text-asita-text">
      <Hero />
      <ProductReveal />
      <Features />
      <StickyProductPanel />
      <VideoDemo />
      <TechSpecs />
      <Gallery />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default LandingPage;
