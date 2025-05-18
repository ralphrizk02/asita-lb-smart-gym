
import IntersectionObserver from "./IntersectionObserver";
import ParallaxBackground from "./ParallaxBackground";

const CTA = () => {
  return (
    <section className="section relative bg-asita-darker overflow-hidden" id="cta">
      <ParallaxBackground className="absolute inset-0 z-0" speed={0.2}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-asita-darker"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FF6B0010,transparent_50%)]"></div>
      </ParallaxBackground>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <IntersectionObserver className="reveal">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Bring Home the Power of the Gym
            </h2>
          </IntersectionObserver>
          
          <IntersectionObserver className="reveal" delay={200}>
            <p className="text-xl md:text-2xl text-asita-muted mb-8">
              Transform your fitness journey today with the most versatile home gym system ever created.
            </p>
          </IntersectionObserver>
          
          <IntersectionObserver className="reveal-bounce" delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary group">
                Book Your Demo Now
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="btn-secondary">
                Contact Sales
              </button>
            </div>
          </IntersectionObserver>
        </div>
      </div>
    </section>
  );
};

export default CTA;
