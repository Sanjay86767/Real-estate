import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Sliders,
  Maximize2,
  RefreshCw,
  Palette,
  Check,
  Download,
  Share2,
  Layers,
  Wand2,
  Eye,
  Info
} from "lucide-react";
import { playClickSound, playSuccessSound, triggerConfetti } from "../utils/effects";
import { usePropertyContext } from "../context/PropertyContext";

// Room sample images tailored to luxury architecture
const ROOM_PRESETS = [
  {
    id: "living",
    name: "Grand Living Lounge",
    baseImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Double-height atrium living room with floor-to-ceiling panoramic glass."
  },
  {
    id: "bedroom",
    name: "Master Sanctuary Suite",
    baseImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    description: "King master bedroom with private balcony access and hardwood floors."
  },
  {
    id: "kitchen",
    name: "Gourmet Chef's Kitchen",
    baseImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    description: "German island kitchen equipped with integrated quartz countertops."
  },
  {
    id: "terrace",
    name: "Skyline Sunset Terrace",
    baseImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    description: "Open-air wooden deck with infinity pool lounge and lush planters."
  }
];

// Interior Design Styles and their real-time CSS visual filters & AI specs
const DESIGN_STYLES = [
  {
    id: "minimal",
    name: "Scandinavian Minimal",
    badge: "Clean & Organic",
    filter: "brightness(1.1) contrast(1.05) saturate(0.85) sepia(0.08)",
    overlayColor: "rgba(245, 240, 230, 0.15)",
    materials: ["Smoked European White Oak", "Pure Off-White Limewash", "Linen Drapery"],
    palette: ["#F4F1EA", "#D3C5B4", "#4A453F"],
    costEstimate: "₹4.5L - ₹6.5L",
    turnaround: "14 Days"
  },
  {
    id: "luxury",
    name: "Neo-Classical Luxury",
    badge: "Opulent & Royal",
    filter: "brightness(1.02) contrast(1.22) saturate(1.25) sepia(0.2)",
    overlayColor: "rgba(217, 119, 6, 0.12)",
    materials: ["Italian Statuario Marble", "Brushed Champagne Brass", "Fluted Walnut Wood"],
    palette: ["#1F2937", "#D97706", "#F59E0B"],
    costEstimate: "₹12.5L - ₹18L",
    turnaround: "28 Days"
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk Midnight",
    badge: "Futuristic & Moody",
    filter: "brightness(0.92) contrast(1.35) saturate(1.4) hue-rotate(220deg)",
    overlayColor: "rgba(99, 102, 241, 0.22)",
    materials: ["Acoustic Obsidian Slat Panels", "RGB Indirect Neon Glow", "Tinted Black Glass"],
    palette: ["#0F172A", "#6366F1", "#EC4899"],
    costEstimate: "₹8.0L - ₹11L",
    turnaround: "18 Days"
  },
  {
    id: "bohemian",
    name: "Warm Earthy Boho",
    badge: "Cozy & Botanical",
    filter: "brightness(1.05) contrast(1.1) saturate(1.15) sepia(0.28)",
    overlayColor: "rgba(234, 88, 12, 0.12)",
    materials: ["Handcrafted Rattan & Jute", "Terracotta Clay Tiles", "Indoor Fiddle Leaf Fig"],
    palette: ["#C2410C", "#D97706", "#78350F"],
    costEstimate: "₹3.5L - ₹5.5L",
    turnaround: "10 Days"
  },
  {
    id: "industrial",
    name: "Urban Industrial Loft",
    badge: "Raw & Architectural",
    filter: "brightness(0.98) contrast(1.3) saturate(0.65)",
    overlayColor: "rgba(71, 85, 105, 0.18)",
    materials: ["Exposed Micro-Concrete", "Powder-coated Matte Black Steel", "Edison Warm Filament"],
    palette: ["#334155", "#64748B", "#F97316"],
    costEstimate: "₹6.5L - ₹9.0L",
    turnaround: "21 Days"
  }
];

// Curated Indian Luxury Furniture & Lighting Catalog per style
const STYLE_FURNITURE_CATALOG = {
  minimal: [
    { id: "m1", name: "Nordic Solid White Ash Dining Suite (6-Seater)", brand: "Urban Ladder Luxe", price: 85000, type: "Furniture" },
    { id: "m2", name: "Dimmable 3000K Magnetic CRI95+ Track Lights", brand: "Philips Hue Pro", price: 42000, type: "Lighting" },
    { id: "m3", name: "Organic Raw Linen Acoustic Wave Drapery", brand: "D'Decor Signature", price: 38000, type: "Textiles" },
    { id: "m4", name: "Solid Smoked Oak Fluted Media Console", brand: "Sovereign Craft", price: 62000, type: "Joinery" }
  ],
  luxury: [
    { id: "l1", name: "Imported Statuario Italian Marble Waterfall Island", brand: "Classic Marble Co.", price: 240000, type: "Stone" },
    { id: "l2", name: "Hand-Knotted Kashmiri Mulberry Silk Rug (10x8)", brand: "Kashmir Loom Heritage", price: 120000, type: "Textiles" },
    { id: "l3", name: "Brushed Champagne Brass Chandelier with K9 Crystal", brand: "Tisva Luxury Lighting", price: 145000, type: "Lighting" },
    { id: "l4", name: "Custom Fluted Burma Teak Credenza with Soft-close", brand: "Founder Sanjay Teakwood Craft", price: 185000, type: "Joinery" }
  ],
  cyberpunk: [
    { id: "c1", name: "Indirect RGBIC Smart Diffused Ceiling Channels", brand: "Govee Architectural", price: 65000, type: "Lighting" },
    { id: "c2", name: "Acoustic Obsidian Slat Panels with Sound Isolation", brand: "Armstrong Pro", price: 75000, type: "Surfaces" },
    { id: "c3", name: "Motorized Dual Blackout Smart Roller Shades", brand: "Somfy SmartHome", price: 92000, type: "Automation" },
    { id: "c4", name: "Smoked Jet Black Glass & Carbon Fiber Coffee Table", brand: "BoConcept Neo", price: 88000, type: "Furniture" }
  ],
  bohemian: [
    { id: "b1", name: "Handcrafted Jodhpur Rattan Modular 4-Seater Lounge", brand: "FabIndia Heritage", price: 78000, type: "Furniture" },
    { id: "b2", name: "Natural Terracotta Clay Wall Mural & Planter Array", brand: "Khurja Artisans", price: 34000, type: "Art & Decor" },
    { id: "b3", name: "Braided Pure Jute Floor Carpet with Hand Stitching", brand: "Jaipur Rugs Atelier", price: 32000, type: "Textiles" },
    { id: "b4", name: "Warm Edison Filament Bamboo Cage Pendant Lights", brand: "The White Teak", price: 41000, type: "Lighting" }
  ],
  industrial: [
    { id: "i1", name: "Reclaimed Century-Old Railway Teak Dining Table", brand: "Iron & Timber Guild", price: 95000, type: "Furniture" },
    { id: "i2", name: "Matte Powder-Coated Flos-Style Suspended Pendants", brand: "Klove Studio", price: 58000, type: "Lighting" },
    { id: "i3", name: "Micro-Cement Seamless Wall Coating & Hydro-Seal", brand: "Asian Paints Nilaya", price: 82000, type: "Finishes" },
    { id: "i4", name: "Matte Black Steel Frame Glass Room Partitions", brand: "Saint-Gobain GlassPro", price: 110000, type: "Glazing" }
  ]
};

export const AiInteriorStyler = ({ property }) => {
  const { addToast } = usePropertyContext();
  const [selectedRoom, setSelectedRoom] = useState(ROOM_PRESETS[0]);
  const [activeStyle, setActiveStyle] = useState(DESIGN_STYLES[0]);
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100 percentage
  const [isProcessing, setIsProcessing] = useState(false);
  const [savedDesigns, setSavedDesigns] = useState(0);
  const [vastuOverlay, setVastuOverlay] = useState(false);
  const [selectedFurniture, setSelectedFurniture] = useState(["m1", "m2", "m3"]);
  const [showSpecSheet, setShowSpecSheet] = useState(false);

  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);

  // Handle Drag / Touch on split slider
  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDraggingRef.current = true;
  };

  const handleTouchStart = () => {
    isDraggingRef.current = true;
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleMouseMove = (e) => {
      if (isDraggingRef.current) {
        handleMove(e.clientX);
      }
    };

    const handleTouchMove = (e) => {
      if (isDraggingRef.current && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Style change trigger with AI synthesis simulation
  const handleStyleChange = (style) => {
    playClickSound();
    setIsProcessing(true);
    setTimeout(() => {
      setActiveStyle(style);
      setIsProcessing(false);
      playSuccessSound();
    }, 450);
  };

  // Save Design Look
  const handleSaveDesign = () => {
    playSuccessSound();
    triggerConfetti();
    setSavedDesigns((prev) => prev + 1);
    addToast(`AI Design "${activeStyle.name}" saved to your architectural moodboard!`, "success");
  };

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-xl)",
        padding: "32px",
        boxShadow: "var(--shadow-md)",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "16px"
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
                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))",
                color: "var(--accent-primary)",
                fontSize: "0.8rem",
                fontWeight: 800,
                border: "1px solid rgba(99, 102, 241, 0.3)"
              }}
            >
              <Wand2 size={13} />
              AI ARCHITECTURAL STUDIO
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>• Real-Time Neural Stager</span>
          </div>
          <h3 style={{ fontSize: "1.6rem", margin: 0 }}>AI Interior Styler & Renovation Visualizer</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", margin: "4px 0 0" }}>
            Drag the split-slider to compare the original raw layout with our generative AI interior transformation.
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => {
              playClickSound();
              setVastuOverlay(!vastuOverlay);
            }}
            className="btn btn-sm"
            style={{
              gap: "6px",
              background: vastuOverlay ? "rgba(249, 115, 22, 0.2)" : "var(--bg-secondary)",
              borderColor: vastuOverlay ? "#f97316" : "var(--border-light)",
              color: vastuOverlay ? "#f97316" : "var(--text-primary)",
              fontWeight: 700
            }}
          >
            <Compass size={15} color={vastuOverlay ? "#f97316" : "var(--text-secondary)"} />
            <span>Vastu Energy Grid: {vastuOverlay ? "ACTIVE" : "OFF"}</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setShowSpecSheet(true);
            }}
            className="btn btn-outline btn-sm"
            style={{ gap: "6px" }}
          >
            <FileText size={15} />
            <span>Architectural Spec</span>
          </button>

          <button
            onClick={handleSaveDesign}
            className="btn btn-primary btn-sm"
            style={{ gap: "6px" }}
          >
            <Sparkles size={15} />
            <span>Save Look {savedDesigns > 0 && `(${savedDesigns})`}</span>
          </button>
        </div>
      </div>

      {/* Room Selector Tabs */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          overflowX: "auto",
          paddingBottom: "4px"
        }}
      >
        {ROOM_PRESETS.map((room) => {
          const isSelected = selectedRoom.id === room.id;
          return (
            <button
              key={room.id}
              onClick={() => {
                playClickSound();
                setSelectedRoom(room);
              }}
              style={{
                padding: "8px 16px",
                borderRadius: "var(--radius-full)",
                background: isSelected ? "var(--accent-primary)" : "var(--bg-secondary)",
                color: isSelected ? "#ffffff" : "var(--text-primary)",
                border: "1px solid",
                borderColor: isSelected ? "var(--accent-primary)" : "var(--border-light)",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "var(--transition)"
              }}
            >
              {room.name}
            </button>
          );
        })}
      </div>

      {/* Interactive Split-Slider Canvas Viewport */}
      <div
        ref={containerRef}
        className="interior-styler-viewport"
        style={{
          position: "relative",
          height: "440px",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          userSelect: "none",
          boxShadow: "var(--shadow-lg)",
          marginBottom: "24px"
        }}
      >
        {/* Layer 1: Restyled AI Image (Full Width background) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${selectedRoom.baseImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: activeStyle.filter,
            transition: "filter 0.3s ease"
          }}
        >
          {/* Color grading overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: activeStyle.overlayColor,
              mixBlendMode: "overlay",
              pointerEvents: "none"
            }}
          />
        </div>

        {/* AI Restyled Label (Right top) */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(8px)",
            padding: "6px 14px",
            borderRadius: "var(--radius-full)",
            color: "#ffffff",
            fontSize: "0.8rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            zIndex: 10
          }}
        >
          <Sparkles size={14} color="#60a5fa" />
          <span>AI STYLED: {activeStyle.name.toUpperCase()}</span>
        </div>

        {/* Layer 2: Original Unmodified Image (Clipped by sliderPosition) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: `${sliderPosition}%`,
            overflow: "hidden",
            borderRight: "3px solid #ffffff",
            boxShadow: "4px 0 20px rgba(0,0,0,0.5)",
            zIndex: 5
          }}
        >
          <div
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%",
              height: "100%",
              backgroundImage: `url(${selectedRoom.baseImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />

          {/* Original Label (Left top) */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              background: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(8px)",
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              color: "#ffffff",
              fontSize: "0.8rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <span>ORIGINAL STATE</span>
          </div>
        </div>

        {/* Vastu Energy Compass Grid Overlay */}
        {vastuOverlay && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 15,
              pointerEvents: "none",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              border: "2px dashed rgba(249, 115, 22, 0.6)"
            }}
          >
            <div style={{ borderRight: "1px dashed rgba(249, 115, 22, 0.4)", borderBottom: "1px dashed rgba(249, 115, 22, 0.4)", padding: "10px", background: "rgba(59, 130, 246, 0.08)" }}>
              <span style={{ background: "rgba(15, 23, 42, 0.85)", color: "#60a5fa", padding: "3px 8px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 800 }}>
                NW • Vayu (Air / Social Flow)
              </span>
            </div>
            <div style={{ borderBottom: "1px dashed rgba(249, 115, 22, 0.4)", padding: "10px", textAlign: "right", background: "rgba(16, 185, 129, 0.08)" }}>
              <span style={{ background: "rgba(15, 23, 42, 0.85)", color: "#34d399", padding: "3px 8px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 800 }}>
                NE • Ishanya (Water / Prosperity & Light)
              </span>
            </div>
            <div style={{ borderRight: "1px dashed rgba(249, 115, 22, 0.4)", padding: "10px", display: "flex", alignItems: "flex-end", background: "rgba(245, 158, 11, 0.08)" }}>
              <span style={{ background: "rgba(15, 23, 42, 0.85)", color: "#fbbf24", padding: "3px 8px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 800 }}>
                SW • Nairuthi (Earth / Stability & Master)
              </span>
            </div>
            <div style={{ padding: "10px", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", background: "rgba(239, 68, 68, 0.08)" }}>
              <span style={{ background: "rgba(15, 23, 42, 0.85)", color: "#f87171", padding: "3px 8px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 800 }}>
                SE • Agneya (Fire / Vital Energy & Culinary)
              </span>
            </div>
          </div>
        )}

        {/* Draggable Divider Handle */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{
            position: "absolute",
            top: "50%",
            left: `${sliderPosition}%`,
            transform: "translate(-50%, -50%)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "#ffffff",
            boxShadow: "0 0 24px rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "ew-resize",
            zIndex: 20,
            color: "#0f172a"
          }}
          title="Drag left or right to compare"
        >
          <Sliders size={20} />
        </div>

        {/* Processing Indicator */}
        {isProcessing && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(15, 23, 42, 0.6)",
              backdropFilter: "blur(4px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 30,
              color: "#ffffff"
            }}
          >
            <div className="spinner" style={{ marginBottom: "12px" }}></div>
            <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>
              Generating Generative Neural Lighting...
            </span>
          </div>
        )}
      </div>

      {/* Style Chooser Carousel / Cards */}
      <div style={{ marginBottom: "28px" }}>
        <h4 style={{ fontSize: "1.05rem", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
          <Palette size={18} color="var(--accent-primary)" />
          <span>Select AI Architectural Theme</span>
        </h4>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px"
          }}
        >
          {DESIGN_STYLES.map((style) => {
            const isSelected = activeStyle.id === style.id;
            return (
              <div
                key={style.id}
                onClick={() => handleStyleChange(style)}
                style={{
                  background: isSelected ? "var(--bg-primary)" : "var(--bg-secondary)",
                  border: isSelected ? "2px solid var(--accent-primary)" : "1px solid var(--border-light)",
                  borderRadius: "var(--radius-md)",
                  padding: "16px",
                  cursor: "pointer",
                  transition: "var(--transition)",
                  position: "relative",
                  boxShadow: isSelected ? "0 4px 14px rgba(99, 102, 241, 0.2)" : "none"
                }}
              >
                {isSelected && (
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "var(--accent-primary)",
                      color: "#ffffff",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Check size={12} />
                  </div>
                )}
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "var(--accent-primary)",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "4px"
                  }}
                >
                  {style.badge}
                </span>
                <strong style={{ fontSize: "0.95rem", display: "block", marginBottom: "8px" }}>
                  {style.name}
                </strong>

                {/* Color Palette Dots */}
                <div style={{ display: "flex", gap: "6px" }}>
                  {style.palette.map((colorHex, cIdx) => (
                    <span
                      key={cIdx}
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        backgroundColor: colorHex,
                        border: "1px solid rgba(0,0,0,0.1)"
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Renovation Breakdown & Smart Bill of Materials */}
      <div
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-lg)",
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "18px",
          marginBottom: "20px"
        }}
      >
        <div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
            Curated Material Specification
          </span>
          <div style={{ marginTop: "6px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {activeStyle.materials.map((m, idx) => (
              <span key={idx} style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>
                ✓ {m}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
            Estimated Turnkey Execution
          </span>
          <div style={{ marginTop: "4px", fontSize: "1.3rem", fontWeight: 800, color: "var(--accent-primary)" }}>
            {activeStyle.costEstimate}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            Includes civil, MEP, laser cutting & 5-year warranty
          </span>
        </div>

        <div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
            Handover Timeline
          </span>
          <div style={{ marginTop: "4px", fontSize: "1.3rem", fontWeight: 800, color: "var(--accent-emerald)" }}>
            {activeStyle.turnaround}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            Guaranteed on-time move-in handover
          </span>
        </div>
      </div>

      {/* Interactive Furniture & Lighting BOM (Bill of Materials) */}
      <div
        style={{
          background: "rgba(99, 102, 241, 0.04)",
          border: "1px solid rgba(99, 102, 241, 0.2)",
          borderRadius: "var(--radius-lg)",
          padding: "22px",
          marginBottom: "20px"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <h4 style={{ margin: 0, fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <Layers size={18} color="var(--accent-primary)" />
              <span>Designer Furniture & Lighting Package ({activeStyle.name})</span>
            </h4>
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              Select items to include in your customized interior quotation
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Selected Package:</span>
            <span style={{ fontSize: "1.1rem", fontWeight: 900, color: "var(--accent-primary)" }}>
              ₹{((STYLE_FURNITURE_CATALOG[activeStyle.id] || [])
                .filter(item => selectedFurniture.includes(item.id))
                .reduce((acc, item) => acc + item.price, 0)
              ).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
          {(STYLE_FURNITURE_CATALOG[activeStyle.id] || []).map((item) => {
            const isChecked = selectedFurniture.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => {
                  playClickSound();
                  if (isChecked) {
                    setSelectedFurniture(selectedFurniture.filter(id => id !== item.id));
                  } else {
                    setSelectedFurniture([...selectedFurniture, item.id]);
                  }
                }}
                style={{
                  background: isChecked ? "var(--bg-surface)" : "var(--bg-secondary)",
                  border: `1.5px solid ${isChecked ? "var(--accent-primary)" : "var(--border-light)"}`,
                  borderRadius: "var(--radius-md)",
                  padding: "12px 14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  transition: "all 0.2s ease"
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}} // handled by parent div onClick
                  style={{ marginTop: "3px", cursor: "pointer", accentColor: "var(--accent-primary)" }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 700, textTransform: "uppercase" }}>
                      {item.type} • {item.brand}
                    </span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--text-primary)" }}>
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <strong style={{ fontSize: "0.86rem", display: "block", marginTop: "2px", color: "var(--text-primary)", lineHeight: 1.3 }}>
                    {item.name}
                  </strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Founder Sanjay Kumar Direct Architectural Concierge Action */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 27, 75, 0.95))",
          border: "1px solid rgba(245, 158, 11, 0.3)",
          borderRadius: "var(--radius-lg)",
          padding: "20px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 16px rgba(245, 158, 11, 0.4)"
            }}
          >
            <Wand2 size={24} color="#ffffff" />
          </div>
          <div>
            <h4 style={{ margin: 0, color: "#ffffff", fontSize: "1.05rem" }}>
              Founder Sanjay Kumar's Turnkey Interior Concierge
            </h4>
            <span style={{ color: "#94a3b8", fontSize: "0.82rem" }}>
              Direct turnkey consultation for {selectedRoom.name} in {activeStyle.name} aesthetic
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setShowSpecSheet(true)}
            className="btn btn-outline btn-sm"
            style={{ color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.3)" }}
          >
            <Eye size={15} /> View Spec Sheet
          </button>
          <a
            href={`https://wa.me/918809604880?text=${encodeURIComponent(
              `Namaste Sanjay ji! I was exploring the AI Interior Studio on EstateHub for ${selectedRoom.name} with "${activeStyle.name}" theme. Estimated turnkey budget is ${activeStyle.costEstimate}. Please connect me with your design & execution architect.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm"
            style={{
              background: "linear-gradient(135deg, #10b981, #059669)",
              borderColor: "#10b981",
              gap: "6px",
              textDecoration: "none"
            }}
          >
            <span>WhatsApp Founder Desk</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* Architectural Spec Sheet Modal */}
      {showSpecSheet && (
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
          onClick={() => setShowSpecSheet(false)}
        >
          <div
            style={{
              background: "var(--bg-surface)",
              borderRadius: "var(--radius-xl)",
              maxWidth: "650px",
              width: "100%",
              padding: "30px",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
              border: "1px solid var(--border-light)",
              maxHeight: "90vh",
              overflowY: "auto"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid var(--border-light)", paddingBottom: "14px" }}>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--accent-primary)", fontWeight: 800, textTransform: "uppercase" }}>
                  ESTATEHUB LUXURY ARCHITECTURE
                </span>
                <h3 style={{ margin: "2px 0 0", fontSize: "1.35rem" }}>Architectural Specification Dossier</h3>
              </div>
              <button
                onClick={() => setShowSpecSheet(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "1.2rem", fontWeight: 700 }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "0.9rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "var(--bg-secondary)", padding: "14px", borderRadius: "var(--radius-md)" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Target Space</span>
                  <div style={{ fontWeight: 700 }}>{selectedRoom.name}</div>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>AI Style Theme</span>
                  <div style={{ fontWeight: 700 }}>{activeStyle.name}</div>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Turnkey Execution</span>
                  <div style={{ fontWeight: 700, color: "var(--accent-primary)" }}>{activeStyle.costEstimate}</div>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Execution Window</span>
                  <div style={{ fontWeight: 700, color: "var(--accent-emerald)" }}>{activeStyle.turnaround}</div>
                </div>
              </div>

              <div>
                <strong style={{ display: "block", marginBottom: "6px" }}>Specified Materials & Finishes:</strong>
                <ul style={{ margin: 0, paddingLeft: "20px", color: "var(--text-secondary)" }}>
                  {activeStyle.materials.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong style={{ display: "block", marginBottom: "6px" }}>Selected Furniture & Smart Fixtures:</strong>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {(STYLE_FURNITURE_CATALOG[activeStyle.id] || [])
                    .filter(item => selectedFurniture.includes(item.id))
                    .map((item) => (
                      <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)" }}>
                        <span>{item.name} ({item.brand})</span>
                        <strong>₹{item.price.toLocaleString("en-IN")}</strong>
                      </div>
                    ))}
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  Verified by Founder Sanjay Kumar Architecture Studio
                </span>
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="btn btn-primary btn-sm"
                  style={{ gap: "6px" }}
                >
                  <Download size={14} /> Print / Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiInteriorStyler;
