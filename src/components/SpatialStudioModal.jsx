import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Compass,
  Layers,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Maximize2,
  Eye,
  Info,
  Sparkles,
  ChevronRight,
  RotateCcw
} from "lucide-react";
import { usePropertyContext } from "../context/PropertyContext";

export const SpatialStudioModal = ({ property, onClose }) => {
  const { formatPrice } = usePropertyContext();

  // Floor elevation levels
  const elevations = [
    {
      id: "ground",
      label: "Ground Garden Level",
      height: "0m (Private Lawn & Waterbody)",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
      roomTitle: "Private Courtyard & Pool Deck"
    },
    {
      id: "mid",
      label: "14th Floor Skyline",
      height: "45m (Panoramic City Vista)",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      roomTitle: "Double-Height Great Room"
    },
    {
      id: "penthouse",
      label: "42nd Floor Penthouse Horizon",
      height: "140m (Clouds & Sea Horizon)",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      roomTitle: "Sky Observatory & Master Lounge"
    }
  ];

  // Time of Day Lighting modes
  const timeModes = [
    { id: "dawn", name: "Morning Dawn (7 AM)", filter: "sepia(20%) brightness(95%) contrast(105%) hue-rotate(-10deg)" },
    { id: "noon", name: "Midday Sun (12 PM)", filter: "brightness(108%) contrast(110%)" },
    { id: "sunset", name: "Golden Hour (6 PM)", filter: "sepia(45%) saturate(140%) brightness(90%) hue-rotate(-15deg)" },
    { id: "night", name: "Midnight City Glow (10 PM)", filter: "brightness(45%) contrast(130%) hue-rotate(190deg) saturate(120%)" }
  ];

  const [activeElevation, setActiveElevation] = useState(1); // 14th floor default
  const [activeTimeIndex, setActiveTimeIndex] = useState(1); // noon
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [panAngle, setPanAngle] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);

  const currentElevation = elevations[activeElevation];
  const currentTimeMode = timeModes[activeTimeIndex];

  // Hotspots for current elevation
  const hotspots = [
    { x: 32, y: 48, label: "Floor-to-Ceiling Low-E Acoustic Glazing", spec: "Noise attenuation: 42dB" },
    { x: 68, y: 35, label: "Double-Height 14.5ft Ceiling", spec: "Engineered timber rafters" },
    { x: 50, y: 75, label: "Italian Statuario Marble Flooring", spec: "Book-matched 1200x2400mm slabs" }
  ];

  // Mouse pan handling
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX - panAngle;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    setPanAngle(Math.max(-180, Math.min(180, delta)));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Ambient sound synthesis using Web Audio API (Nature breeze & city tone)
  useEffect(() => {
    if (soundEnabled) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContext();
        }
        const ctx = audioContextRef.current;
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        // Create pink noise buffer for realistic breeze
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          output[i] = (b0 + b1 + b2) * 0.04;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(380, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start(0);
        oscillatorRef.current = { whiteNoise, gainNode };
      } catch (err) {
        console.warn("Audio synthesis note:", err);
      }
    } else {
      if (oscillatorRef.current?.whiteNoise) {
        try {
          oscillatorRef.current.whiteNoise.stop();
        } catch (_) {}
      }
    }

    return () => {
      if (oscillatorRef.current?.whiteNoise) {
        try {
          oscillatorRef.current.whiteNoise.stop();
        } catch (_) {}
      }
    };
  }, [soundEnabled]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "#090d16",
        display: "flex",
        flexDirection: "column",
        userSelect: "none"
      }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Top Controls Bar */}
      <div
        style={{
          padding: "16px 24px",
          background: "rgba(15, 23, 42, 0.9)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#ffffff"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #d97706, #fbbf24)",
              color: "#0f172a",
              fontWeight: 800,
              fontSize: "0.78rem",
              letterSpacing: "0.5px"
            }}
          >
            3D SPATIAL STUDIO
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 800 }}>
              {property?.title || "Luxury Sky Residence"}
            </h3>
            <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
              {currentElevation.roomTitle} • {currentElevation.height}
            </span>
          </div>
        </div>

        {/* Action icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Audio toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            style={{
              background: soundEnabled ? "rgba(245, 158, 11, 0.2)" : "rgba(255, 255, 255, 0.1)",
              border: `1px solid ${soundEnabled ? "#f59e0b" : "rgba(255, 255, 255, 0.2)"}`,
              color: soundEnabled ? "#fbbf24" : "#ffffff",
              borderRadius: "8px",
              padding: "8px 14px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.82rem",
              fontWeight: 700
            }}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{soundEnabled ? "Atmosphere Sound ON" : "Mute Sound"}</span>
          </button>

          {/* Reset angle */}
          <button
            onClick={() => setPanAngle(0)}
            title="Reset Pan Angle"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer"
            }}
          >
            <RotateCcw size={16} />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
              padding: "6px"
            }}
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Main 3D Panoramic Canvas Viewport */}
      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          cursor: isDragging.current ? "grabbing" : "grab",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000"
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        {/* Background panoramic image with live transform & time lighting filter */}
        <div
          style={{
            position: "absolute",
            inset: "-20%",
            backgroundImage: `url(${currentElevation.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `scale(1.15) translateX(${panAngle * 1.5}px)`,
            filter: currentTimeMode.filter,
            transition: "filter 0.5s ease-out, transform 0.05s linear",
            pointerEvents: "none"
          }}
        />

        {/* Ambient Dark Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
            pointerEvents: "none"
          }}
        />

        {/* Interactive Hotspots */}
        {hotspots.map((spot, idx) => (
          <div
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedHotspot(spot);
            }}
            style={{
              position: "absolute",
              left: `${spot.x}%`,
              top: `${spot.y}%`,
              transform: `translate(-50%, -50%) translateX(${panAngle * 0.8}px)`,
              cursor: "pointer",
              zIndex: 20
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(245, 158, 11, 0.35)",
                border: "2px solid #fbbf24",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "pulse 2s infinite",
                boxShadow: "0 0 20px rgba(245, 158, 11, 0.8)"
              }}
            >
              <Sparkles size={16} color="#ffffff" />
            </div>
            <div
              style={{
                background: "rgba(15, 23, 42, 0.85)",
                backdropFilter: "blur(6px)",
                color: "#ffffff",
                fontSize: "0.72rem",
                padding: "4px 8px",
                borderRadius: "4px",
                whiteSpace: "nowrap",
                marginTop: "4px",
                border: "1px solid rgba(255,255,255,0.2)"
              }}
            >
              {spot.label}
            </div>
          </div>
        ))}

        {/* Hotspot detail popup */}
        {selectedHotspot && (
          <div
            style={{
              position: "absolute",
              bottom: "100px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(15, 23, 42, 0.95)",
              border: "1px solid var(--accent-gold)",
              borderRadius: "var(--radius-lg)",
              padding: "16px 20px",
              color: "#ffffff",
              maxWidth: "400px",
              zIndex: 50,
              boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "14px"
            }}
          >
            <div>
              <strong style={{ color: "#fbbf24", fontSize: "0.9rem", display: "block" }}>
                {selectedHotspot.label}
              </strong>
              <span style={{ fontSize: "0.78rem", color: "#cbd5e1" }}>
                {selectedHotspot.spec}
              </span>
            </div>
            <button
              onClick={() => setSelectedHotspot(null)}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: "50%",
                color: "#ffffff",
                cursor: "pointer",
                padding: "4px"
              }}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* 360 Drag Compass Hint */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(6px)",
            padding: "8px 14px",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#ffffff",
            fontSize: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            pointerEvents: "none"
          }}
        >
          <Compass size={16} color="#fbbf24" />
          <span>Click & Drag to Pan 360° ({panAngle > 0 ? `+${Math.round(panAngle)}°` : `${Math.round(panAngle)}°`})</span>
        </div>
      </div>

      {/* Bottom Floating Control Deck: Elevation & Sun Lighting */}
      <div
        style={{
          padding: "18px 24px",
          background: "rgba(15, 23, 42, 0.95)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          color: "#ffffff"
        }}
      >
        {/* Left: Floor Elevation Switcher */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Layers size={18} color="#fbbf24" />
          <span style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", color: "#94a3b8" }}>
            Floor Elevation:
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            {elevations.map((elv, idx) => (
              <button
                key={elv.id}
                onClick={() => setActiveElevation(idx)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: `1px solid ${activeElevation === idx ? "#fbbf24" : "rgba(255,255,255,0.2)"}`,
                  background: activeElevation === idx ? "rgba(245, 158, 11, 0.25)" : "rgba(255,255,255,0.05)",
                  color: activeElevation === idx ? "#fbbf24" : "#ffffff",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                {elv.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Sunlight / Time of Day Mode */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Sun size={18} color="#f59e0b" />
          <span style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", color: "#94a3b8" }}>
            Natural Daylight:
          </span>
          <div style={{ display: "flex", gap: "6px" }}>
            {timeModes.map((tm, idx) => (
              <button
                key={tm.id}
                onClick={() => setActiveTimeIndex(idx)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: `1px solid ${activeTimeIndex === idx ? "#3b82f6" : "rgba(255,255,255,0.2)"}`,
                  background: activeTimeIndex === idx ? "rgba(59, 130, 246, 0.25)" : "rgba(255,255,255,0.05)",
                  color: activeTimeIndex === idx ? "#60a5fa" : "#ffffff",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                {tm.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpatialStudioModal;
