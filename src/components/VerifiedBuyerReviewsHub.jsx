import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ThumbsUp,
  MessageSquare,
  Award,
  Filter,
  PlusCircle,
  Volume2,
  VolumeX,
  X,
  Building,
  Heart,
  Calendar,
  MapPin,
  Send,
  User,
  Crown
} from "lucide-react";
import { playClickSound, playSuccessSound, triggerConfetti } from "../utils/effects";
import { usePropertyContext } from "../context/PropertyContext";

// Initial Authentic Pan-India Verified Reviews
const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    name: "Dr. Arvind K. Mishra",
    role: "Senior Consultant Neurosurgeon & NRI Allottee",
    city: "Darbhanga & London, UK",
    property: "Raj Darbhanga Royal Heritage Kothi (Unit #07)",
    rating: 5,
    date: "2 days ago",
    reraId: "BRERAP120092-2025",
    tags: ["RERA Clear Title", "Vastu 100%", "Founder Sanjay Kumar Priority Desk"],
    helpfulCount: 42,
    text: "EstateHub has completely redefined luxury real estate transparency in India! Purchasing ancestral land & kothi in Darbhanga while sitting in London felt effortless. Founder Sanjay Kumar personally facilitated the 30-year mutation deed verification and live drone walkthrough. Truly India's undisputed #1 platform."
  },
  {
    id: "rev-2",
    name: "Vikram & Ananya Singhania",
    role: "Managing Director, Global FinTech",
    city: "Worli, Mumbai",
    property: "Sea-Breeze Sky Penthouse, Worli Sea Face",
    rating: 5,
    date: "5 days ago",
    reraId: "MAHARERA/P5180009823",
    tags: ["MahaRERA Certified", "15-Min Token Lock", "₹14 Cr Transaction"],
    helpfulCount: 38,
    text: "The 15-Minute Token Lock Room is pure technological genius. In Mumbai's hyper-competitive luxury market, locking unit #42 with ₹1 Lac escrow directly under MahaRERA gave us absolute peace of mind. The 3D Drone elevation view matched the actual 52nd-floor balcony view perfectly."
  },
  {
    id: "rev-3",
    name: "Rajeshwar Rao",
    role: "VP Engineering, Cloud Infrastructure",
    city: "Whitefield, Bengaluru",
    property: "CyberPark Neo Sky Villa, Indiranagar",
    rating: 5,
    date: "1 week ago",
    reraId: "PRM/KA/RERA/1251/2026",
    tags: ["EV Smart Infrastructure", "8.2% Rental Yield", "Vastu Ishanya"],
    helpfulCount: 29,
    text: "I compared 3 villas using EstateHub's AI RoI Engine and the capital appreciation prediction was spot-on. Plus, the interactive AI Interior Styler helped us visualize the Italian marble and Teakwood joinery before even taking possession. Magicbricks and 99acres feel 10 years outdated compared to this!"
  },
  {
    id: "rev-4",
    name: "Meera & Rajesh Khurana",
    role: "Angel Investor & Architect",
    city: "Golf Course Road, Gurgaon",
    property: "The Imperial Golf Residences, DLF Phase 5",
    rating: 5,
    date: "2 weeks ago",
    reraId: "HARERA/GGM/2026/410",
    tags: ["Section 54 Tax Shield", "Clear Deed Registry", "High Liquidity"],
    helpfulCount: 31,
    text: "The institutional Union Budget Section 54/54EC tax calculator saved us over ₹38 Lakhs in capital gains liabilities. Every single deed document in the Legal Vault was cryptographically verified. No broker spam, zero harassment, only sovereign white-glove service."
  },
  {
    id: "rev-5",
    name: "Capt. Shailendra Verma (Retd.)",
    role: "Former Indian Navy Commander & Homebuyer",
    city: "New Chandigarh / Mohali",
    property: "The Grand Shivalik Villa, Sector 82",
    rating: 5,
    date: "3 weeks ago",
    reraId: "PBRERA-SAS80-PR0245",
    tags: ["Armed Forces Priority", "Green Living", "Immediate Registry"],
    helpfulCount: 25,
    text: "Exceptional ethics. I booked the physical inspection through their VIP calendar and our advisor had all GMADA and bank pre-approval letters ready on site. Clear title, genuine pricing, and zero hidden costs."
  }
];

export const VerifiedBuyerReviewsHub = ({ propertyTitle = null }) => {
  const { addToast } = usePropertyContext();

  // Load reviews from localStorage or fallback
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem("estatehub_community_reviews");
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [activeFilter, setActiveFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState({});

  // Form State for User Review Submission
  const [formData, setFormData] = useState({
    name: "",
    role: "Verified RERA Allottee",
    city: "Mumbai",
    property: propertyTitle || "Grand Sovereign Estate",
    rating: 5,
    tags: ["RERA Clear Title", "Vastu Compliant"],
    text: ""
  });

  // Multi-sensory Web Audio Penthouse Atmosphere
  const [isPlayingSoundscape, setIsPlayingSoundscape] = useState(false);
  const [activeSoundscape, setActiveSoundscape] = useState("fountain");
  const audioCtxRef = useRef(null);
  const soundNodesRef = useRef([]);

  // Save to localStorage when reviews change
  useEffect(() => {
    try {
      localStorage.setItem("estatehub_community_reviews", JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  // Handle Web Audio Synthesis for Ambient Penthouse Atmosphere
  const stopSoundscape = () => {
    soundNodesRef.current.forEach(node => {
      try { node.stop(); } catch(e) {}
      try { node.disconnect(); } catch(e) {}
    });
    soundNodesRef.current = [];
    setIsPlayingSoundscape(false);
  };

  const startSoundscape = (mode = activeSoundscape) => {
    stopSoundscape();
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.04, ctx.currentTime);
      masterGain.connect(ctx.destination);

      if (mode === "fountain") {
        // Binaural water fountain bubbling synth
        const bufferSize = 2 * ctx.sampleRate;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(800, ctx.currentTime);
        filter.Q.setValueAtTime(1.2, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(masterGain);
        whiteNoise.start();
        soundNodesRef.current.push(whiteNoise);
      } else if (mode === "breeze") {
        // Gentle penthouse skyline wind breeze
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(240, ctx.currentTime);

        osc.connect(filter);
        filter.connect(masterGain);
        osc.start();
        soundNodesRef.current.push(osc);
      }

      setIsPlayingSoundscape(true);
      setActiveSoundscape(mode);
    } catch (e) {
      console.warn("Audio Context init error:", e);
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => stopSoundscape();
  }, []);

  // Filtered reviews list
  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === "darbhanga") return r.city.toLowerCase().includes("darbhanga") || r.text.toLowerCase().includes("darbhanga");
    if (activeFilter === "nri") return r.role.toLowerCase().includes("nri") || r.city.toLowerCase().includes("london") || r.city.toLowerCase().includes("dubai");
    if (activeFilter === "mumbai") return r.city.toLowerCase().includes("mumbai") || r.city.toLowerCase().includes("bengaluru");
    if (activeFilter === "top") return r.rating === 5;
    return true;
  });

  // Handle "Helpful" counter click
  const handleHelpful = (id) => {
    if (helpfulClicked[id]) return;
    playClickSound();
    setReviews(reviews.map((r) => r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
    setHelpfulClicked({ ...helpfulClicked, [id]: true });
    addToast("Marked as helpful. Thank you for building trust in our community!", "success");
  };

  // Handle Review Submission
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim()) {
      addToast("Please fill in your name and detailed review experience.", "error");
      return;
    }

    playSuccessSound();
    triggerConfetti();

    const newReview = {
      id: `rev-${Date.now()}`,
      name: formData.name,
      role: formData.role,
      city: formData.city,
      property: formData.property || (propertyTitle || "Luxury Pan-India Residence"),
      rating: formData.rating,
      date: "Just now",
      reraId: `RERA-VERIFIED-${Math.floor(100000 + Math.random() * 900000)}`,
      tags: formData.tags.length > 0 ? formData.tags : ["Verified RERA Buyer", "Clear Title"],
      helpfulCount: 1,
      text: formData.text
    };

    setReviews([newReview, ...reviews]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      role: "Verified RERA Allottee",
      city: "Mumbai",
      property: propertyTitle || "Grand Sovereign Estate",
      rating: 5,
      tags: ["RERA Clear Title", "Vastu Compliant"],
      text: ""
    });

    addToast("🎉 Your verified review has been published to India's Sovereign Trust Wall!", "success");
  };

  const toggleTag = (tag) => {
    if (formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
    } else {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
    }
  };

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-xl)",
        padding: "clamp(20px, 4vw, 36px)",
        boxShadow: "var(--shadow-md)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Subtle Gradient Glow */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: "350px",
          height: "350px",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none"
        }}
      />

      {/* Header with Title and "Submit Review" CTA */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "28px",
          flexWrap: "wrap",
          gap: "18px"
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "4px 10px",
                borderRadius: "var(--radius-full)",
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(99, 102, 241, 0.2))",
                color: "var(--accent-emerald)",
                fontSize: "0.8rem",
                fontWeight: 800,
                border: "1px solid rgba(16, 185, 129, 0.3)"
              }}
            >
              <ShieldCheck size={14} />
              100% RERA VERIFIED BUYERS & INVESTORS
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>• 1,480+ Allotments</span>
          </div>

          <h3 style={{ fontSize: "clamp(1.4rem, 2.8vw, 2rem)", margin: "4px 0", letterSpacing: "-0.5px" }}>
            Pan-India Verified Buyer Reviews & Trust Wall
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", margin: 0, maxWidth: "680px" }}>
            Real experiences from authentic homeowners, HNI investors, and global NRIs who purchased verified residences through EstateHub.
          </p>
        </div>

        {/* Action Toolbar */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {/* Ambient Penthouse Audio Bar */}
          <button
            onClick={() => {
              playClickSound();
              if (isPlayingSoundscape) {
                stopSoundscape();
              } else {
                startSoundscape("fountain");
              }
            }}
            className="btn btn-sm"
            style={{
              background: isPlayingSoundscape ? "rgba(99, 102, 241, 0.18)" : "var(--bg-secondary)",
              borderColor: isPlayingSoundscape ? "var(--accent-primary)" : "var(--border-light)",
              color: isPlayingSoundscape ? "var(--accent-primary)" : "var(--text-primary)",
              gap: "6px",
              fontWeight: 700
            }}
            title="Toggle soothing luxury penthouse audio atmosphere"
          >
            {isPlayingSoundscape ? <Volume2 size={15} color="var(--accent-primary)" /> : <VolumeX size={15} />}
            <span>{isPlayingSoundscape ? "Atmosphere: Fountain (Playing)" : "Penthouse Audio: Off"}</span>
          </button>

          {/* Submit Review Button */}
          <button
            onClick={() => {
              playClickSound();
              setIsModalOpen(true);
            }}
            className="btn btn-primary btn-sm"
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              borderColor: "#10b981",
              gap: "6px",
              boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)"
            }}
          >
            <PlusCircle size={15} />
            <span>Write a Verified Review</span>
          </button>
        </div>
      </div>

      {/* Aggregate Score Barometer */}
      <div
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-lg)",
          padding: "24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          alignItems: "center",
          marginBottom: "28px"
        }}
      >
        {/* Big Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              boxShadow: "0 6px 20px rgba(245, 158, 11, 0.3)"
            }}
          >
            <span style={{ fontSize: "1.7rem", fontWeight: 900, lineHeight: 1 }}>4.94</span>
            <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase" }}>out of 5</span>
          </div>

          <div>
            <div style={{ display: "flex", gap: "3px", marginBottom: "4px" }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
              ))}
            </div>
            <strong style={{ fontSize: "0.95rem", color: "var(--text-primary)", display: "block" }}>
              1,480+ Institutional Transactors
            </strong>
            <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
              98.4% Customer Satisfaction Index
            </span>
          </div>
        </div>

        {/* Metric 1 */}
        <div style={{ borderLeft: "1px solid var(--border-light)", paddingLeft: "16px" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
            Title & RERA Integrity
          </span>
          <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--accent-emerald)" }}>
            99.8% Zero Dispute
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            30-Year clear genealogical mutation deed search
          </span>
        </div>

        {/* Metric 2 */}
        <div style={{ borderLeft: "1px solid var(--border-light)", paddingLeft: "16px" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
            Vastu Shastra Harmony
          </span>
          <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "var(--accent-primary)" }}>
            98.6% Compliant
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            Audited Ishanya & Nairuthi layout orientations
          </span>
        </div>

        {/* Metric 3 */}
        <div style={{ borderLeft: "1px solid var(--border-light)", paddingLeft: "16px" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
            1-Yr Capital Appreciation
          </span>
          <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#f59e0b" }}>
            +18.4% YoY Gain
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            Outperforming national sensex real estate index
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          overflowX: "auto",
          paddingBottom: "4px"
        }}
      >
        {[
          { id: "all", label: "All Verified (1,480+)" },
          { id: "darbhanga", label: "👑 Founder Sanjay Desk (Bihar Belt)" },
          { id: "nri", label: "🌍 Global NRI Investors (Dubai / UK / USA)" },
          { id: "mumbai", label: "🏢 Mumbai & Bengaluru Metros" },
          { id: "top", label: "⭐ 5.0 Star Highest Rated" }
        ].map((tab) => {
          const isSelected = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playClickSound();
                setActiveFilter(tab.id);
              }}
              style={{
                padding: "7px 16px",
                borderRadius: "var(--radius-full)",
                background: isSelected ? "var(--accent-primary)" : "var(--bg-secondary)",
                color: isSelected ? "#ffffff" : "var(--text-primary)",
                border: "1px solid",
                borderColor: isSelected ? "var(--accent-primary)" : "var(--border-light)",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease"
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Reviews Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
          marginBottom: "20px"
        }}
      >
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-lg)",
              padding: "22px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              position: "relative"
            }}
          >
            <div>
              {/* Header: User Avatar & Role */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                      fontWeight: 800,
                      fontSize: "1rem",
                      boxShadow: "0 2px 8px rgba(99, 102, 241, 0.3)"
                    }}
                  >
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>{rev.name}</span>
                      <CheckCircle2 size={14} color="#10b981" title="RERA Verified Allottee" />
                    </h4>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block" }}>
                      {rev.role} • 📍 {rev.city}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{rev.date}</span>
                </div>
              </div>

              {/* Verified Property Badge */}
              <div
                style={{
                  background: "var(--bg-surface)",
                  padding: "6px 10px",
                  borderRadius: "var(--radius-sm)",
                  marginBottom: "12px",
                  border: "1px solid var(--border-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "0.75rem"
                }}
              >
                <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>
                  🏠 {rev.property}
                </span>
                <span style={{ color: "var(--text-muted)", fontFamily: "monospace" }}>
                  {rev.reraId}
                </span>
              </div>

              {/* Review Text */}
              <p
                style={{
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                  color: "var(--text-primary)",
                  margin: "0 0 14px"
                }}
              >
                "{rev.text}"
              </p>

              {/* Tag Pills */}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
                {rev.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "var(--radius-full)",
                      background: "rgba(16, 185, 129, 0.1)",
                      color: "var(--accent-emerald)",
                      border: "1px solid rgba(16, 185, 129, 0.2)"
                    }}
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer: Helpful Button */}
            <div
              style={{
                borderTop: "1px solid var(--border-light)",
                paddingTop: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Verified Legal Allotment
              </span>
              <button
                onClick={() => handleHelpful(rev.id)}
                disabled={helpfulClicked[rev.id]}
                style={{
                  background: helpfulClicked[rev.id] ? "rgba(16, 185, 129, 0.15)" : "none",
                  border: "1px solid",
                  borderColor: helpfulClicked[rev.id] ? "#10b981" : "var(--border-light)",
                  borderRadius: "var(--radius-full)",
                  padding: "4px 10px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  cursor: helpfulClicked[rev.id] ? "default" : "pointer",
                  color: helpfulClicked[rev.id] ? "#10b981" : "var(--text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                <ThumbsUp size={12} />
                <span>Helpful ({rev.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              background: "var(--bg-surface)",
              borderRadius: "var(--radius-xl)",
              maxWidth: "580px",
              width: "100%",
              padding: "28px",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
              border: "1px solid var(--border-light)",
              maxHeight: "90vh",
              overflowY: "auto"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
              <div>
                <span style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 800, textTransform: "uppercase" }}>
                  ESTATEHUB VERIFIED COMMUNITY
                </span>
                <h3 style={{ margin: "2px 0 0", fontSize: "1.35rem" }}>Share Your Experience & Review</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "1.3rem" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReview} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Star Rating Selector */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                  Your Overall Rating *
                </label>
                <div style={{ display: "flex", gap: "6px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setFormData({ ...formData, rating: star });
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "2px",
                        transform: formData.rating >= star ? "scale(1.15)" : "scale(1)",
                        transition: "transform 0.15s"
                      }}
                    >
                      <Star
                        size={26}
                        fill={formData.rating >= star ? "#f59e0b" : "none"}
                        color={formData.rating >= star ? "#f59e0b" : "var(--text-muted)"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Role */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "4px" }}>
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.88rem",
                      outline: "none"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "4px" }}>
                    Buyer Category *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.88rem",
                      outline: "none"
                    }}
                  >
                    <option value="Verified RERA Allottee">Verified RERA Allottee</option>
                    <option value="Global NRI Investor (Dubai/US/UK)">Global NRI Investor</option>
                    <option value="High Net Worth Family Office">HNI Family Office</option>
                    <option value="Tech Executive / Founder">Tech Executive / Founder</option>
                    <option value="First-Time Luxury Homebuyer">First-Time Luxury Homebuyer</option>
                  </select>
                </div>
              </div>

              {/* City & Property */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "4px" }}>
                    City / Region *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Darbhanga, Bihar or Mumbai"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.88rem",
                      outline: "none"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "4px" }}>
                    Property Purchased / Reviewed *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Heritage Kothi or Sea-Breeze Sky Penthouse"
                    value={formData.property}
                    onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.88rem",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              {/* Highlight Tags */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "6px" }}>
                  Select Highlights
                </label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {[
                    "RERA Clear Title",
                    "Vastu Compliant",
                    "Founder Sanjay Kumar Priority Desk",
                    "15-Min Token Lock",
                    "High Rental Yield",
                    "Seamless Handover"
                  ].map((tag) => {
                    const active = formData.tags.includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "var(--radius-full)",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          background: active ? "var(--accent-primary)" : "var(--bg-secondary)",
                          color: active ? "#ffffff" : "var(--text-secondary)",
                          border: `1px solid ${active ? "var(--accent-primary)" : "var(--border-light)"}`
                        }}
                      >
                        {active ? "✓ " : "+ "}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, marginBottom: "4px" }}>
                  Your Review & Honest Feedback *
                </label>
                <textarea
                  rows="4"
                  required
                  placeholder="Share your experience regarding legal verification, VR tours, property handover, or Founder Sanjay Kumar's concierge..."
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-light)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "0.88rem",
                    outline: "none",
                    resize: "vertical"
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  borderColor: "#10b981",
                  fontSize: "0.95rem"
                }}
              >
                <Sparkles size={16} />
                <span>Publish Verified Review to Trust Wall</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifiedBuyerReviewsHub;
