import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEOMeta from "../components/SEOMeta";
import { Check, ChevronDown, Search } from "lucide-react";

type Trainer = {
  id: number;
  name: string;
  specialization: string;
  location: string;
  experience: string;
  rating: number;
  image: string;
  bio: string;
};

const TrainerSelection = () => {
  const navigate = useNavigate();
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null);
  const [specialization, setSpecialization] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");
  const [showFilter, setShowFilter] = useState(false);

  // Mock trainer data
  const trainers: Trainer[] = [
    {
      id: 1,
      name: "Alex Johnson",
      specialization: "Weight Loss",
      location: "New York, USA",
      experience: "8 years",
      rating: 4.9,
      image: "/src/assets/images/58a58777-6e52-46fc-a269-45c7e1f78aa7.jpg",
      bio: "Specializes in transformational weight loss journeys. Alex has helped hundreds of clients achieve sustainable results through balanced nutrition and progressive training."
    },
    {
      id: 2,
      name: "Sarah Chen",
      specialization: "Strength",
      location: "Los Angeles, USA",
      experience: "6 years",
      rating: 4.7,
      image: "/src/assets/images/16694612-9162-47ec-a782-b15beeba7e57.jpg",
      bio: "Competitive powerlifter and strength coach. Sarah focuses on building functional strength and proper technique for long-term physical development."
    },
    {
      id: 3,
      name: "Marcus Williams",
      specialization: "Rehabilitation",
      location: "London, UK",
      experience: "10 years",
      rating: 4.8,
      image: "/src/assets/images/704ddea0-3151-415c-8f0f-ce1e90c8086c.jpg",
      bio: "Physical therapist and rehab specialist. Marcus works with clients recovering from injuries and helps them safely return to peak performance."
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      specialization: "Weight Loss",
      location: "Madrid, Spain",
      experience: "7 years",
      rating: 4.6,
      image: "/src/assets/images/0aa00581-529e-4a32-af17-641a4ddbd6a7.jpg",
      bio: "Nutrition coach and weight management expert. Elena creates personalized plans that fit into clients' lifestyles for sustainable transformation."
    },
    {
      id: 5,
      name: "David Kim",
      specialization: "Strength",
      location: "Seoul, South Korea",
      experience: "9 years",
      rating: 4.9,
      image: "/src/assets/images/dab244dd-e2ca-41a9-90da-d1ecf43711e3.jpg",
      bio: "Former Olympic athlete specializing in strength and conditioning. David focuses on athletic performance and functional movement patterns."
    },
    {
      id: 6,
      name: "Leila Patel",
      specialization: "Rehabilitation",
      location: "Toronto, Canada",
      experience: "8 years",
      rating: 4.7,
      image: "/src/assets/images/5b37e58b-6f02-4c0c-b0b4-2b92479af163.jpg",
      bio: "Sports medicine specialist focusing on injury prevention and rehabilitation. Leila helps clients recover safely while building long-term strength."
    }
  ];

  // Filter trainers based on selected criteria
  const filteredTrainers = trainers.filter(trainer => {
    const matchesSpecialization = specialization === "all" || trainer.specialization === specialization;
    const matchesLocation = location === "all" || trainer.location.includes(location);
    return matchesSpecialization && matchesLocation;
  });

  const handleSelectTrainer = (id: number) => {
    setSelectedTrainer(id);
  };

  const handleContinue = () => {
    if (selectedTrainer) {
      navigate("/rental-period", { 
        state: { 
          planType: "rent-pt", 
          trainerId: selectedTrainer 
        } 
      });
    }
  };

  const specializations = ["all", "Weight Loss", "Strength", "Rehabilitation"];
  const locations = ["all", "USA", "UK", "Spain", "Canada", "South Korea"];

  return (
    <>
      <SEOMeta
        title="Select Your Personal Trainer | Fit At Home"
        description="Choose a personal trainer that matches your fitness goals and preferences."
      />
      <div className="bg-asita-dark text-asita-text min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Select Your <span className="text-gradient">Personal Trainer</span>
          </h1>
          <p className="text-asita-muted text-center max-w-2xl mx-auto mb-12">
            Choose a personal trainer that will guide you through your fitness journey and help you achieve your goals.
          </p>

          {/* Mobile filters toggle */}
          <div className="md:hidden mb-6">
            <button 
              className="w-full flex items-center justify-between bg-asita-darker p-4 rounded-lg border border-white/10"
              onClick={() => setShowFilter(!showFilter)}
            >
              <span>Filter Trainers</span>
              <ChevronDown className={`transition-transform ${showFilter ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter section */}
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 ${showFilter ? 'block' : 'hidden md:grid'}`}>
            <div className="md:col-span-1">
              <div className="bg-asita-darker rounded-lg p-6 border border-white/10">
                <h3 className="text-xl font-semibold mb-4">Filters</h3>
                
                {/* Specialization filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Specialization</label>
                  <select 
                    className="w-full bg-asita-dark border border-white/20 rounded-md p-2"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  >
                    {specializations.map(spec => (
                      <option key={spec} value={spec}>
                        {spec === "all" ? "All Specializations" : spec}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Location filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <select 
                    className="w-full bg-asita-dark border border-white/20 rounded-md p-2"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>
                        {loc === "all" ? "All Locations" : loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Trainer cards */}
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrainers.length > 0 ? (
                  filteredTrainers.map(trainer => (
                    <div 
                      key={trainer.id}
                      className={`bg-asita-darker rounded-lg overflow-hidden transition-all border ${selectedTrainer === trainer.id 
                        ? 'border-asita-blue shadow-lg shadow-asita-blue/20' 
                        : 'border-white/10 hover:border-white/30'}`}
                      onClick={() => handleSelectTrainer(trainer.id)}
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={trainer.image} 
                          alt={trainer.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold">{trainer.name}</h3>
                          {selectedTrainer === trainer.id && (
                            <Check className="text-asita-blue" />
                          )}
                        </div>
                        <div className="text-asita-muted text-sm mb-2">
                          {trainer.specialization} • {trainer.location}
                        </div>
                        <div className="flex items-center text-sm mb-3">
                          <div className="text-yellow-400 mr-1">★</div>
                          <span>{trainer.rating}</span>
                          <span className="mx-2">•</span>
                          <span>{trainer.experience}</span>
                        </div>
                        <p className="text-sm text-asita-muted line-clamp-3">
                          {trainer.bio}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                    <Search className="w-12 h-12 text-asita-muted mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No trainers found</h3>
                    <p className="text-asita-muted">
                      Try adjusting your filters to find a trainer that matches your criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Continue button */}
          <div className="flex justify-center mt-8">
            <button
              className={`py-3 px-8 rounded-md font-medium transition-colors ${
                selectedTrainer
                  ? 'bg-asita-blue hover:bg-opacity-90 text-white'
                  : 'bg-asita-darker text-asita-muted cursor-not-allowed'
              }`}
              disabled={!selectedTrainer}
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainerSelection; 