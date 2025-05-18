import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SEOMeta from "../components/SEOMeta";
import { ChevronRight, CreditCard, ShieldCheck } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    planType = "buy", 
    trainerId = null, 
    period = null, 
    periodData = null
  } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "United States",
    cardNumber: "",
    expiration: "",
    cvv: "",
    nameOnCard: ""
  });

  const [step, setStep] = useState(1);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // This would typically submit the payment to a payment processor
    // For now, we'll just simulate success
    setStep(3); // Move to confirmation step
  };

  // Helper function to get order details based on plan type
  const getOrderDetails = () => {
    if (planType === "buy") {
      return {
        title: "ASITA Smart Gym Machine - Pro Package",
        price: 2499,
        description: "One-time purchase"
      };
    } else if (planType === "rent") {
      return {
        title: "ASITA Smart Gym Machine - Rental",
        price: periodData?.price || 129,
        description: `${periodData?.name || "1 Month"} rental plan`
      };
    } else if (planType === "rent-pt") {
      return {
        title: "ASITA Smart Gym Machine with Personal Trainer",
        price: periodData?.price || 299,
        description: `${periodData?.name || "1 Month"} rental with personal trainer`
      };
    }
    
    return {
      title: "ASITA Smart Gym Machine",
      price: 0,
      description: "Unknown plan"
    };
  };

  const orderDetails = getOrderDetails();
  const shipping = 0; // Free shipping
  const tax = Math.round(orderDetails.price * 0.0825); // 8.25% sales tax
  const total = orderDetails.price + shipping + tax;

  // Render the appropriate checkout step
  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Shipping Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-asita-dark border border-white/20 rounded-md p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-asita-dark border border-white/20 rounded-md p-2"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-asita-dark border border-white/20 rounded-md p-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-asita-dark border border-white/20 rounded-md p-2"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-asita-dark border border-white/20 rounded-md p-2"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-asita-dark border border-white/20 rounded-md p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="w-full bg-asita-dark border border-white/20 rounded-md p-2"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-asita-dark border border-white/20 rounded-md p-2"
                required
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Spain">Spain</option>
              </select>
            </div>
            
            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={nextStep}
                className="bg-asita-blue hover:bg-opacity-90 text-white py-3 px-8 rounded-md font-medium"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold">Payment Information</h2>
            
            <div className="bg-asita-darker border border-white/10 rounded-lg p-4 flex items-center mb-6">
              <CreditCard className="text-asita-blue mr-3" />
              <span>Secure payment processing</span>
              <ShieldCheck className="text-green-500 ml-auto" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className="w-full bg-asita-dark border border-white/20 rounded-md p-2"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Expiration (MM/YY)</label>
                <input
                  type="text"
                  name="expiration"
                  value={formData.expiration}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className="w-full bg-asita-dark border border-white/20 rounded-md p-2"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  className="w-full bg-asita-dark border border-white/20 rounded-md p-2"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Name on Card</label>
              <input
                type="text"
                name="nameOnCard"
                value={formData.nameOnCard}
                onChange={handleChange}
                className="w-full bg-asita-dark border border-white/20 rounded-md p-2"
                required
              />
            </div>
            
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                className="border border-asita-blue text-asita-blue hover:bg-asita-blue/10 py-3 px-8 rounded-md font-medium"
              >
                Back
              </button>
              
              <button
                type="submit"
                className="bg-asita-blue hover:bg-opacity-90 text-white py-3 px-8 rounded-md font-medium"
              >
                Complete Purchase
              </button>
            </div>
          </form>
        );
        
      case 3:
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-semibold">Order Complete!</h2>
            
            <p className="text-asita-muted max-w-md mx-auto">
              Thank you for your order. We've sent a confirmation email to {formData.email}. Your ASITA fitness machine will be delivered soon!
            </p>
            
            <div className="bg-asita-darker border border-white/10 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span>Order #:</span>
                  <span>AST-{Math.floor(Math.random() * 100000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span>{formData.firstName} {formData.lastName}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => navigate("/")}
              className="bg-asita-blue hover:bg-opacity-90 text-white py-3 px-8 rounded-md font-medium inline-flex items-center mt-6"
            >
              Back to Home
            </button>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <>
      <SEOMeta
        title="Checkout | Fit At Home"
        description="Complete your Fit At Home purchase securely."
      />
      <div className="bg-asita-dark text-asita-text min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span className="text-gradient">Checkout</span>
          </h1>
          
          {/* Progress bar */}
          {step < 3 && (
            <div className="max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-asita-blue' : 'bg-asita-darker'}`}>
                    {step > 1 ? <Check className="w-5 h-5 text-white" /> : 1}
                  </div>
                  <span className="ml-2">Shipping</span>
                </div>
                
                <div className="w-full max-w-[100px] h-1 mx-4 bg-asita-darker">
                  <div className={`h-full bg-asita-blue transition-all ${step >= 2 ? 'w-full' : 'w-0'}`} />
                </div>
                
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-asita-blue' : 'bg-asita-darker'}`}>
                    2
                  </div>
                  <span className="ml-2">Payment</span>
                </div>
                
                <div className="w-full max-w-[100px] h-1 mx-4 bg-asita-darker">
                  <div className={`h-full bg-asita-blue transition-all ${step >= 3 ? 'w-full' : 'w-0'}`} />
                </div>
                
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-asita-blue' : 'bg-asita-darker'}`}>
                    3
                  </div>
                  <span className="ml-2">Confirmation</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              {renderStep()}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-asita-darker rounded-lg p-6 border border-white/10 sticky top-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-asita-dark rounded overflow-hidden mr-4">
                    <img 
                      src="/src/assets/images/angle.jpg" 
                      alt="ASITA Machine" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{orderDetails.title}</h3>
                    <p className="text-sm text-asita-muted">{orderDetails.description}</p>
                  </div>
                </div>
                
                {/* Trainer info if applicable */}
                {planType === "rent-pt" && trainerId && (
                  <div className="flex items-center mb-6 pb-6 border-b border-white/10">
                    <div className="w-12 h-12 bg-asita-dark rounded-full overflow-hidden mr-3">
                      <img 
                        src={`/src/assets/images/${trainerId === 1 ? '58a58777-6e52-46fc-a269-45c7e1f78aa7.jpg' : '704ddea0-3151-415c-8f0f-ce1e90c8086c.jpg'}`}
                        alt="Personal Trainer" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">Personal Trainer</h3>
                      <p className="text-sm text-asita-muted">
                        {trainerId === 1 ? 'Alex Johnson' : 
                         trainerId === 2 ? 'Sarah Chen' : 
                         trainerId === 3 ? 'Marcus Williams' : 
                         trainerId === 4 ? 'Elena Rodriguez' : 
                         trainerId === 5 ? 'David Kim' : 
                         'Leila Patel'}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2 border-b border-white/10 pb-4 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${orderDetails.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="mt-6 text-center text-sm text-asita-muted">
                  <p>All payments are secure and encrypted.</p>
                  <p className="mt-2 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 mr-1" />
                    <span>Satisfaction guaranteed</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout; 