
import IntersectionObserver from "./IntersectionObserver";
import { Settings, SlidersHorizontal, Droplet, Speaker, Hammer, Lock } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Settings className="feature-icon" />,
      title: "Smart Pulley System",
      description: "Intelligent cable management with auto-adjusting resistance"
    },
    {
      icon: <SlidersHorizontal className="feature-icon" />,
      title: "Adjustable Resistance",
      description: "From 5kg to 100kg in precise increments for perfect progression"
    },
    {
      icon: <Droplet className="feature-icon" />,
      title: "Sweatproof Padding",
      description: "Anti-microbial, moisture-wicking material that's easy to clean"
    },
    {
      icon: <Speaker className="feature-icon" />,
      title: "Low Noise Operation",
      description: "Whisper-quiet pulleys and weights for distraction-free training"
    },
    {
      icon: <Hammer className="feature-icon" />,
      title: "Durable Steel Frame",
      description: "Commercial-grade construction with a lifetime warranty"
    },
    {
      icon: <Lock className="feature-icon" />,
      title: "Easy-Lock Safety Handles",
      description: "Quick-release attachments with secure locking mechanism"
    }
  ];

  return (
    <section className="section bg-asita-dark" id="features">
      <div className="container mx-auto">
        <IntersectionObserver className="reveal mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Superior <span className="text-gradient">Features</span>
          </h2>
          <p className="text-asita-muted text-center max-w-2xl mx-auto">
            Engineered with precision and designed for performance, the ASITA Smart Gym combines cutting-edge technology with premium craftsmanship.
          </p>
        </IntersectionObserver>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <IntersectionObserver 
              key={index} 
              className={index % 2 === 0 ? "reveal-left" : "reveal-right"}
              delay={200 + index * 100}
            >
              <div className="feature-card h-full">
                {feature.icon}
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-asita-muted">{feature.description}</p>
              </div>
            </IntersectionObserver>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
