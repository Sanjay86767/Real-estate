import React, { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Eye, Sparkles, MapPin, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { Link } from "react-router-dom";
import { playClickSound, playSuccessSound } from "../utils/effects";
import { usePropertyContext } from "../context/PropertyContext";

const STORIES_DATA = [
  {
    id: 1,
    title: "Golf Penthouses",
    location: "Sector 8, Chandigarh",
    tag: "Celebrity Collection",
    avatar: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    propertyId: 1,
    price: "₹8.75 Cr",
    highlights: ["Private Heated Infinity Pool", "360° Shivalik Hill Panoramas", "Direct Keycard Elevator Access"],
    quote: "The pinnacle of Northern India luxury living."
  },
  {
    id: 2,
    title: "Waterfront Mansions",
    location: "Sukhna Enclave",
    tag: "Ultra Luxury",
    avatar: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    propertyId: 2,
    price: "₹14.50 Cr",
    highlights: ["6-Car Subterranean Vault", "German Miele Smart Kitchen", "Italian Statuario Marble Flooring"],
    quote: "Designed by AD100 award-winning architects."
  },
  {
    id: 3,
    title: "Aerocity Smart Towers",
    location: "Aerocity, Mohali",
    tag: "High ROI 7.2%",
    avatar: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    propertyId: 3,
    price: "₹2.85 Cr",
    highlights: ["5 Mins to International Airport", "Pre-Certified Gold IGBC Green", "Triple-Tier AI Security"],
    quote: "The fastest appreciating commercial corridor."
  },
  {
    id: 4,
    title: "Golf Course Ext. Villas",
    location: "Gurugram, NCR",
    tag: "Prime NCR",
    avatar: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    propertyId: 4,
    price: "₹18.20 Cr",
    highlights: ["Championship 18-Hole Views", "Double Height 24ft Ceilings", "Smart Home Crestron Automation"],
    quote: "Where India's elite corporate titans reside."
  },
  {
    id: 5,
    title: "Silicon Tech Sanctuaries",
    location: "Whitefield, Bangalore",
    tag: "Tech Elite",
    avatar: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80",
    propertyId: 5,
    price: "₹5.40 Cr",
    highlights: ["EV Charging at Every Bay", "100-Year Old Banyan Canopy", "Dedicated Co-Working Sky Club"],
    quote: "Zero commute to Fortune 500 tech parks."
  }
];

export const PropertyStoriesBar = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const { formatPrice } = usePropertyContext();

  const isModalOpen = activeStoryIndex !== null;
  const currentStory = isModalOpen ? STORIES_DATA[activeStoryIndex] : null;

  // Auto-advance story timer
  useEffect(() => {
    if (!isModalOpen) return;

    setProgress(0);
    const stepDuration = 50; // ms
    const totalDuration = 6000; // 6s per story
    const increment = (stepDuration / totalDuration) * 100;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Advance to next story or close
          if (activeStoryIndex < STORIES_DATA.length - 1) {
            setActiveStoryIndex((idx) => idx + 1);
            return 0;
          } else {
            setActiveStoryIndex(null);
            return 0;
          }
        }
        return prev + increment;
      });
    }, stepDuration);

    return () => clearInterval(timerRef.current);
  }, [activeStoryIndex, isModalOpen]);

  const handleOpenStory = (index) => {
    playClickSound();
    setActiveStoryIndex(index);
    setProgress(0);
  };

  const handleNext = () => {
    playClickSound();
    if (activeStoryIndex < STORIES_DATA.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
      setProgress(0);
    } else {
      setActiveStoryIndex(null);
    }
  };

  const handlePrev = () => {
    playClickSound();
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      setProgress(0);
    }
  };

  return (
    <div className="property-stories-bar-section">
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span className="live-dot-pulse"></span>
            <span style={{ fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.06em", color: "var(--text-secondary)", textTransform: "uppercase" }}>
              Curated Luxury Stories & VIP Tours
            </span>
          </div>
          <span style={{ fontSize: "0.78rem", color: "var(--accent-primary)", fontWeight: 700 }}>
            Tap to Watch Reels
          </span>
        </div>

        {/* Stories Horizontal Tray */}
        <div className="stories-scroll-tray">
          {STORIES_DATA.map((story, idx) => (
            <div
              key={story.id}
              className="story-avatar-item"
              onClick={() => handleOpenStory(idx)}
            >
              <div className="story-ring-gradient">
                <img src={story.avatar} alt={story.title} className="story-thumb" />
              </div>
              <span className="story-title-label">{story.title}</span>
              <span className="story-badge-label">{story.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Luxury Story Reel Modal */}
      {isModalOpen && currentStory && (
        <div className="modal-backdrop story-modal-backdrop" onClick={() => setActiveStoryIndex(null)}>
          <div
            className="story-reel-card"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundImage: `url(${currentStory.image})` }}
          >
            {/* Story Top Progress Bars */}
            <div className="story-progress-bar-container">
              {STORIES_DATA.map((_, sIdx) => {
                let fillWidth = "0%";
                if (sIdx < activeStoryIndex) fillWidth = "100%";
                else if (sIdx === activeStoryIndex) fillWidth = `${progress}%`;

                return (
                  <div key={sIdx} className="story-progress-track">
                    <div className="story-progress-fill" style={{ width: fillWidth }} />
                  </div>
                );
              })}
            </div>

            {/* Story Header */}
            <div className="story-reel-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <img src={currentStory.avatar} alt={currentStory.title} className="story-header-avatar" />
                <div>
                  <h4 style={{ margin: 0, fontSize: "0.95rem", color: "#ffffff", fontWeight: 700 }}>
                    {currentStory.title}
                  </h4>
                  <span style={{ fontSize: "0.75rem", color: "#e2e8f0" }}>
                    {currentStory.location}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={() => setActiveStoryIndex(null)}
                  className="btn-icon"
                  style={{ background: "rgba(0,0,0,0.5)", color: "#ffffff", width: "34px", height: "34px" }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Navigation Click Zones (Left / Right) */}
            <div className="story-nav-zone left" onClick={handlePrev} />
            <div className="story-nav-zone right" onClick={handleNext} />

            {/* Nav Arrows */}
            {activeStoryIndex > 0 && (
              <button onClick={handlePrev} className="story-arrow-btn left" aria-label="Previous story">
                <ChevronLeft size={22} />
              </button>
            )}
            <button onClick={handleNext} className="story-arrow-btn right" aria-label="Next story">
              <ChevronRight size={22} />
            </button>

            {/* Story Bottom Content Overlay */}
            <div className="story-reel-footer">
              <div className="story-tag-pill">{currentStory.tag}</div>
              <h2 style={{ fontSize: "1.8rem", margin: "6px 0", color: "#ffffff", fontWeight: 800 }}>
                {currentStory.price}
              </h2>
              <p style={{ fontStyle: "italic", fontSize: "0.9rem", color: "#cbd5e1", marginBottom: "12px" }}>
                "{currentStory.quote}"
              </p>

              {/* Key Highlights */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
                {currentStory.highlights.map((h, hIdx) => (
                  <span key={hIdx} className="story-spec-chip">
                    ✨ {h}
                  </span>
                ))}
              </div>

              {/* Action CTA */}
              <Link
                to={`/property/${currentStory.propertyId}`}
                onClick={() => {
                  playSuccessSound();
                  setActiveStoryIndex(null);
                }}
                className="btn btn-gold"
                style={{ width: "100%", justifyContent: "center", padding: "14px", fontWeight: 700 }}
              >
                <span>Explore Full Property Showcase</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyStoriesBar;
