import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { PropertyProvider } from "./context/PropertyContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import CompareModal from "./components/CompareModal";
import LiveActivityTicker from "./components/LiveActivityTicker";
import MarketTicker from "./components/MarketTicker";
import VoiceCommander from "./components/VoiceCommander";
import VipConciergeBar from "./components/VipConciergeBar";
import MobileAppDock from "./components/MobileAppDock";
import RealtimeLiveEngine from "./components/RealtimeLiveEngine";
import CommandPalette from "./components/CommandPalette";

// Pages
const Home = React.lazy(() => import("./pages/Home"));
const Properties = React.lazy(() => import("./pages/Properties"));
const PropertyDetails = React.lazy(() => import("./pages/PropertyDetails"));
const Favorites = React.lazy(() => import("./pages/Favorites"));
const Agents = React.lazy(() => import("./pages/Agents"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Login = React.lazy(() => import("./pages/Login"));
const ListProperty = React.lazy(() => import("./pages/ListProperty"));
const Valuation = React.lazy(() => import("./pages/Valuation"));
const Matchmaker = React.lazy(() => import("./pages/Matchmaker"));
const AffordabilityPage = React.lazy(() => import("./pages/AffordabilityPage"));
const InteriorStudio = React.lazy(() => import("./pages/InteriorStudio"));
const MarketInsights = React.lazy(() => import("./pages/MarketInsights"));
const AgentDetails = React.lazy(() => import("./pages/AgentDetails"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const DealDesk = React.lazy(() => import("./pages/DealDesk"));
const AdminPortal = React.lazy(() => import("./pages/AdminPortal"));
const EstateBot = React.lazy(() => import("./components/EstateBot"));
const VisitListPage = React.lazy(() => import("./pages/VisitListPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

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
          <CommandPalette />
          <VipConciergeBar />
          <main style={{ flexGrow: 1 }}>
    <React.Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/properties/:id" element={<PropertyDetails />} />
              <Route path="/royal-heritage-kothi" element={<PropertyDetails defaultId={19} />} />
              <Route path="/heritage-kothi" element={<PropertyDetails defaultId={19} />} />
              <Route path="/kothi" element={<PropertyDetails defaultId={19} />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/visit-list" element={<VisitListPage />} />
              <Route path="/my-visits" element={<VisitListPage />} />
              <Route path="/visits" element={<VisitListPage />} />
              <Route path="/site-visits" element={<VisitListPage />} />
              <Route path="/deal-desk" element={<DealDesk />} />
              <Route path="/admin" element={<AdminPortal />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/agent/:id" element={<AgentDetails />} />
              <Route path="/agents/:id" element={<AgentDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Login />} />
              <Route path="/account" element={<Login />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<Login />} />
              <Route path="/list-property" element={<ListProperty />} />
              <Route path="/valuation" element={<Valuation />} />
              <Route path="/matchmaker" element={<Matchmaker />} />
              <Route path="/affordability" element={<AffordabilityPage />} />
              <Route path="/interior-studio" element={<InteriorStudio />} />
              <Route path="/market-insights" element={<MarketInsights />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
    </React.Suspense>
          </main>
          <EstateBot />
          <RealtimeLiveEngine />
          <Footer />
          <MobileAppDock />
        </div>
      </BrowserRouter>
    </PropertyProvider>
  );
}

export default App;
