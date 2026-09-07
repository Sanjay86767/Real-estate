import React, { useState } from "react";
import {
  Crown,
  Sparkles,
  ShieldCheck,
  Phone,
  MessageSquare,
  Compass,
  FileText,
  MapPin,
  Calendar,
  CheckCircle2,
  Download,
  Sun,
  Moon,
  Home,
  Layers,
  Trees,
  Car,
  Flame,
  Award,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import sanjayPhoto from "../assets/sanjay-kumar.jpg";
import { playClickSound } from "../utils/effects";

export const RoyalHeritageKothiShowcase = ({ property, onOpenBrochures, onBookVisit }) => {
  const [activeTab, setActiveTab] = useState("ground");
  const [ambianceMode, setAmbianceMode] = useState("day"); // 'day' | 'night'
  const [copiedNotification, setCopiedNotification] = useState(false);

  const isNight = ambianceMode === "night";

  // Royal architectural pillars
  const heritagePillars = [
    {
      icon: "🏰",
      title: "12-Ft Vaulted Heritage Ceilings",
      desc: "Colonial-era high volume architecture with exposed Burma teak rafters, acoustic dampening, and Belgian crystal chandelier mounts.",
      tag: "Imperial Volume"
    },
    {
      icon: "🌳",
      title: "Centuries-Old Royal Mango Orchards",
      desc: "Private grove of heirloom Malda & Langra mango trees providing sweet fragrance, natural shade, and private garden pavilions.",
      tag: "2.5-Acre Heritage Parcel"
    },
    {
      icon: "🛕",
      title: "Purva Mukhi (East) Vastu Portal",
      desc: "East-facing grand gateway with sculpted auspicious Toran and brass-studded solid teak doors aligned to capture the divine dawn sunlight.",
      tag: "100% Vastu Sanctum"
    },
    {
      icon: "🕉️",
      title: "Makrana White Marble Mandir",
      desc: "Independent consecrated prayer sanctorum crafted in pure Rajasthan Makrana marble with carved Shikhar arch and Aarti bell mounts.",
      tag: "Dedicated Pooja Sanctum"
    },
    {
      icon: "☀️",
      title: "Brahmasthan Open-to-Sky Aangan",
      desc: "Classical central courtyard bringing vertical zenith daylight into every salon while circulating continuous natural Mithila breeze.",
      tag: "Microclimate Cooling"
    },
    {
      icon: "🛡️",
      title: "100% Clear BUDA & Mutation Title",
      desc: "Direct lineage freehold title with completed Jamabandi, Khatiyan and 7/12 mutation records verified by Founder Sanjay Kumar personally.",
      tag: "Zero Legal Encumbrance"
    }
  ];

  // Floor plan details
  const floorPlans = {
    ground: {
      title: "Ground Floor: Diwan-e-Khas & Royal Courtyards",
      area: "2,050 sq.ft covered + 1,400 sq.ft aangan",
      rooms: [
        { name: "Grand Entrance Portico & Foyer", size: "22' x 14'", desc: "Porte-cochère carriage drop-off with carved Italian marble threshold." },
        { name: "Diwan-e-Khas (Formal State Salon)", size: "26' x 18'", desc: "Vaulted 12-ft ceiling, imported chandelier mounts, teakwood paneling." },
        { name: "Makrana Marble Mandir Room", size: "12' x 10'", desc: "North-East Ishanya sanctuary with carved marble Shikhar." },
        { name: "Agneya Modern Kitchen & Store", size: "16' x 12'", desc: "South-East aligned gourmet kitchen with dual chimneys and granite island." },
        { name: "Royal Guest Bedroom Suite 1", size: "18' x 14'", desc: "En-suite marble bath with walk-in dressing wardrobe and courtyard vista." },
        { name: "Staff / Chauffeur Quarters", size: "12' x 10'", desc: "Independent entrance with attached bath and service yard access." }
      ]
    },
    first: {
      title: "First Floor: Imperial Master Sanctorum & Terraces",
      area: "1,550 sq.ft covered + 850 sq.ft view terrace",
      rooms: [
        { name: "Imperial Master Suite (South-West)", size: "24' x 18'", desc: "Regal suite with private study, walk-in vanity dressing, and Raj Campus vista." },
        { name: "Royal Bedroom Suite 3", size: "18' x 14'", desc: "Attached marble bath and direct access to East-facing sunrise terrace." },
        { name: "Royal Bedroom Suite 4", size: "16' x 14'", desc: "Attached bath, built-in teak cabinetry, and garden view." },
        { name: "Family Library & Heritage Lounge", size: "16' x 12'", desc: "Cozy reading nook overlooking the central Brahmasthan open courtyard." },
        { name: "Sky Pavilion / Chaat Terrace", size: "32' x 20'", desc: "Panoramic elevated terrace overlooking historic Raj Darbhanga Campus." }
      ]
    },
    orchard: {
      title: "Estate Grounds: Heritage Orchards & Carriage Ways",
      area: "3,600 sq.ft private gated compound",
      rooms: [
        { name: "Private Mango & Litchi Orchard", size: "Estate Grounds", desc: "Heirloom Malda mango and Shahi Litchi fruit-bearing trees." },
        { name: "Covered 3-Car Carriage Portico", size: "30' x 18'", desc: "Sheltered parking for 3 luxury SUVs plus space for 4 additional vehicles." },
        { name: "Perimeter Security Post", size: "8' x 8'", desc: "24/7 guard booth with automated perimeter CCTV and floodlights." },
        { name: "Rainwater Harvesting & Deep Borewell", size: "Utility Zone", desc: "Independent potable water reserve with high-efficiency multi-stage filtration." }
      ]
    }
  };

  const currentPlan = floorPlans[activeTab] || floorPlans.ground;

  return (
    <section
      className="royal-heritage-kothi-showcase"
      style={{
        margin: "36px 0",
        padding: "36px 30px",
        background: isNight
          ? "linear-gradient(145deg, #090d16 0%, #111827 50%, #0b1120 100%)"
          : "linear-gradient(145deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.96) 100%)",
        border: "2px solid #d4af37",
        borderRadius: "var(--radius-xl)",
        boxShadow: isNight
          ? "0 25px 70px rgba(0, 0, 0, 0.8), 0 0 50px rgba(212, 175, 55, 0.25)"
          : "0 25px 60px rgba(0, 0, 0, 0.5), 0 0 35px rgba(212, 175, 55, 0.15)",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.4s ease"
      }}
    >
      {/* Background Decorative Gold Watermark */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none"
        }}
      />

      {/* Top Header: Royal Seal + Ambiance Switcher */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          paddingBottom: "24px",
          borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
          marginBottom: "28px"
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              background: "linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(245, 158, 11, 0.15))",
              border: "1px solid #fbbf24",
              marginBottom: "10px"
            }}
          >
            <Crown size={18} color="#fbbf24" />
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 900,
                color: "#fbbf24",
                letterSpacing: "1.2px",
                textTransform: "uppercase"
              }}
            >
              Mithila Royal Heritage Portfolio • Circa 1924
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 900,
              margin: "4px 0 8px",
              background: "linear-gradient(135deg, #ffffff 40%, #fbbf24 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2
            }}
          >
            Raj Darbhanga Royal Heritage Kothi & Villa
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "#cbd5e1", fontSize: "0.88rem" }}>
              <MapPin size={15} color="#fbbf24" />
              VIP Road, Near Raj Campus, Laheriasarai, Darbhanga, Bihar
            </span>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
            <span style={{ color: "#10b981", fontWeight: 800, fontSize: "0.88rem", display: "inline-flex", alignItems: "center", gap: "5px" }}>
              <ShieldCheck size={16} />
              RERA ID: BRERA-DAR01-PR2024-SK
            </span>
          </div>
        </div>

        {/* Ambiance Toggle: Daytime Sunlit vs Royal Candlelit */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 700 }}>Courtyard Ambiance:</span>
          <div
            style={{
              display: "flex",
              background: "rgba(0,0,0,0.4)",
              padding: "4px",
              borderRadius: "var(--radius-full)",
              border: "1px solid rgba(212, 175, 55, 0.4)"
            }}
          >
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setAmbianceMode("day");
              }}
              style={{
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                border: "none",
                background: !isNight ? "linear-gradient(135deg, #d4af37, #f59e0b)" : "transparent",
                color: !isNight ? "#0f172a" : "#cbd5e1",
                fontSize: "0.78rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer"
              }}
            >
              <Sun size={14} />
              <span>Daylight</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setAmbianceMode("night");
              }}
              style={{
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                border: "none",
                background: isNight ? "linear-gradient(135deg, #6366f1, #3b82f6)" : "transparent",
                color: "#ffffff",
                fontSize: "0.78rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer"
              }}
            >
              <Moon size={14} />
              <span>Royal Diya Night</span>
            </button>
          </div>
        </div>
      </div>

      {/* Royal Highlights Strip: Price, Area, Vastu, Maintenance */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "14px",
          marginBottom: "32px"
        }}
      >
        <div
          style={{
            padding: "16px 18px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(212, 175, 55, 0.25)"
          }}
        >
          <span style={{ fontSize: "0.74rem", textTransform: "uppercase", color: "#fbbf24", fontWeight: 800 }}>
            Royal Offering Price
          </span>
          <div style={{ fontSize: "1.85rem", fontWeight: 900, color: "#ffffff", margin: "4px 0" }}>
            ₹1.65 Crore
          </div>
          <span style={{ fontSize: "0.78rem", color: "#10b981", fontWeight: 700 }}>
            100% Clear Freehold Land Title
          </span>
        </div>

        <div
          style={{
            padding: "16px 18px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(255, 255, 255, 0.12)"
          }}
        >
          <span style={{ fontSize: "0.74rem", textTransform: "uppercase", color: "#94a3b8", fontWeight: 700 }}>
            Total Built & Carpet Area
          </span>
          <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#ffffff", margin: "4px 0" }}>
            3,600 sq.ft G+1
          </div>
          <span style={{ fontSize: "0.78rem", color: "#cbd5e1" }}>
            3,100 sq.ft Clear Carpet
          </span>
        </div>

        <div
          style={{
            padding: "16px 18px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(255, 255, 255, 0.12)"
          }}
        >
          <span style={{ fontSize: "0.74rem", textTransform: "uppercase", color: "#94a3b8", fontWeight: 700 }}>
            Vastu Orientation
          </span>
          <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#ffffff", margin: "4px 0" }}>
            Purva-Mukhi (East)
          </div>
          <span style={{ fontSize: "0.78rem", color: "#fbbf24", fontWeight: 700 }}>
            Sun-Aligned Toran Gate
          </span>
        </div>

        <div
          style={{
            padding: "16px 18px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(255, 255, 255, 0.12)"
          }}
        >
          <span style={{ fontSize: "0.74rem", textTransform: "uppercase", color: "#94a3b8", fontWeight: 700 }}>
            Darbhanga VIP Appreciation
          </span>
          <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#10b981", margin: "4px 0" }}>
            +22.4% YoY
          </div>
          <span style={{ fontSize: "0.78rem", color: "#cbd5e1" }}>
            Leading Bihar Capital Growth
          </span>
        </div>
      </div>

      {/* 6 Architectural Pillars of Raj Darbhanga Kothi */}
      <div style={{ marginBottom: "36px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <Sparkles size={20} color="#fbbf24" />
          <h3 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 800, color: "#ffffff" }}>
            6 Signature Royal Heritage Features
          </h3>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
            gap: "16px"
          }}
        >
          {heritagePillars.map((p, idx) => (
            <div
              key={idx}
              style={{
                padding: "20px 18px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(212, 175, 55, 0.25)",
                borderRadius: "var(--radius-lg)",
                transition: "all 0.25s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "#fbbf24";
                e.currentTarget.style.background = "rgba(212, 175, 55, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(212, 175, 55, 0.25)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <span style={{ fontSize: "2rem" }}>{p.icon}</span>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      color: "#fbbf24",
                      background: "rgba(212, 175, 55, 0.15)",
                      padding: "3px 8px",
                      borderRadius: "6px"
                    }}
                  >
                    {p.tag}
                  </span>
                </div>
                <h4 style={{ fontSize: "1rem", fontWeight: 800, color: "#ffffff", marginBottom: "6px" }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: "0.82rem", color: "#cbd5e1", lineHeight: 1.5, margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Architectural Floorplan & Room Tour */}
      <div
        style={{
          padding: "24px",
          background: "rgba(0, 0, 0, 0.35)",
          border: "1px solid rgba(212, 175, 55, 0.3)",
          borderRadius: "var(--radius-xl)",
          marginBottom: "36px"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "14px",
            marginBottom: "20px"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Layers size={20} color="#fbbf24" />
              <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800, color: "#ffffff" }}>
                Interactive Architectural Blueprint
              </h3>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: "0.84rem", color: "#94a3b8" }}>
              Detailed CAD space layout of G+1 Sovereign Kothi & Private Grounds
            </p>
          </div>

          {/* Level Switcher Tabs */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              { id: "ground", label: "Ground Floor (Diwan-e-Khas)" },
              { id: "first", label: "First Floor (Imperial Sanctorum)" },
              { id: "orchard", label: "Estate Grounds & Orchards" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  playClickSound();
                  setActiveTab(tab.id);
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "var(--radius-full)",
                  background: activeTab === tab.id ? "linear-gradient(135deg, #d4af37, #f59e0b)" : "rgba(255, 255, 255, 0.08)",
                  border: activeTab === tab.id ? "1px solid #fbbf24" : "1px solid rgba(255, 255, 255, 0.15)",
                  color: activeTab === tab.id ? "#0f172a" : "#cbd5e1",
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Plan Details */}
        <div style={{ marginBottom: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
            <h4 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800, color: "#fbbf24" }}>
              {currentPlan.title}
            </h4>
            <span style={{ fontSize: "0.82rem", color: "#94a3b8", fontWeight: 700 }}>
              Covered Area: <strong>{currentPlan.area}</strong>
            </span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "12px"
          }}
        >
          {currentPlan.rooms.map((room, i) => (
            <div
              key={i}
              style={{
                padding: "14px 16px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                flexDirection: "column",
                gap: "4px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ fontSize: "0.9rem", color: "#ffffff" }}>{room.name}</strong>
                <span style={{ fontSize: "0.76rem", color: "#fbbf24", fontWeight: 800, fontFamily: "monospace" }}>
                  {room.size}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.4 }}>
                {room.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Founder Sanjay Kumar VIP Advisory & Direct Consultation Banner */}
      <div
        style={{
          padding: "28px 24px",
          background: "linear-gradient(135deg, rgba(217, 119, 6, 0.18), rgba(15, 23, 42, 0.95))",
          border: "1px solid rgba(217, 119, 6, 0.6)",
          borderRadius: "var(--radius-xl)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <img
              src={sanjayPhoto}
              alt="Sanjay Kumar - Founder"
              style={{
                width: "74px",
                height: "74px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #d97706",
                boxShadow: "0 0 20px rgba(217, 119, 6, 0.6)"
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: "2px",
                right: "2px",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "#10b981",
                border: "3px solid #0f172a"
              }}
              title="Founder Online Active"
            />
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <h4 style={{ margin: 0, fontSize: "1.25rem", color: "#ffffff", fontWeight: 800 }}>
                Founder Advisory Desk: Sanjay Kumar
              </h4>
              <ShieldCheck size={18} color="#10b981" />
            </div>
            <span style={{ fontSize: "0.78rem", color: "#fbbf24", fontWeight: 800, display: "block", marginBottom: "4px" }}>
              Principal Heritage Consultant • Darbhanga, Bihar
            </span>
            <p style={{ margin: 0, fontSize: "0.84rem", color: "#cbd5e1", maxWidth: "600px", lineHeight: 1.45 }}>
              "I have personally surveyed every pillar, khatiyan title entry, and legal registry for Raj Darbhanga Kothi. Backed by 100% clear BUDA clearance and bank loan approvals."
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <a
            href="tel:+918809604880"
            style={{
              padding: "12px 20px",
              borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, #d97706, #b45309)",
              color: "#ffffff",
              fontSize: "0.85rem",
              fontWeight: 800,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 15px rgba(217, 119, 6, 0.4)"
            }}
          >
            <Phone size={16} />
            <span>Call +91 8809604880</span>
          </a>

          <a
            href="https://wa.me/918809604880?text=Hello%20Sanjay%20ji,%20I%20am%20interested%20in%20inspecting%20the%20Raj%20Darbhanga%20Royal%20Heritage%20Kothi%20(₹1.65%20Cr).%20Please%20share%20all%20registry%20documents%20and%20arrange%20a%20VIP%20visit."
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "12px 20px",
              borderRadius: "var(--radius-md)",
              background: "#25D366",
              color: "#ffffff",
              fontSize: "0.85rem",
              fontWeight: 800,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 15px rgba(37, 211, 102, 0.4)"
            }}
          >
            <MessageSquare size={16} />
            <span>WhatsApp Founder</span>
          </a>
        </div>
      </div>

      {/* Complimentary Darbhanga Airport VIP Transfer Note */}
      <div
        style={{
          marginTop: "20px",
          padding: "14px 18px",
          background: "rgba(212, 175, 55, 0.08)",
          borderRadius: "var(--radius-md)",
          border: "1px dashed rgba(212, 175, 55, 0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Car size={20} color="#fbbf24" />
          <span style={{ fontSize: "0.82rem", color: "#cbd5e1" }}>
            <strong>Complimentary VIP Airport Chauffeur:</strong> Flying into <strong>Darbhanga Airport (DBR)</strong> or <strong>Patna Airport</strong>? EstateHub arranges private limousine pickup directly to Raj Campus Kothi for serious buyers.
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            if (onBookVisit) onBookVisit();
            else {
              window.open("https://wa.me/918809604880?text=Hello%20Sanjay%20ji,%20please%20schedule%20a%20VIP%20Airport%20Pickup%20and%20Inspection%20for%20Raj%20Darbhanga%20Royal%20Heritage%20Kothi.", "_blank");
            }
          }}
          style={{
            padding: "6px 14px",
            borderRadius: "var(--radius-full)",
            background: "rgba(212, 175, 55, 0.2)",
            border: "1px solid #fbbf24",
            color: "#fbbf24",
            fontSize: "0.78rem",
            fontWeight: 800,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px"
          }}
        >
          <span>Schedule VIP Pick-up</span>
          <ChevronRight size={13} />
        </button>
      </div>
    </section>
  );
};

export default RoyalHeritageKothiShowcase;
