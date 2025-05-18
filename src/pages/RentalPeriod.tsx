import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SEOMeta from "../components/SEOMeta";
import { Check } from "lucide-react";

type Period = {
  id: string;
  months: number;
  name: string;
  price: number;
  discount: number;
  isPopular: boolean;
};

const RentalPeriod = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { planType, trainerId } = location.state || { planType: "rent", trainerId: null };
  
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const rentalPriceBase = planType === "rent-pt" ? 299 : 129;

  const periods: Period[] = [
    {
      id: "1month",
      months: 1,
      name: "1 Month",
      price: rentalPriceBase,
      discount: 0,
      isPopular: false
    },
    {
      id: "3month",
      months: 3,
      name: "3 Months",
      price: rentalPriceBase * 3 * 0.95, // 5% discount
      discount: 5,
      isPopular: true
    },
    {
      id: "6month",
      months: 6,
      name: "6 Months",
      price: rentalPriceBase * 6 * 0.9, // 10% discount
      discount: 10,
      isPopular: false
    },
    {
      id: "12month",
      months: 12,
      name: "1 Year",
      price: rentalPriceBase * 12 * 0.8, // 20% discount
      discount: 20,
      isPopular: false
    }
  ];

  const handleSelectPeriod = (id: string) => {
    setSelectedPeriod(id);
  };

  const handleContinue = () => {
    if (selectedPeriod) {
      const selectedPeriodData = periods.find(p => p.id === selectedPeriod);
      navigate("/checkout", {
        state: {
          planType,
          trainerId,
          period: selectedPeriod,
          periodData: selectedPeriodData
        }
      });
    }
  };

  return (
    <>
      <SEOMeta
        title={`Select Your Rental Period | Fit At Home`}
        description="Choose how long you want to rent your ASITA fitness machine."
      />
      <div className="bg-asita-dark text-asita-text min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Select Your <span className="text-gradient">Rental Period</span>
          </h1>
          <p className="text-asita-muted text-center max-w-2xl mx-auto mb-12">
            {planType === "rent-pt" 
              ? "Choose how long you want to rent your ASITA machine with a personal trainer."
              : "Choose how long you want to rent your ASITA fitness machine."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {periods.map((period) => (
              <div
                key={period.id}
                className={`bg-asita-darker rounded-lg p-6 cursor-pointer transition-all border 
                  ${selectedPeriod === period.id
                    ? 'border-asita-blue shadow-lg shadow-asita-blue/20'
                    : 'border-white/10 hover:border-white/30'
                  }
                  ${period.isPopular ? 'relative' : ''}
                `}
                onClick={() => handleSelectPeriod(period.id)}
              >
                {period.isPopular && (
                  <div className="absolute top-0 right-0 bg-asita-blue text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    Popular
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{period.name}</h3>
                  {selectedPeriod === period.id && (
                    <Check className="text-asita-blue" />
                  )}
                </div>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-asita-blue">
                    ${Math.round(period.price)}
                  </span>
                  <span className="text-asita-muted ml-1">
                    {period.months > 1 ? `total` : `/month`}
                  </span>
                </div>
                
                {period.discount > 0 && (
                  <div className="bg-green-900/30 text-green-400 text-sm py-1 px-2 rounded mb-4 inline-block">
                    Save {period.discount}%
                  </div>
                )}
                
                <div className="text-sm text-asita-muted">
                  {period.months > 1 ? (
                    <span>${Math.round(period.price / period.months)}/month</span>
                  ) : (
                    <span>No commitment</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button
              className={`py-3 px-8 rounded-md font-medium transition-colors ${
                selectedPeriod
                  ? 'bg-asita-blue hover:bg-opacity-90 text-white'
                  : 'bg-asita-darker text-asita-muted cursor-not-allowed'
              }`}
              disabled={!selectedPeriod}
              onClick={handleContinue}
            >
              Continue to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RentalPeriod; 