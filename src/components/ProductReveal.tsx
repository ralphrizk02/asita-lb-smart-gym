import IntersectionObserver from "./IntersectionObserver";
import { CheckCircle } from "lucide-react";
import workoutImage from "../assets/images/704ddea0-3151-415c-8f0f-ce1e90c8086c.jpg";

const ProductReveal = () => {
  return (
    <section className="section bg-gradient-to-b from-asita-dark to-asita-darker" id="product-reveal">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <IntersectionObserver className="reveal-left">
            <div className="bg-[radial-gradient(circle_at_center,#FF6B0010,transparent_50%)] rounded-lg p-4">
              <img 
                src={workoutImage}
                alt="ASITA Smart Gym" 
                className="w-full h-auto rounded-lg shadow-lg shadow-asita-blue/20"
              />
            </div>
          </IntersectionObserver>

          <div>
            <IntersectionObserver className="reveal-right">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                The Ultimate <span className="text-gradient">Home Gym</span> Revolution
              </h2>
            </IntersectionObserver>

            <div className="space-y-5">
              {[
                "50+ Full-Body Exercises",
                "One Machine Replaces Your Entire Gym",
                "Compact Footprint, Built for Home",
                "Elite Performance, Commercial Durability"
              ].map((feature, index) => (
                <IntersectionObserver key={index} className="reveal" delay={200 + index * 150}>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-asita-blue w-6 h-6 flex-shrink-0" />
                    <p className="text-lg">{feature}</p>
                  </div>
                </IntersectionObserver>
              ))}
            </div>

            <IntersectionObserver className="reveal" delay={800}>
              <button className="btn-primary mt-8">
                Discover More
              </button>
            </IntersectionObserver>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReveal;
