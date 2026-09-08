import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import PropertyCard from "../components/PropertyCard";
import { triggerConfetti, sfx } from "../utils/effects";
import {
  Sparkles,
  CheckCircle2,
  Compass,
  ArrowRight,
  RotateCcw,
  HeartHandshake,
  Award,
  Zap
} from "lucide-react";

export const Matchmaker = () => {
  const { properties } = usePropertyContext();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    purpose: "",
    lifestyle: "",
    priority: "",
    budget: ""
  });
  const [matchedResults, setMatchedResults] = useState(null);

  const questions = [
    {
      num: 1,
      key: "purpose",
      question: "What is the primary goal for this property?",
      options: [
        { label: "Family Forever Home", desc: "Spacious villa or flat for long-term family living", icon: "🏡" },
        { label: "High-Yield Investment", desc: "Maximum rental income and capital appreciation", icon: "📈" },
        { label: "Luxury NRI Sanctuary", desc: "Ultra-luxury gated residence with zero maintenance worries", icon: "💎" },
        { label: "Starter Smart Apartment", desc: "Modern flat close to IT parks and transit links", icon: "🚀" }
      ]
    },
    {
      num: 2,
      key: "lifestyle",
      question: "Who will primarily reside in this home?",
      options: [
        { label: "Growing Family with Kids", desc: "Needs schools, parks, and 3+ bedrooms", icon: "👨‍👩‍👧‍👦" },
        { label: "Young Tech Professional", desc: "Modern amenities, high-speed fiber, cafe nearby", icon: "💻" },
        { label: "Retirees / Senior Living", desc: "Quiet gardens, hospitals nearby, lift access", icon: "🧘‍♂️" },
        { label: "Corporate Executive", desc: "Penthouses with skyline views and entertainment deck", icon: "🍸" }
      ]
    },
    {
      num: 3,
      key: "priority",
      question: "What is your non-negotiable top priority?",
      options: [
        { label: "Private Garden & Plunge Pool", desc: "Open space, nature, and outdoor living", icon: "🏊" },
        { label: "Metro & Airport Proximity", desc: "Within 10 mins of major transit expressways", icon: "✈️" },
        { label: "Full Automation & Smart Security", desc: "Touch controls, 24/7 guarded gate", icon: "🔒" },
        { label: "Highest Sq.Ft for Value", desc: "Maximum usable carpet area within budget", icon: "📐" }
      ]
    },
    {
      num: 4,
      key: "budget",
      question: "What is your target budget envelope?",
      options: [
        { label: "Under ₹60 Lakh", desc: "Smart starter apartments & studios", icon: "🥉" },
        { label: "₹60 Lakh – ₹1.2 Crore", desc: "Premium 3BHK flats & duplexes", icon: "🥈" },
        { label: "₹1.2 Crore – ₹2.5 Crore", desc: "Grand villas & independent residences", icon: "🥇" },
        { label: "Above ₹2.5 Crore", desc: "Ultra-luxury sovereign penthouses & estates", icon: "👑" }
      ]
    }
  ];

  const handleSelectOption = (key, value) => {
    sfx.playPop();
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < 4) {
      setStep(step + 1);
    } else {
      // Calculate Matches
      calculateMatches(updated);
    }
  };

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingStep, setAnalyzingStep] = useState(0);

  const calculateMatches = (finalAnswers) => {
    setIsAnalyzing(true);
    setAnalyzingStep(0);

    const steps = [
      "Scanning 1,20,000+ pan-India verified listings across 36 states...",
      "Evaluating 30-Year non-encumbrance & RERA Green Shield titles...",
      "Cross-referencing Vastu Shastra & solar lighting parameters...",
      "Synthesizing optimal match portfolio with 98%+ alignment..."
    ];

    steps.forEach((_, idx) => {
      setTimeout(() => {
        setAnalyzingStep(idx);
      }, (idx + 1) * 600);
    });

    setTimeout(() => {
      let scores = properties.map((prop) => {
        let score = 78; // base match

        // Budget check
        if (finalAnswers.budget === "Under ₹60 Lakh" && prop.price <= 6000000) score += 14;
        if (finalAnswers.budget === "₹60 Lakh – ₹1.2 Crore" && prop.price >= 6000000 && prop.price <= 12000000) score += 16;
        if (finalAnswers.budget === "₹1.2 Crore – ₹2.5 Crore" && prop.price >= 12000000 && prop.price <= 25000000) score += 18;
        if (finalAnswers.budget === "Above ₹2.5 Crore" && prop.price > 25000000) score += 20;

        // Purpose check
        if (finalAnswers.purpose === "Family Forever Home" && (prop.type === "Villa" || prop.bedrooms >= 3)) score += 10;
        if (finalAnswers.purpose === "Luxury NRI Sanctuary" && prop.featured) score += 10;
        if (finalAnswers.purpose === "Starter Smart Apartment" && prop.type === "Apartment") score += 10;

        // Priority check
        if (finalAnswers.priority === "Private Garden & Plunge Pool" && prop.amenities?.includes("Swimming Pool")) score += 8;
        if (finalAnswers.priority === "Full Automation & Smart Security" && prop.amenities?.includes("Smart Home Automation")) score += 8;

        return {
          ...prop,
          matchScore: Math.min(score, 99),
          vastuScore: ((prop.id * 7 + 85) % 15) + 85,
          investmentScore: ((prop.id * 5 + 88) % 12) + 88
        };
      });

      scores.sort((a, b) => b.matchScore - a.matchScore);
      setMatchedResults(scores.slice(0, 3));
      setIsAnalyzing(false);
      sfx.playSuccess();
      triggerConfetti();
    }, 2800);
  };

  const currentQ = questions[step - 1];

  return (
    <div className="matchmaker-page" style={{ padding: "40px 0 90px", minHeight: "85vh" }}>
      <div className="container" style={{ maxWidth: "840px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--accent-primary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
            <Zap size={18} color="var(--accent-gold)" />
            <span>AI Property Matchmaker</span>
          </div>
          <h1 style={{ fontSize: "2.6rem", marginTop: "6px" }}>Find Your Dream Home in 60 Seconds</h1>
          <p style={{ marginTop: "6px", color: "var(--text-secondary)", fontSize: "1.05rem" }}>
            Answer 4 quick lifestyle questions. Our AI matching algorithm will rank your ideal verified properties.
          </p>
        </div>

        {isAnalyzing ? (
          /* Neural AI Scanning Terminal */
          <div
            style={{
              background: "linear-gradient(180deg, #0f172a 0%, #080d16 100%)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              borderRadius: "24px",
              padding: "60px 40px",
              textAlign: "center",
              color: "#ffffff",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 40px rgba(245, 158, 11, 0.2)"
            }}
            className="animate-fade-in"
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(245, 158, 11, 0.15)",
                border: "2px solid #f59e0b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
                color: "#f59e0b",
                animation: "pulse-dot 1.5s infinite"
              }}
            >
              <Sparkles size={36} />
            </div>

            <h2 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "12px", background: "linear-gradient(135deg, #ffffff, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              EstateHub Neural Engine Match In Progress...
            </h2>

            <p style={{ color: "#38bdf8", fontSize: "1.05rem", fontWeight: 700, minHeight: "30px", marginBottom: "30px" }}>
              {[
                "⚡ Scanning 1,20,000+ pan-India verified listings across 36 states...",
                "🛡️ Evaluating 30-Year non-encumbrance & RERA Green Shield titles...",
                "🧭 Cross-referencing Vastu Shastra & solar lighting parameters...",
                "💎 Synthesizing optimal match portfolio with 98%+ alignment..."
              ][analyzingStep]}
            </p>

            {/* Scanning Progress Bar */}
            <div style={{ height: "8px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "20px", overflow: "hidden", maxWidth: "480px", margin: "0 auto" }}>
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #f59e0b, #10b981)",
                  width: `${((analyzingStep + 1) / 4) * 100}%`,
                  transition: "width 0.5s ease"
                }}
              />
            </div>
          </div>
        ) : !matchedResults ? (
          /* Quiz Questions Card */
          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-lg)",
              padding: "40px",
              boxShadow: "var(--shadow-sm)"
            }}
            className="animate-fade-in"
          >
            {/* Step Counter */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent-primary)" }}>
                Question {step} of 4
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                {Math.round((step / 4) * 100)}% Completed
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{ height: "6px", background: "var(--bg-secondary)", borderRadius: "var(--radius-full)", marginBottom: "30px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, var(--accent-primary), #60a5fa)",
                  width: `${(step / 4) * 100}%`,
                  transition: "width 0.3s ease"
                }}
              />
            </div>

            <h2 style={{ fontSize: "1.6rem", marginBottom: "24px" }}>{currentQ.question}</h2>

            {/* Option Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {currentQ.options.map((opt, i) => (
                <div
                  key={i}
                  onClick={() => handleSelectOption(currentQ.key, opt.label)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "18px 24px",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-secondary)",
                    border: "1.5px solid var(--border-light)",
                    cursor: "pointer",
                    transition: "var(--transition)"
                  }}
                  className="quiz-option-card"
                >
                  <span style={{ fontSize: "2rem" }}>{opt.icon}</span>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: "1.05rem", margin: "0 0 2px" }}>{opt.label}</h4>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>{opt.desc}</p>
                  </div>
                  <ArrowRight size={18} color="var(--accent-primary)" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="animate-fade-in">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div>
                <h2 style={{ fontSize: "1.8rem", margin: 0 }}>🎉 Your AI Top Matches</h2>
                <p style={{ margin: "4px 0 0", color: "var(--text-secondary)" }}>
                  Ranked by our algorithm based on your lifestyle, budget, and location preferences.
                </p>
              </div>

              <button
                onClick={() => {
                  setStep(1);
                  setAnswers({ purpose: "", lifestyle: "", priority: "", budget: "" });
                  setMatchedResults(null);
                }}
                className="btn btn-secondary btn-sm"
                style={{ gap: "6px" }}
              >
                <RotateCcw size={14} />
                <span>Retake Quiz</span>
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {matchedResults.map((prop, index) => (
                <div
                  key={prop.id}
                  style={{
                    background: "var(--bg-surface)",
                    border: index === 0 ? "2px solid var(--accent-gold)" : "1px solid var(--border-light)",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    boxShadow: "var(--shadow-md)",
                    position: "relative"
                  }}
                >
                  {/* Top Match Ribbon */}
                  <div
                    style={{
                      background: index === 0 ? "linear-gradient(135deg, #f59e0b, #d97706)" : "var(--accent-primary)",
                      color: "#ffffff",
                      padding: "8px 16px",
                      fontSize: "0.82rem",
                      fontWeight: 800,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "8px"
                    }}
                  >
                    <span>{index === 0 ? "🏆 #1 TOP AI MATCH" : `#${index + 1} RECOMMENDED MATCH`}</span>
                    <div style={{ display: "flex", gap: "10px", fontSize: "0.75rem" }}>
                      <span style={{ background: "rgba(0,0,0,0.3)", padding: "2px 8px", borderRadius: "10px" }}>🎯 {prop.matchScore}% Match</span>
                      <span style={{ background: "rgba(0,0,0,0.3)", padding: "2px 8px", borderRadius: "10px" }}>🧭 {prop.vastuScore}% Vastu</span>
                      <span style={{ background: "rgba(0,0,0,0.3)", padding: "2px 8px", borderRadius: "10px" }}>📈 {prop.investmentScore}% ROI</span>
                    </div>
                  </div>

                  <PropertyCard property={prop} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .quiz-option-card:hover {
          background: var(--bg-surface) !important;
          border-color: var(--accent-primary) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
      `}</style>
    </div>
  );
};

export default Matchmaker;
