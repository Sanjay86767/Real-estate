import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import propertiesData from "../data/properties";
import EmiCalculator from "../components/EmiCalculator";
import InvestmentCalculator from "../components/InvestmentCalculator";
import FloorPlanViewer from "../components/FloorPlanViewer";
import NeighborhoodRadar from "../components/NeighborhoodRadar";
import SunLightingSimulator from "../components/SunLightingSimulator";
import LiveAgentChat from "../components/LiveAgentChat";
import VirtualTourModal from "../components/VirtualTourModal";
import SiteVisitModal from "../components/SiteVisitModal";
import PropertyCard from "../components/PropertyCard";
import AiInteriorStyler from "../components/AiInteriorStyler";
import EcoQualityMeter from "../components/EcoQualityMeter";
import PropertyBrochureModal from "../components/PropertyBrochureModal";
import AffordabilityCalculator from "../components/AffordabilityCalculator";
import DealDeskModal from "../components/DealDeskModal";
import SpatialStudioModal from "../components/SpatialStudioModal";
import VastuRadar from "../components/VastuRadar";
import LegalVaultModal from "../components/LegalVaultModal";
import MortgageStudioModal from "../components/MortgageStudioModal";
import EscrowModal from "../components/EscrowModal";
import Interactive3DPhotoRotator from "../components/Interactive3DPhotoRotator";
import RoyalHeritageKothiShowcase from "../components/RoyalHeritageKothiShowcase";
import sanjayPhoto from "../assets/sanjay-kumar.jpg";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Car,
  Compass,
  Building,
  CheckCircle2,
  Heart,
  Share2,
  ArrowLeft,
  ShieldCheck,
  Send,
  Phone,
  Mail,
  Star,
  Eye,
  Maximize,
  Clock,
  Printer,
  FileText,
  Lock,
  Sparkles,
  Crown,
  ExternalLink
} from "lucide-react";

export const PropertyDetails = ({ defaultId }) => {
  const { id: paramId } = useParams();
  const id = paramId || defaultId || "19";
  const navigate = useNavigate();
  const {
    properties,
    agents,
    isFavorite,
    toggleFavorite,
    compareList,
    toggleCompare,
    formatPrice,
    formatArea,
    currency,
    unit,
    addToast
  } = usePropertyContext();

  // Bulletproof lookup by number ID, string ID, slug, or title match
  const property =
    properties.find((p) => p.id === Number(id)) ||
    properties.find((p) => String(p.id) === String(id)) ||
    properties.find((p) => {
      const q = String(id).toLowerCase();
      return (
        (p.title && p.title.toLowerCase().includes(q)) ||
        (q.includes("kothi") && p.id === 19) ||
        (q.includes("darbhanga") && p.id === 19) ||
        (q.includes("royal") && p.id === 19)
      );
    }) ||
    propertiesData.find((p) => p.id === Number(id)) ||
    propertiesData.find((p) => p.id === 19) ||
    properties[0];

  // Real-time active viewers pulse counter
  const [liveViewers, setLiveViewers] = useState(14);
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers((prev) => Math.min(24, Math.max(8, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Gallery active image index & Modals state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showSpatialStudio, setShowSpatialStudio] = useState(false);
  const [showDealDesk, setShowDealDesk] = useState(false);
  const [showSiteVisitModal, setShowSiteVisitModal] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [showLegalVault, setShowLegalVault] = useState(false);
  const [showMortgageStudio, setShowMortgageStudio] = useState(false);
  const [showEscrowModal, setShowEscrowModal] = useState(false);
  const [galleryMode, setGalleryMode] = useState("3d"); // "3d" or "classic"

  // Inquiry Form State
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryDate, setInquiryDate] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState(
    property ? `Hi, I am interested in "${property.title}" listed for ${property.priceFormatted}. Please arrange a site inspection.` : ""
  );
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Scroll to top when id changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveImageIndex(0);
    setInquirySubmitted(false);
  }, [id]);

  if (!property) {
    return (
      <div className="container" style={{ padding: "100px 24px", textAlign: "center", minHeight: "70vh" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "12px" }}>Property Not Found</h2>
        <p style={{ marginBottom: "24px", color: "var(--text-secondary)" }}>
          The property listing you are searching for might have been sold or removed.
        </p>
        <Link to="/properties" className="btn btn-primary">
          Browse All Properties
        </Link>
      </div>
    );
  }

  // Check if this property is Royal Heritage Kothi
  const isRoyalHeritageKothi =
    property.id === 19 ||
    (property.title && property.title.toLowerCase().includes("royal heritage")) ||
    (property.title && property.title.toLowerCase().includes("kothi"));

  // Assigned Agent (Founder Sanjay Kumar for Royal Heritage Kothi)
  const agent = isRoyalHeritageKothi
    ? {
        id: 99,
        name: "Sanjay Kumar",
        title: "Founder & Principal Heritage Consultant",
        phone: "+91 8809604880",
        email: "sanjay@estatehub.com",
        experience: "15+ Years",
        rating: 5.0,
        image: sanjayPhoto,
        verified: true,
        specialization: "Mithila Royal Estates & High-Value Portfolios"
      }
    : agents.find((a) => a.id === property.agentId) || agents[0];

  // Similar Properties (same type or same city, excluding current)
  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type))
    .slice(0, 3);

  const favoriteActive = isFavorite(property.id);

  // Share URL handler
  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast("Property link copied to clipboard!", "success");
  };

  // Inquiry Form Submit
  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryPhone.trim()) {
      addToast("Please fill in your name, email and phone number", "warning");
      return;
    }
    setInquirySubmitted(true);
    addToast(`Inquiry sent to ${agent.name}! They will call you shortly.`, "success");
  };

  const pricePerSqFt = Math.round(property.price / (property.area || 1));

  return (
    <div className="property-details-page" style={{ padding: "30px 0 80px" }}>
      <div className="container">
        {/* Back navigation & Quick Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "12px"
          }}
        >
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary btn-sm"
            style={{ gap: "6px" }}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              onClick={() => setShowBrochureModal(true)}
              className="btn btn-secondary btn-sm"
              style={{ gap: "6px", color: "var(--accent-primary)", fontWeight: 700 }}
              title="Generate Official Luxury Investment Brochure / PDF"
            >
              <FileText size={16} />
              <span>Official Brochure (PDF)</span>
            </button>

            <button
              onClick={() => toggleCompare(property.id)}
              className={`btn btn-secondary btn-sm ${compareList.includes(property.id) ? "active" : ""}`}
              style={{
                gap: "6px",
                color: compareList.includes(property.id) ? "var(--accent-primary)" : "inherit"
              }}
              title="Compare property"
            >
              <span>{compareList.includes(property.id) ? "In Comparison" : "Compare"}</span>
            </button>

            <button
              onClick={() => setShowDealDesk(true)}
              className="btn btn-gold btn-sm"
              style={{ gap: "6px", display: "inline-flex", alignItems: "center" }}
              title="Submit an offer with instant AI acceptance score"
            >
              <Sparkles size={15} />
              <span>Make Offer / Deal Desk</span>
            </button>

            <button
              onClick={handleShare}
              className="btn btn-secondary btn-sm"
              style={{ gap: "6px" }}
              title="Share this Property"
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>

            <button
              onClick={() => toggleFavorite(property.id)}
              className={`btn btn-secondary btn-sm ${favoriteActive ? "active" : ""}`}
              style={{
                gap: "6px",
                color: favoriteActive ? "var(--accent-rose)" : "inherit"
              }}
              title="Save to Favorites"
            >
              <Heart
                size={16}
                fill={favoriteActive ? "var(--accent-rose)" : "none"}
                color={favoriteActive ? "var(--accent-rose)" : "currentColor"}
              />
              <span>{favoriteActive ? "Saved" : "Save Favorite"}</span>
            </button>
          </div>
        </div>

        {/* Real-Time Live Presence Ribbon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 18px",
            background: isRoyalHeritageKothi
              ? "linear-gradient(90deg, rgba(212, 175, 55, 0.15), rgba(15, 23, 42, 0.8))"
              : "rgba(16, 185, 129, 0.1)",
            border: isRoyalHeritageKothi ? "1px solid rgba(212, 175, 55, 0.4)" : "1px solid rgba(16, 185, 129, 0.3)",
            borderRadius: "var(--radius-md)",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "10px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 10px #10b981",
                display: "inline-block"
              }}
            />
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#f8fafc" }}>
              <strong>REAL-TIME FEED:</strong> {liveViewers} active High-Net-Worth buyers reviewing this estate right now (Darbhanga, Delhi, Mumbai, Dubai & USA)
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "0.76rem", color: "#fbbf24", fontWeight: 800 }}>
              ✔ 100% RERA & Mutation Registry Title Verified
            </span>
            <a
              href="https://wa.me/918809604880?text=Hello%20Sanjay%20ji,%20I%20am%20viewing%20Raj%20Darbhanga%20Royal%20Heritage%20Kothi%20live%20and%20need%20priority%20consultation."
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "#10b981",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                textDecoration: "none"
              }}
            >
              <span>Instant WhatsApp Priority</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Title & Price Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "16px"
          }}
        >
          <div>
            {isRoyalHeritageKothi && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "5px 14px",
                  borderRadius: "var(--radius-full)",
                  background: "linear-gradient(135deg, rgba(212, 175, 55, 0.35), rgba(245, 158, 11, 0.2))",
                  border: "1px solid #fbbf24",
                  marginBottom: "8px",
                  boxShadow: "0 0 15px rgba(251, 191, 36, 0.25)"
                }}
              >
                <Crown size={15} color="#fbbf24" />
                <span style={{ fontSize: "0.76rem", fontWeight: 900, color: "#fbbf24", letterSpacing: "1px", textTransform: "uppercase" }}>
                  👑 Sovereign Mithila Heritage Residence • Darbhanga Royal Enclave
                </span>
              </div>
            )}
            <div style={{ display: "flex", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
              {property.featured && <span className="badge badge-featured">Featured</span>}
              <span className="badge badge-type">{property.type}</span>
              <span className={`badge ${property.status === "For Rent" ? "badge-rent" : "badge-sale"}`}>
                {property.status}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 10px",
                  borderRadius: "var(--radius-full)",
                  background: "var(--accent-emerald-light)",
                  color: "var(--accent-emerald)",
                  fontSize: "0.75rem",
                  fontWeight: 700
                }}
              >
                <ShieldCheck size={14} />
                RERA Verified Title
              </span>
            </div>
            <h1 style={{ fontSize: "2.4rem", marginBottom: "6px" }}>{property.title}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-secondary)", fontSize: "1rem" }}>
              <MapPin size={18} color="var(--accent-primary)" />
              <span>{property.address}</span>
            </div>
          </div>

          {/* Price Box */}
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
              Offering Price
            </span>
            <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--accent-primary)", lineHeight: 1.1 }}>
              {formatPrice(property.price)}
            </div>
            <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 600 }}>
              ≈ {currency === "USD" ? `$${Math.round(property.price / 83.5 / (property.area || 1))} / sq.ft` : `₹${pricePerSqFt.toLocaleString("en-IN")} / sq.ft`}
            </span>
          </div>
        </div>

        {/* Executive Pro Action Toolbar */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "28px",
            padding: "14px 18px",
            background: "var(--bg-card)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            alignItems: "center",
            boxShadow: "var(--shadow-sm)"
          }}
        >
          <button
            type="button"
            onClick={() => setShowLegalVault(true)}
            style={{
              padding: "9px 18px",
              borderRadius: "var(--radius-full)",
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              color: "#10b981",
              fontSize: "0.84rem",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: "7px",
              cursor: "pointer"
            }}
          >
            <ShieldCheck size={16} />
            <span>🛡️ AI RERA Title Due Diligence (98/100)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowMortgageStudio(true)}
            style={{
              padding: "9px 18px",
              borderRadius: "var(--radius-full)",
              background: "rgba(59, 130, 246, 0.12)",
              border: "1px solid rgba(59, 130, 246, 0.35)",
              color: "#3b82f6",
              fontSize: "0.84rem",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: "7px",
              cursor: "pointer"
            }}
          >
            <Building size={16} />
            <span>🏦 Bank Mortgage Desk (SBI @ 8.40%)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowDealDesk(true)}
            style={{
              padding: "9px 18px",
              borderRadius: "var(--radius-full)",
              background: "rgba(212, 175, 55, 0.12)",
              border: "1px solid rgba(212, 175, 55, 0.35)",
              color: "#d4af37",
              fontSize: "0.84rem",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: "7px",
              cursor: "pointer"
            }}
          >
            <Sparkles size={16} />
            <span>🤝 AI Deal Desk & LOI Engine</span>
          </button>

          <button
            type="button"
            onClick={() => setShowEscrowModal(true)}
            style={{
              padding: "9px 18px",
              borderRadius: "var(--radius-full)",
              background: "linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(16, 185, 129, 0.2))",
              border: "1px solid rgba(212, 175, 55, 0.4)",
              color: "var(--text-primary)",
              fontSize: "0.84rem",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              gap: "7px",
              cursor: "pointer"
            }}
          >
            <Lock size={15} color="#d4af37" />
            <span>Lock with Earnest Escrow</span>
          </button>
        </div>

        {/* VIP Photo Experience: 3D Orbital Rotator & Classic Views */}
        <div style={{ marginBottom: "40px" }}>
          {/* Mode Switcher Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "14px",
              flexWrap: "wrap",
              gap: "10px"
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "6px",
                background: "var(--bg-surface)",
                padding: "4px",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--border-light)"
              }}
            >
              <button
                type="button"
                onClick={() => setGalleryMode("3d")}
                style={{
                  padding: "7px 16px",
                  borderRadius: "var(--radius-full)",
                  border: "none",
                  background: galleryMode === "3d" ? "linear-gradient(135deg, #d4af37, #f59e0b)" : "transparent",
                  color: galleryMode === "3d" ? "#0f172a" : "var(--text-secondary)",
                  fontWeight: 800,
                  fontSize: "0.82rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  boxShadow: galleryMode === "3d" ? "0 2px 10px rgba(212, 175, 55, 0.4)" : "none"
                }}
              >
                <Sparkles size={14} />
                <span>🔄 3D Detail Orbit Rotate & Zoom (Pro Mode)</span>
              </button>

              <button
                type="button"
                onClick={() => setGalleryMode("classic")}
                style={{
                  padding: "7px 16px",
                  borderRadius: "var(--radius-full)",
                  border: "none",
                  background: galleryMode === "classic" ? "var(--accent-primary)" : "transparent",
                  color: galleryMode === "classic" ? "#ffffff" : "var(--text-secondary)",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer"
                }}
              >
                <Eye size={14} />
                <span>📷 Classic Photo View</span>
              </button>
            </div>

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                onClick={() => setShowSpatialStudio(true)}
                className="btn btn-secondary btn-sm"
                style={{ gap: "6px", color: "var(--accent-gold)", fontWeight: 700 }}
              >
                <Sparkles size={14} color="#d4af37" />
                <span>3D Spatial Skyline</span>
              </button>

              <button
                onClick={() => setShowVirtualTour(true)}
                className="btn btn-secondary btn-sm"
                style={{ gap: "6px", color: "#38bdf8", fontWeight: 700 }}
              >
                <Compass size={14} color="#38bdf8" />
                <span>360° Walkthrough</span>
              </button>
            </div>
          </div>

          {/* Interactive 3D Rotator OR Classic Gallery */}
          {galleryMode === "3d" ? (
            <Interactive3DPhotoRotator property={property} initialImageIndex={activeImageIndex} />
          ) : (
            <div>
              <div
                style={{
                  position: "relative",
                  height: "520px",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  marginBottom: "16px",
                  boxShadow: "var(--shadow-md)"
                }}
              >
                <img
                  src={property.images[activeImageIndex] || property.images[0]}
                  alt={`${property.title} - View ${activeImageIndex + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />

                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    right: "16px",
                    background: "rgba(0,0,0,0.7)",
                    backdropFilter: "blur(6px)",
                    color: "#ffffff",
                    padding: "6px 14px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.85rem",
                    fontWeight: 600
                  }}
                >
                  Photo {activeImageIndex + 1} of {property.images.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "6px" }}>
                {property.images.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: "110px",
                      height: "75px",
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden",
                      cursor: "pointer",
                      border: activeImageIndex === idx ? "3px solid var(--accent-primary)" : "2px solid transparent",
                      opacity: activeImageIndex === idx ? 1 : 0.7,
                      transition: "var(--transition)",
                      flexShrink: 0
                    }}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 360 Virtual Tour Modal */}
        {showVirtualTour && (
          <VirtualTourModal property={property} onClose={() => setShowVirtualTour(false)} />
        )}

        {/* Pro-Level Royal Heritage Kothi Master Showcase */}
        {isRoyalHeritageKothi && (
          <RoyalHeritageKothiShowcase
            property={property}
            onOpenBrochures={() => setShowBrochureModal(true)}
            onBookVisit={() => setShowSiteVisitModal(true)}
          />
        )}

        {/* Main Content Layout: Details + Sidebar Inquiry */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "36px",
            alignItems: "start"
          }}
          className="details-content-grid"
        >
          {/* Left Column */}
          <div>
            {/* 1. Quick Key Specs Grid */}
            <div
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-lg)",
                padding: "24px",
                marginBottom: "32px",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <h3 style={{ fontSize: "1.2rem", marginBottom: "18px" }}>Key Property Specifications</h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "18px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ padding: "10px", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", color: "var(--accent-primary)" }}>
                    <Bed size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Bedrooms</span>
                    <strong style={{ fontSize: "0.95rem" }}>{property.bedrooms > 0 ? `${property.bedrooms} Beds` : "Plot"}</strong>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ padding: "10px", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", color: "var(--accent-primary)" }}>
                    <Bath size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Bathrooms</span>
                    <strong style={{ fontSize: "0.95rem" }}>{property.bathrooms > 0 ? `${property.bathrooms} Baths` : "N/A"}</strong>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ padding: "10px", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", color: "var(--accent-primary)" }}>
                    <Maximize2 size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Super Area</span>
                    <strong style={{ fontSize: "0.95rem" }}>{formatArea(property.area)}</strong>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ padding: "10px", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", color: "var(--accent-primary)" }}>
                    <Calendar size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Year Built</span>
                    <strong style={{ fontSize: "0.95rem" }}>{property.yearBuilt}</strong>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ padding: "10px", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", color: "var(--accent-primary)" }}>
                    <Car size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Parking</span>
                    <strong style={{ fontSize: "0.95rem" }}>{property.parking}</strong>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ padding: "10px", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", color: "var(--accent-primary)" }}>
                    <Compass size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Facing</span>
                    <strong style={{ fontSize: "0.95rem" }}>{property.facing}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.5 Indian Regulatory & Vastu Compliance Matrix */}
            <div
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-lg)",
                padding: "24px",
                marginBottom: "32px",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <ShieldCheck size={22} color="var(--accent-emerald)" />
                  <h3 style={{ fontSize: "1.25rem", margin: 0 }}>RERA & Vastu Shastra Compliance</h3>
                </div>
                {property.reraId && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 14px",
                      borderRadius: "var(--radius-full)",
                      background: "var(--accent-emerald-light)",
                      color: "var(--accent-emerald)",
                      fontWeight: 800,
                      fontSize: "0.82rem"
                    }}
                  >
                    <CheckCircle2 size={15} />
                    Verified RERA: {property.reraId}
                  </span>
                )}
              </div>

              {/* Vastu & Area Breakdown Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "14px",
                  marginBottom: "20px"
                }}
              >
                <div style={{ padding: "14px", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
                    🧭 Vastu Orientation
                  </span>
                  <strong style={{ fontSize: "0.95rem", color: "var(--accent-primary)" }}>{property.vastuStatus || "100% Vastu Compliant"}</strong>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "4px", margin: 0 }}>
                    {property.vastuDetails?.entrance || `Facing: ${property.facing}`}
                  </p>
                </div>

                <div style={{ padding: "14px", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
                    📐 Carpet vs Super Area
                  </span>
                  <strong style={{ fontSize: "0.95rem" }}>{property.carpetArea || `${property.area} sq.ft`}</strong>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "4px", margin: 0 }}>
                    Super Built-up: {property.area} sq.ft
                  </p>
                </div>

                <div style={{ padding: "14px", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
                    🛕 Dedicated Pooja Mandir
                  </span>
                  <strong style={{ fontSize: "0.95rem" }}>{property.poojaRoom ? "Yes, Included" : "N/A"}</strong>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "4px", margin: 0 }}>
                    {property.poojaRoom || "Provision for mandir in layout"}
                  </p>
                </div>

                <div style={{ padding: "14px", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, display: "block" }}>
                    🛌 Domestic Servant Quarters
                  </span>
                  <strong style={{ fontSize: "0.95rem" }}>{property.servantQuarters ? "Dedicated / Attached" : "Common"}</strong>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "4px", margin: 0 }}>
                    {property.servantQuarters || "Township domestic staff facility"}
                  </p>
                </div>
              </div>

              {/* Title & Bank Loan Pre-approvals */}
              <div
                style={{
                  padding: "14px 16px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--bg-primary)",
                  border: "1px dashed var(--border-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px"
                }}
              >
                <div>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 700, display: "block" }}>
                    🏛️ Legal Title & Authority Clearance
                  </span>
                  <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    {property.approvals || "Freehold Title Registry • Verified Clear Mutation"}
                  </span>
                </div>

                {property.bankApprovals && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>Pre-Approved:</span>
                    {property.bankApprovals.map((bank, bIdx) => (
                      <span
                        key={bIdx}
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "4px",
                          background: "var(--bg-surface)",
                          border: "1px solid var(--border-light)",
                          color: "var(--text-secondary)"
                        }}
                      >
                        {bank}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 2. Description */}
            <div
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-lg)",
                padding: "28px",
                marginBottom: "32px",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <h3 style={{ fontSize: "1.3rem", marginBottom: "14px" }}>About This Property</h3>
              <p style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "var(--text-secondary)", marginBottom: "20px" }}>
                {property.description}
              </p>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.7", color: "var(--text-secondary)" }}>
                Strategically positioned in {property.location} with immediate access to prime arterial roads, reputed international schools, modern multi-specialty hospitals, and vibrant retail centers. 100% legal title guaranteed.
              </p>
            </div>

            {/* 3. Amenities Checklist */}
            <div
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-lg)",
                padding: "28px",
                marginBottom: "32px",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <h3 style={{ fontSize: "1.3rem", marginBottom: "18px" }}>Features & Amenities</h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "14px"
                }}
              >
                {property.amenities.map((amenity, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "var(--accent-emerald-light)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent-emerald)"
                      }}
                    >
                      <CheckCircle2 size={15} />
                    </div>
                    <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. AI Interior Styler & Renovation Visualizer */}
            <div style={{ marginBottom: "32px" }}>
              <AiInteriorStyler property={property} />
            </div>

            {/* 4. Interactive Floor Plan */}
            <div style={{ marginBottom: "32px" }}>
              <FloorPlanViewer property={property} />
            </div>

            {/* 5. Hyperlocal Connectivity & Neighborhood Radar */}
            <div style={{ marginBottom: "32px" }}>
              <NeighborhoodRadar city={property.city} />
            </div>

            {/* 6. Neighborhood Eco & Quality of Life Radar */}
            <div style={{ marginBottom: "32px" }}>
              <EcoQualityMeter property={property} />
            </div>

            {/* 7. Natural Sunlight & Shadow Simulator */}
            <div style={{ marginBottom: "32px" }}>
              <SunLightingSimulator property={property} />
            </div>

            {/* 7.5 AI Vastu & Energy Spatial Audit Radar */}
            <div style={{ marginBottom: "32px" }}>
              <VastuRadar property={property} />
            </div>

            {/* 8. Embedded EMI Calculator */}
            <div style={{ marginBottom: "32px" }}>
              <EmiCalculator initialPrice={property.price} />
            </div>

            {/* 9. Embedded Investment ROI & Rental Yield Calculator */}
            <div style={{ marginBottom: "32px" }}>
              <InvestmentCalculator propertyPrice={property.price} />
            </div>

            {/* 10. Home Buying Affordability & Pre-Approval Analyzer */}
            <div style={{ marginBottom: "32px" }}>
              <AffordabilityCalculator />
            </div>
          </div>

          {/* Right Column: Assigned Agent & Inquiry Form */}
          <div style={{ position: "sticky", top: "95px" }}>
            {/* Quick Inspection Slot Booking Button */}
            <button
              onClick={() => setShowSiteVisitModal(true)}
              className="btn btn-gold"
              style={{
                width: "100%",
                marginBottom: "12px",
                padding: "16px 20px",
                boxShadow: "var(--shadow-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                fontSize: "1rem"
              }}
            >
              <Calendar size={20} />
              <span>Book Site Visit / Video Tour</span>
            </button>

            {/* Direct AI Deal Desk Offer Button */}
            <button
              onClick={() => setShowDealDesk(true)}
              className="btn btn-outline"
              style={{
                width: "100%",
                marginBottom: "20px",
                padding: "14px 20px",
                borderColor: "var(--accent-gold)",
                background: "rgba(245, 158, 11, 0.08)",
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                fontSize: "0.95rem",
                fontWeight: 800
              }}
            >
              <Sparkles size={18} color="#d97706" />
              <span>Make Offer / AI Deal Desk</span>
            </button>
            {/* Agent Info Card */}
            <div
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-lg)",
                padding: "24px",
                marginBottom: "24px",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                Listing Advisor
              </span>

              <div style={{ display: "flex", alignItems: "center", gap: "14px", margin: "14px 0" }}>
                <img
                  src={agent.image}
                  alt={agent.name}
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid var(--accent-primary)"
                  }}
                />
                <div>
                  <h4 style={{ fontSize: "1.2rem", margin: 0 }}>{agent.name}</h4>
                  <span style={{ fontSize: "0.85rem", color: "var(--accent-primary)", fontWeight: 600 }}>{agent.role}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                    <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
                    <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>{agent.rating}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>({agent.dealsClosed})</span>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                <a
                  href={`tel:${agent.phone}`}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, gap: "6px" }}
                >
                  <Phone size={14} color="var(--accent-primary)" />
                  <span>Call Agent</span>
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, gap: "6px" }}
                >
                  <Mail size={14} color="var(--accent-primary)" />
                  <span>Email</span>
                </a>
              </div>

              {/* Direct Live Agent Messenger */}
              <LiveAgentChat agent={agent} property={property} />

              {/* Inquiry Form */}
              <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "18px" }}>
                <h4 style={{ fontSize: "1.05rem", marginBottom: "14px" }}>Schedule a Visit / Inquiry</h4>

                {inquirySubmitted ? (
                  <div
                    style={{
                      background: "var(--accent-emerald-light)",
                      border: "1px solid var(--accent-emerald)",
                      color: "var(--accent-emerald)",
                      padding: "16px",
                      borderRadius: "var(--radius-md)",
                      textAlign: "center"
                    }}
                  >
                    <CheckCircle2 size={24} style={{ margin: "0 auto 8px" }} />
                    <h5 style={{ margin: "0 0 4px", fontSize: "1rem" }}>Inquiry Submitted!</h5>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "inherit" }}>
                      Agent {agent.name} has received your request and will contact you at {inquiryPhone}.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div>
                      <input
                        type="text"
                        placeholder="Your Full Name *"
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--border-light)",
                          background: "var(--bg-secondary)",
                          color: "var(--text-primary)",
                          fontSize: "0.9rem",
                          outline: "none"
                        }}
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Your Email Address *"
                        required
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--border-light)",
                          background: "var(--bg-secondary)",
                          color: "var(--text-primary)",
                          fontSize: "0.9rem",
                          outline: "none"
                        }}
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        placeholder="Phone / WhatsApp Number *"
                        required
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--border-light)",
                          background: "var(--bg-secondary)",
                          color: "var(--text-primary)",
                          fontSize: "0.9rem",
                          outline: "none"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                        Preferred Site Visit Date
                      </label>
                      <input
                        type="date"
                        value={inquiryDate}
                        onChange={(e) => setInquiryDate(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--border-light)",
                          background: "var(--bg-secondary)",
                          color: "var(--text-primary)",
                          fontSize: "0.85rem",
                          outline: "none"
                        }}
                      />
                    </div>

                    <div>
                      <textarea
                        rows="3"
                        placeholder="Additional message or questions..."
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--border-light)",
                          background: "var(--bg-secondary)",
                          color: "var(--text-primary)",
                          fontSize: "0.9rem",
                          outline: "none",
                          resize: "vertical"
                        }}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                      <Send size={16} />
                      <span>Send Inquiry</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar / Recommended Properties */}
        {similarProperties.length > 0 && (
          <div style={{ marginTop: "70px", paddingTop: "40px", borderTop: "1px solid var(--border-light)" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "24px" }}>Similar Properties You Might Like</h2>
            <div className="properties-grid">
              {similarProperties.map((simProp) => (
                <PropertyCard key={simProp.id} property={simProp} />
              ))}
            </div>
          </div>
        )}

        {/* Site Visit & Video Tour Modal */}
        {showSiteVisitModal && (
          <SiteVisitModal
            property={property}
            agent={agent}
            onClose={() => setShowSiteVisitModal(false)}
          />
        )}

        {/* Official Luxury PDF Brochure / Investment Memorandum */}
        {showBrochureModal && (
          <PropertyBrochureModal
            property={property}
            agent={agent}
            onClose={() => setShowBrochureModal(false)}
          />
        )}

        {/* AI Deal Desk Negotiation & LOI Modal */}
        {showDealDesk && (
          <DealDeskModal
            property={property}
            onClose={() => setShowDealDesk(false)}
          />
        )}

        {/* 3D Spatial Walkthrough Studio Modal */}
        {showSpatialStudio && (
          <SpatialStudioModal
            property={property}
            onClose={() => setShowSpatialStudio(false)}
          />
        )}

        {/* AI RERA Legal Vault & Title Due Diligence */}
        {showLegalVault && (
          <LegalVaultModal
            property={property}
            onClose={() => setShowLegalVault(false)}
          />
        )}

        {/* Multi-Bank Mortgage Structuring Desk */}
        {showMortgageStudio && (
          <MortgageStudioModal
            property={property}
            onClose={() => setShowMortgageStudio(false)}
          />
        )}

        {/* Earnest Token Deposit & Escrow Engine */}
        {showEscrowModal && (
          <EscrowModal
            property={property}
            onClose={() => setShowEscrowModal(false)}
          />
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .details-content-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PropertyDetails;
