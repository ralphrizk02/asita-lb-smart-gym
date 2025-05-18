
import IntersectionObserver from "./IntersectionObserver";
import AnimatedNumber from "./AnimatedNumber";

const TechSpecs = () => {
  const specs = [
    { label: "Dimensions", value: 210, suffix: "cm", description: "Height x 110cm Width x 210cm Length" },
    { label: "Weight Stack", value: 100, suffix: "kg", description: "High-grade steel weight plates" },
    { label: "Resistance Range", value: 180, suffix: "°", description: "Full range of motion for all exercises" },
    { label: "Cable Load", value: 1000, suffix: "kg", description: "Maximum rated cable strength" },
  ];

  return (
    <section className="section bg-gradient-to-b from-asita-dark to-asita-darker" id="tech-specs">
      <div className="container mx-auto">
        <IntersectionObserver className="reveal mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Technical <span className="text-gradient">Specifications</span>
          </h2>
          <p className="text-asita-muted text-center max-w-2xl mx-auto">
            Built with premium materials and engineered for performance, durability and safety.
          </p>
        </IntersectionObserver>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((spec, index) => (
            <IntersectionObserver 
              key={index} 
              className="reveal" 
              delay={index * 200}
              threshold={0.5}
            >
              <div className="bg-asita-darker p-6 rounded-lg border border-white/10 h-full">
                <h3 className="text-xl font-medium mb-2 text-asita-muted">{spec.label}</h3>
                <AnimatedNumber value={spec.value} suffix={spec.suffix} delay={index * 200} />
                <p className="mt-2 text-asita-muted">{spec.description}</p>
                <div className="h-1 bg-asita-blue/20 mt-4 rounded-full overflow-hidden">
                  <div className="h-full bg-asita-blue rounded-full w-0 animate-progress origin-left"></div>
                </div>
              </div>
            </IntersectionObserver>
          ))}
        </div>

        <IntersectionObserver className="reveal mt-16">
          <div className="bg-asita-darker p-6 rounded-lg border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-4">Materials</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-asita-blue"></span>
                    <span>High-Tensile Steel Frame</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-asita-blue"></span>
                    <span>Aircraft-Grade Cables</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-asita-blue"></span>
                    <span>Premium Upholstery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-asita-blue"></span>
                    <span>Anodized Aluminum Components</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Safety Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-asita-red"></span>
                    <span>Auto-Lock Safety Mechanisms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-asita-red"></span>
                    <span>Quick-Release Cable System</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-asita-red"></span>
                    <span>Non-Slip Base Pads</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-asita-red"></span>
                    <span>Enclosed Weight Stack</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </IntersectionObserver>
      </div>
    </section>
  );
};

export default TechSpecs;
