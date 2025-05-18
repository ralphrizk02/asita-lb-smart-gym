import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AsitaLab from "./pages/AsitaLab";
import TrainerSelection from "./pages/TrainerSelection";
import RentalPeriod from "./pages/RentalPeriod";
import Checkout from "./pages/Checkout";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/asita-lab" element={<AsitaLab />} />
        <Route path="/trainer-selection" element={<TrainerSelection />} />
        <Route path="/rental-period" element={<RentalPeriod />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
