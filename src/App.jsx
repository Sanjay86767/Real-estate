import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { PropertyProvider } from "./context/PropertyContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import CompareModal from "./components/CompareModal";
import LiveActivityTicker from "./components/LiveActivityTicker";
import AiChatbot from "./components/AiChatbot";
import MarketTicker from "./components/MarketTicker";
import VoiceCommander from "./components/VoiceCommander";
import VipConciergeBar from "./components/VipConciergeBar";
import MobileQuickBar from "./components/MobileQuickBar";

// Pages
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Favorites from "./pages/Favorites";
import Agents from "./pages/Agents";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import ListProperty from "./pages/ListProperty";
import Valuation from "./pages/Valuation";
import Matchmaker from "./pages/Matchmaker";
import AffordabilityPage from "./pages/AffordabilityPage";
import InteriorStudio from "./pages/InteriorStudio";
import MarketInsights from "./pages/MarketInsights";
import AgentDetails from "./pages/AgentDetails";
import Dashboard from "./pages/Dashboard";
import DealDesk from "./pages/DealDesk";
import AdminPortal from "./pages/AdminPortal";
import EstateBot from "./components/EstateBot";
import NotFound from "./pages/NotFound";

// Scroll to top helper on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export function App() {
  return (
    <PropertyProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <MarketTicker />
          <Navbar />
          <Toast />
          <CompareModal />
          <LiveActivityTicker />
          <VoiceCommander />
          <AiChatbot />
          <VipConciergeBar />
          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/deal-desk" element={<DealDesk />} />
              <Route path="/admin" element={<AdminPortal />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/list-property" element={<ListProperty />} />
              <Route path="/valuation" element={<Valuation />} />
              <Route path="/matchmaker" element={<Matchmaker />} />
              <Route path="/affordability" element={<AffordabilityPage />} />
              <Route path="/interior-studio" element={<InteriorStudio />} />
              <Route path="/market-insights" element={<MarketInsights />} />
              <Route path="/agent/:id" element={<AgentDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <EstateBot />
          <Footer />
          <MobileQuickBar />
        </div>
      </BrowserRouter>
    </PropertyProvider>
  );
}

export default App;
