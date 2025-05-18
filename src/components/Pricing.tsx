import { useState } from "react";
import IntersectionObserver from "./IntersectionObserver";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "rent",
      name: "Rent",
      price: "$129/mo",
      description: "Flexibility with no long-term commitment",
      features: [
        "ASITA Machine Rental",
        "Free Delivery & Setup",
        "Monthly Maintenance",
        "Access to Basic App",
        "Change or Return Anytime"
      ],
      buttonText: "Select Plan",
      highlight: false
    },
    {
      id: "buy",
      name: "Buy",
      price: "$2,499",
      description: "Own your fitness journey with a one-time purchase",
      features: [
        "ASITA Pro Machine",
        "Extended Accessory Kit",
        "Professional Assembly",
        "3-Year Extended Warranty",
        "Lifetime App Access",
        "Free Software Updates"
      ],
      buttonText: "Select Plan",
      highlight: true
    },
    {
      id: "rent-pt",
      name: "Rent with Personal Trainer",
      price: "$299/mo",
      description: "Maximum results with expert guidance",
      features: [
        "ASITA Machine Rental",
        "Dedicated Personal Trainer",
        "Custom Workout Programs",
        "Weekly Check-ins",
        "Nutrition Guidance",
        "Premium App Access"
      ],
      buttonText: "Select Plan",
      highlight: false
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    
    // Navigate based on the selected plan
    if (planId === "rent-pt") {
      navigate("/trainer-selection");
    } else if (planId === "rent") {
      navigate("/rental-period");
    } else if (planId === "buy") {
      navigate("/checkout", { state: { planType: "buy" } });
    }
  };

  return (
    <section className="section bg-asita-dark" id="pricing">
      <div className="container mx-auto">
        <IntersectionObserver className="reveal mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Fit At Home <span className="text-gradient">Subscription Plans</span>
          </h2>
          <p className="text-asita-muted text-center max-w-2xl mx-auto">
            Choose the plan that fits your fitness goals and lifestyle.
          </p>
        </IntersectionObserver>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <IntersectionObserver 
              key={index} 
              className="reveal-bounce" 
              delay={200 + index * 200}
            >
              <div 
                className={`rounded-lg ${plan.highlight 
                  ? 'bg-gradient-to-b from-asita-darker to-asita-darker border-2 border-asita-blue shadow-lg shadow-asita-blue/20' 
                  : 'bg-asita-darker border border-white/10'
                } p-6 flex flex-col h-full transition-transform duration-300 hover:scale-105`}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-asita-muted mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-asita-blue">{plan.price}</span>
                  </div>
                </div>
                
                <ul className="mb-8 flex-grow space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-asita-blue flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${
                    plan.highlight 
                      ? 'bg-asita-blue hover:bg-opacity-90 text-white' 
                      : 'bg-transparent border border-asita-blue text-asita-blue hover:bg-asita-blue/10'
                  }`}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  {plan.buttonText}
                </button>
              </div>
            </IntersectionObserver>
          ))}
        </div>
        
        <IntersectionObserver className="reveal mt-12 text-center">
          <p className="text-asita-muted">
            All plans include free delivery and setup. Financing options available at checkout.
          </p>
        </IntersectionObserver>
      </div>
    </section>
  );
};

export default Pricing;
