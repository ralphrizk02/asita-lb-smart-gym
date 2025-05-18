
import { useRef } from "react";
import IntersectionObserver from "./IntersectionObserver";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const testimonials = [
    {
      quote: "I replaced 4 machines with ASITA. Best decision ever.",
      author: "John Doe",
      role: "Home Gym Enthusiast",
      stars: 5
    },
    {
      quote: "Clients love how versatile and clean it feels.",
      author: "Mike Trainer",
      role: "Personal Trainer",
      stars: 5
    },
    {
      quote: "Set it up in 45 minutes. It's solid and smooth.",
      author: "Sarah W.",
      role: "Fitness Studio Owner",
      stars: 4
    },
    {
      quote: "The app integration makes tracking my progress so easy.",
      author: "Alex Johnson",
      role: "Tech Professional",
      stars: 5
    },
    {
      quote: "Completely transformed my home workouts. Worth every penny.",
      author: "Jennifer Lee",
      role: "Busy Professional",
      stars: 5
    }
  ];

  return (
    <section className="section bg-gradient-to-b from-asita-darker to-asita-dark" id="testimonials">
      <div className="container mx-auto">
        <IntersectionObserver className="reveal mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            What Our <span className="text-gradient">Users Say</span>
          </h2>
          <p className="text-asita-muted text-center max-w-2xl mx-auto">
            Hear from our community of fitness enthusiasts, personal trainers, and gym owners.
          </p>
        </IntersectionObserver>

        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto space-x-6 pb-8 snap-x no-scrollbar"
          >
            {testimonials.map((testimonial, index) => (
              <IntersectionObserver 
                key={index} 
                className="reveal flex-shrink-0 snap-center"
                delay={index * 150}
              >
                <div className="w-72 md:w-80 bg-asita-darker p-6 rounded-lg border border-white/10 h-full">
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.stars ? 'text-asita-blue fill-asita-blue' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                  <p className="text-lg mb-6">"{testimonial.quote}"</p>
                  <div className="mt-auto">
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm text-asita-muted">{testimonial.role}</p>
                  </div>
                </div>
              </IntersectionObserver>
            ))}
          </div>
          
          <div className="flex justify-center mt-6 gap-4">
            <button 
              onClick={scrollLeft}
              className="p-2 rounded-full border border-white/10 hover:border-asita-blue hover:bg-asita-blue/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollRight}
              className="p-2 rounded-full border border-white/10 hover:border-asita-blue hover:bg-asita-blue/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
