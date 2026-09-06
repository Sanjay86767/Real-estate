import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
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
  Sparkles
} from "lucide-react";

export const PropertyDetails = () => {
  const { id } = useParams();
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

  const property = properties.find((p) => p.id === Number(id));

  // Gallery active image index & Modals state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showSiteVisitModal, setShowSiteVisitModal] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);

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

  // Assigned Agent
  const agent = agents.find((a) => a.id === property.agentId) || agents[0];

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
              onClick={handleShare}
              className="btn btn-secondary btn-sm"
              style={{ gap: "6px" }}
              title="Share property link"
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

        {/* Photo Gallery: Main View + Thumbnails */}
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              position: "relative",
              height: "500px",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              boxShadow: "var(--shadow-md)",
              marginBottom: "16px"
            }}
          >
            <img
              src={property.images[activeImageIndex] || property.images[0]}
              alt={`${property.title} - View ${activeImageIndex + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            {/* 360 Tour Launcher Badge */}
            <button
              onClick={() => setShowVirtualTour(true)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "rgba(15, 23, 42, 0.85)",
                backdropFilter: "blur(8px)",
                color: "#ffffff",
                padding: "8px 16px",
                borderRadius: "var(--radius-full)",
                fontSize: "0.85rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                cursor: "pointer"
              }}
            >
              <Compass size={16} color="#60a5fa" />
              <span>360° Virtual Walkthrough</span>
            </button>

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

        {/* 360 Virtual Tour Modal */}
        {showVirtualTour && (
          <VirtualTourModal property={property} onClose={() => setShowVirtualTour(false)} />
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
                marginBottom: "20px",
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
