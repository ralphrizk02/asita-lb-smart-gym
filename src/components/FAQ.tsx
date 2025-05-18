
import { useState } from "react";
import IntersectionObserver from "./IntersectionObserver";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/10">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium">{question}</h3>
        <ChevronDown 
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
        />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-asita-muted">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "What space requirements are needed for the ASITA Smart Gym?",
      answer: "The ASITA Smart Gym requires a floor space of 210cm x 110cm, and a ceiling height of at least 220cm for comfortable use. We recommend having an additional 1-2 feet of clearance on all sides for ease of movement during exercises."
    },
    {
      question: "Is assembly included with purchase?",
      answer: "Basic assembly guidance is included with all packages. The Pro package includes professional assembly service, while the Elite package includes white glove delivery and setup. DIY assembly typically takes 45-60 minutes with basic tools."
    },
    {
      question: "What is the warranty coverage?",
      answer: "The Starter package includes a 1-year warranty, the Pro package includes a 3-year extended warranty, and the Elite package includes a comprehensive 5-year premium warranty covering all parts and labor."
    },
    {
      question: "Can I upgrade my package later?",
      answer: "Yes, you can purchase additional accessories and software subscriptions separately. However, upgrading to a different machine model would require a new purchase. We offer trade-in discounts for returning customers."
    },
    {
      question: "Does the ASITA Smart Gym require maintenance?",
      answer: "The ASITA Smart Gym is designed for minimal maintenance. We recommend wiping down surfaces after use and performing a monthly check of cables and moving parts. A maintenance guide is included with your purchase."
    },
    {
      question: "Is financing available?",
      answer: "Yes, we offer financing options through our partners. Qualifying customers can spread payments over 12, 24, or 36 months with competitive interest rates. Details are available at checkout."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section bg-gradient-to-b from-asita-dark to-asita-darker" id="faq">
      <div className="container mx-auto">
        <IntersectionObserver className="reveal mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-asita-muted text-center max-w-2xl mx-auto">
            Everything you need to know about the ASITA Smart Gym.
          </p>
        </IntersectionObserver>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <IntersectionObserver 
              key={index} 
              className="reveal" 
              delay={index * 100}
            >
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => toggleFAQ(index)}
              />
            </IntersectionObserver>
          ))}
        </div>

        <IntersectionObserver className="reveal mt-12 text-center">
          <p className="text-asita-muted mb-6">
            Still have questions? Contact our support team.
          </p>
          <button className="btn-primary">
            Contact Support
          </button>
        </IntersectionObserver>
      </div>
    </section>
  );
};

export default FAQ;
