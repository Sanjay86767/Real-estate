import React, { useState } from "react";
import {
  Wand2,
  Sparkles,
  Layers,
  Palette,
  Camera,
  Download,
  CheckCircle2,
  Share2,
  Eye,
  Sliders,
  Award,
  ArrowRight
} from "lucide-react";
import AiInteriorStyler from "../components/AiInteriorStyler";
import { usePropertyContext } from "../context/PropertyContext";
import { playClickSound, playSuccessSound, triggerConfetti } from "../utils/effects";

const MATERIALS_CATALOG = [
  { name: "Italian Statuario Marble", type: "Flooring", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80", rate: "₹650/sq.ft", finish: "High Gloss Polished" },
  { name: "Smoked European White Oak", type: "Hardwood", image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=300&q=80", rate: "₹420/sq.ft", finish: "Matte Wirebrushed" },
  { name: "Fluted American Walnut", type: "Wall Paneling", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=300&q=80", rate: "₹850/sq.ft", finish: "Natural Satin Oil" },
  { name: "Architectural Micro-Cement", type: "Seamless Surface", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=300&q=80", rate: "₹380/sq.ft", finish: "Textured Mineral" }
];

export const InteriorStudio = () => {
  const { addToast } = usePropertyContext();
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS_CATALOG[0]);
  const [copiedHex, setCopiedHex] = useState(null);

  const handleCopyColor = (hex) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    playSuccessSound();
    addToast(`Color code ${hex} copied to clipboard!`, "success");
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleExportMoodboard = () => {
    playSuccessSound();
    triggerConfetti();
    addToast("4K Architectural Moodboard compiled and ready for PDF download!", "success");
    setTimeout(() => window.print(), 500);
  };

  return (
    <div className="interior-studio-page" style={{ padding: "40px 0 90px", background: "var(--bg-primary)" }}>
      <div className="container">
        {/* Page Hero Header */}
        <div style={{ textAlign: "center", maxWidth: "840px", margin: "0 auto 40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 14px",
              borderRadius: "var(--radius-full)",
              background: "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(99, 102, 241, 0.2))",
              color: "#a855f7",
              fontSize: "0.85rem",
              fontWeight: 800,
              border: "1px solid rgba(168, 85, 247, 0.3)",
              marginBottom: "14px"
            }}
          >
            <Wand2 size={16} />
            AI ARCHITECTURAL & VIRTUAL STAGING SUITE
          </div>
          <h1 style={{ fontSize: "2.7rem", marginBottom: "14px" }}>
            AI Interior Design & Renovation Studio
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: "1.7" }}>
            Transform empty rooms into bespoke luxury spaces using neural rendering. Test architectural aesthetics, preview materials, and calculate turnkey renovation budgets in real time.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "20px" }}>
            <button onClick={handleExportMoodboard} className="btn btn-primary" style={{ gap: "8px" }}>
              <Download size={18} />
              <span>Export Design Moodboard (PDF)</span>
            </button>
          </div>
        </div>

        {/* 1. The Core AI Virtual Stager Component */}
        <div style={{ marginBottom: "50px" }}>
          <AiInteriorStyler />
        </div>

        {/* 2. Architectural Materials Catalog & Finishes */}
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-xl)",
            padding: "32px",
            boxShadow: "var(--shadow-md)",
            marginBottom: "40px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h3 style={{ fontSize: "1.4rem", margin: 0 }}>Curated Architectural Finishes & Materials</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: "4px 0 0" }}>
                Imported materials calibrated for luxury acoustic warmth and long-term durability.
              </p>
            </div>
            <span style={{ fontSize: "0.85rem", color: "var(--accent-primary)", fontWeight: 700 }}>
              ISO 9001 Certified Sourcing
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {MATERIALS_CATALOG.map((mat, idx) => {
              const isSelected = selectedMaterial.name === mat.name;
              return (
                <div
                  key={idx}
                  onClick={() => { playClickSound(); setSelectedMaterial(mat); }}
                  style={{
                    background: isSelected ? "var(--bg-primary)" : "var(--bg-secondary)",
                    border: isSelected ? "2px solid var(--accent-primary)" : "1px solid var(--border-light)",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "var(--transition)",
                    boxShadow: isSelected ? "var(--shadow-md)" : "none"
                  }}
                >
                  <div style={{ height: "140px", overflow: "hidden" }}>
                    <img src={mat.image} alt={mat.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "16px" }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 700, textTransform: "uppercase" }}>
                      {mat.type}
                    </span>
                    <h4 style={{ margin: "4px 0 8px", fontSize: "1rem" }}>{mat.name}</h4>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                      <span style={{ color: "var(--text-secondary)" }}>{mat.finish}</span>
                      <strong style={{ color: "var(--accent-emerald)" }}>{mat.rate}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Designer Color Palettes & Paint Codes */}
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-xl)",
            padding: "32px",
            boxShadow: "var(--shadow-md)"
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "1.4rem", margin: 0 }}>Signature Architectural Color Palettes</h3>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: "4px 0 0" }}>
              Click any color swatch to instantly copy its exact hexadecimal code for your painter or architect.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            {[
              { name: "Nordic Frost", hex: "#F4F1EA", desc: "Warm Chalk White" },
              { name: "Smoked Truffle", hex: "#4A453F", desc: "Muted Earth Accent" },
              { name: "Obsidian Night", hex: "#0F172A", desc: "Deep Acoustic Slate" },
              { name: "Royal Terracotta", hex: "#C2410C", desc: "Earthy Tuscan Clay" },
              { name: "Champagne Brass", hex: "#D97706", desc: "Opulent Metallic" },
              { name: "Cyber Neon Violet", hex: "#6366F1", desc: "Ambient Indirect Hue" }
            ].map((col, cIdx) => (
              <div
                key={cIdx}
                onClick={() => handleCopyColor(col.hex)}
                style={{
                  background: "var(--bg-secondary)",
                  borderRadius: "var(--radius-md)",
                  padding: "16px",
                  border: "1px solid var(--border-light)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  transition: "var(--transition)"
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    backgroundColor: col.hex,
                    border: "2px solid #ffffff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    flexShrink: 0
                  }}
                />
                <div>
                  <strong style={{ fontSize: "0.9rem", display: "block" }}>{col.name}</strong>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{col.desc}</span>
                  <div style={{ fontSize: "0.8rem", color: copiedHex === col.hex ? "var(--accent-emerald)" : "var(--accent-primary)", fontWeight: 700, marginTop: "2px" }}>
                    {copiedHex === col.hex ? "Copied!" : col.hex}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteriorStudio;
