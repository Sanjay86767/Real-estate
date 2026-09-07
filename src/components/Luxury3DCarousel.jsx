import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles, MapPin, ShieldCheck, Eye, ArrowRight, Play, Pause } from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";
import { playClickSound } from "../utils/effects";

const LUXURY_SPOTLIGHTS = [
  {
    id: 18,
    title: "Worli Sea Face Coastal Sky Mansion",
    city: "Mumbai",
    state: "Maharashtra",
    priceFormatted: "₹18.50 Crore",
    bhk: "4 BHK Ultra Mansion",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    tag: "Arabian Sea Panoramic Deck",
    rera: "P51900028471 (MahaRERA)",
    rating: "4.99 ★"
  },
  {
    id: 19,
    title: "Raj Darbhanga Royal Heritage Kothi",
    city: "Darbhanga",
    state: "Bihar (Founder Sanjay Kumar Desk)",
    priceFormatted: "₹1.65 Crore",
    bhk: "4 BHK Royal Kothi",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85",
    tag: "Mithila Heritage Architecture",
    rera: "BRERA-DAR01-PR2024-SK",
    rating: "5.0 ★"
  },
  {
    id: 20,
    title: "Candolim Portuguese Heritage Beach Villa",
    city: "Goa Beachfront",
    state: "Goa",
    priceFormatted: "₹4.85 Crore",
    bhk: "4 BHK Private Pool Villa",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
    tag: "Direct Beach Access",
    rera: "PRGO08201452 (Goa RERA)",
    rating: "4.98 ★"
  },
  {
    id: 13,
    title: "The Sovereign Golf-View Penthouse Suite",
    city: "Gurugram",
    state: "Delhi NCR",
    priceFormatted: "₹3.20 Crore",
    bhk: "5 BHK Duplex Penthouse",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    tag: "DLF Golf Course Skyline",
    rera: "HRERA-PKL-GGM-1482",
    rating: "4.97 ★"
  },
  {
    id: 12,
    title: "The Silicon Oasis Eco Luxury Villa",
    city: "Bangalore",
    state: "Karnataka",
    priceFormatted: "₹2.40 Crore",
    bhk: "4 BHK Smart Villa",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    tag: "Solar Smart Biophilic Design",
    rera: "PRM/KA/RERA/1251/446",
    rating: "4.96 ★"
  }
];

export const Luxury3DCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef(null);

  const total = LUXURY_SPOTLIGHTS.length;

  const nextSlide = () => {
    playClickSound();
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    playClickSound();
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // 3D Auto-Rotation every 3.6 seconds
  useEffect(() => {
    if (!isAutoPlay) return;
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3600);
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlay, total]);

  const getSlidePosition = (idx) => {
    const diff = (idx - activeIndex + total) % total;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === 2) return "far-right";
    if (diff === total - 1) return "left";
    if (diff === total - 2) return "far-left";
    return "hidden";
  };

  const currentItem = LUXURY_SPOTLIGHTS[activeIndex];

  return (
    <section
      className="luxury-3d-showcase-section"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
      style={{
        padding: "70px 16px 85px",
        background: "radial-gradient(ellipse at center, #0f172a 0%, #080d1a 60%, #030712 100%)",
        position: "relative",
        overflow: "hidden",
        color: "#ffffff"
      }}
    >
      {/* Ambient Lighting Orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "550px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(217, 119, 6, 0.18) 0%, rgba(217, 119, 6, 0) 70%)",
          filter: "blur(60px)",
          pointerEvents: "none"
        }}
      ></div>

      <div className="container" style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              background: "rgba(217, 119, 6, 0.15)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              borderRadius: "30px",
              color: "#fbbf24",
              fontSize: "0.78rem",
              fontWeight: 800,
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "14px",
              boxShadow: "0 0 16px rgba(245, 158, 11, 0.25)"
            }}
          >
            <Sparkles size={14} color="#fbbf24" />
            <span>3D ROTATING LUXURY REEL</span>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px #10b981" }}></span>
          </div>

          <h2
            style={{
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              fontWeight: 900,
              lineHeight: 1.2,
              margin: "0 0 12px",
              letterSpacing: "-0.5px"
            }}
          >
            Signature <span style={{ background: "linear-gradient(135deg, #ffffff 0%, #fbbf24 50%, #d97706 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Royal Estates</span> in 3D Motion
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "0.95rem", maxWidth: "680px", margin: "0 auto", lineHeight: 1.6 }}>
            Rotate through curated trophy properties with 100% verified freehold titles and VIP private tour scheduling.
          </p>
        </div>

        {/* 3D Stage Container */}
        <div
          className="stage-3d-wrapper"
          style={{
            position: "relative",
            height: "440px",
            perspective: "1200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px 0"
          }}
        >
          {LUXURY_SPOTLIGHTS.map((item, idx) => {
            const pos = getSlidePosition(idx);
            const isCenter = pos === "center";

            let transform = "";
            let opacity = 0;
            let zIndex = 1;
            let filter = "brightness(0.6) blur(2px)";

            if (pos === "center") {
              transform = "translateX(0%) scale(1.06) rotateY(0deg)";
              opacity = 1;
              zIndex = 10;
              filter = "brightness(1) blur(0px)";
            } else if (pos === "right") {
              transform = "translateX(68%) scale(0.86) rotateY(-32deg)";
              opacity = 0.72;
              zIndex = 5;
              filter = "brightness(0.7) blur(1px)";
            } else if (pos === "left") {
              transform = "translateX(-68%) scale(0.86) rotateY(32deg)";
              opacity = 0.72;
              zIndex = 5;
              filter = "brightness(0.7) blur(1px)";
            } else if (pos === "far-right") {
              transform = "translateX(120%) scale(0.7) rotateY(-48deg)";
              opacity = 0.3;
              zIndex = 2;
            } else if (pos === "far-left") {
              transform = "translateX(-120%) scale(0.7) rotateY(48deg)";
              opacity = 0.3;
              zIndex = 2;
            } else {
              transform = "translateX(0%) scale(0.5) rotateY(0deg)";
              opacity = 0;
              zIndex = 0;
            }

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isCenter) {
                    playClickSound();
                    setActiveIndex(idx);
                  }
                }}
                className={`card-3d-slide ${isCenter ? "active" : ""}`}
                style={{
                  position: "absolute",
                  width: "clamp(290px, 45vw, 420px)",
                  height: "390px",
                  borderRadius: "22px",
                  background: "rgba(15, 23, 42, 0.92)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: isCenter ? "2px solid rgba(245, 158, 11, 0.85)" : "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: isCenter
                    ? "0 25px 60px rgba(0, 0, 0, 0.75), 0 0 35px rgba(217, 119, 6, 0.35)"
                    : "0 15px 35px rgba(0, 0, 0, 0.5)",
                  transform,
                  opacity,
                  zIndex,
                  filter,
                  transition: "all 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: isCenter ? "default" : "pointer",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                {/* Image Container with Dynamic Glass Ribbon */}
                <div style={{ position: "relative", height: "230px", overflow: "hidden" }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease"
                    }}
                  />

                  {/* Top Tag */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "rgba(15, 23, 42, 0.88)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(245, 158, 11, 0.5)",
                      color: "#fbbf24",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      padding: "4px 10px",
                      borderRadius: "20px"
                    }}
                  >
                    ✨ {item.tag}
                  </div>

                  {/* Price Ribbon */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      background: "linear-gradient(135deg, #d97706, #b45309)",
                      color: "#ffffff",
                      fontSize: "0.86rem",
                      fontWeight: 900,
                      padding: "4px 12px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 14px rgba(0, 0, 0, 0.4)"
                    }}
                  >
                    {item.priceFormatted}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "0.74rem", color: "#38bdf8", fontWeight: 800 }}>
                        {item.bhk}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "#fbbf24", fontWeight: 700 }}>
                        {item.rating}
                      </span>
                    </div>

                    <h3
                      style={{
                        margin: "0 0 6px",
                        fontSize: "1.05rem",
                        fontWeight: 800,
                        color: "#ffffff",
                        lineHeight: 1.3,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {item.title}
                    </h3>

                    <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#94a3b8", fontSize: "0.78rem" }}>
                      <MapPin size={13} color="#d97706" />
                      <span>{item.city}, {item.state}</span>
                    </div>
                  </div>

                  {/* Bottom Action (Active on Center) */}
                  <div style={{ marginTop: "12px", display: "flex", gap: "8px", alignItems: "center" }}>
                    <Link
                      to={`/property/${item.id}`}
                      className="btn btn-gold"
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        fontSize: "0.82rem",
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        borderRadius: "10px",
                        textDecoration: "none"
                      }}
                    >
                      <Eye size={14} />
                      <span>Explore Villa</span>
                    </Link>

                    <a
                      href={`https://wa.me/918809604880?text=Hi%20Sanjay,%20I%20am%20interested%20in%20inspecting%20${encodeURIComponent(item.title)}%20(${item.priceFormatted}).`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary"
                      style={{
                        padding: "8px 12px",
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        borderRadius: "10px",
                        textDecoration: "none",
                        color: "#10b981",
                        borderColor: "rgba(16, 185, 129, 0.4)",
                        background: "rgba(16, 185, 129, 0.1)"
                      }}
                    >
                      <span>VIP Inspection</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3D Navigation Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "18px", marginTop: "18px" }}>
          <button
            type="button"
            onClick={prevSlide}
            className="btn-icon"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(15, 23, 42, 0.9)",
              border: "1.5px solid rgba(245, 158, 11, 0.5)",
              color: "#fbbf24",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(0,0,0,0.3)"
            }}
            title="Previous Luxury Estate"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Dots Indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {LUXURY_SPOTLIGHTS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => {
                  playClickSound();
                  setActiveIndex(dotIdx);
                }}
                style={{
                  width: activeIndex === dotIdx ? "26px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: activeIndex === dotIdx ? "linear-gradient(135deg, #d97706, #fbbf24)" : "rgba(255, 255, 255, 0.25)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                title={`Slide ${dotIdx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            className="btn-icon"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(15, 23, 42, 0.9)",
              border: "1.5px solid rgba(245, 158, 11, 0.5)",
              color: "#fbbf24",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(0,0,0,0.3)"
            }}
            title="Next Luxury Estate"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Luxury3DCarousel;
