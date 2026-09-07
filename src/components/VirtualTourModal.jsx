import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Eye,
  Compass,
  Maximize2,
  Minimize2,
  RotateCcw,
  Info,
  CheckCircle2,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Sparkles
} from "lucide-react";
import { playClickSound } from "../utils/effects";

export const VirtualTourModal = ({ property, onClose }) => {
  const rooms = [
    {
      id: "living",
      name: "Living Lounge",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
      hotspots: [
        { x: 35, y: 55, title: "Italian Botticino Marble Flooring", desc: "Handcrafted Italian slabs with high-gloss mirror finish." },
        { x: 72, y: 38, title: "Soaring 14-ft Double Height Ceiling", desc: "Acoustically tuned with recessed ambient recessed LEDs." },
        { x: 50, y: 80, title: "Centralized Climate Control AC", desc: "Daikin VRV smart 4-zone energy-efficient cooling." }
      ]
    },
    {
      id: "bedroom",
      name: "Master Suite",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=85",
      hotspots: [
        { x: 40, y: 60, title: "King Size Ergonomic Teak Bed", desc: "Solid teak wood with luxury orthopedic posture bedding." },
        { x: 80, y: 45, title: "Floor-to-Ceiling Balcony Glazing", desc: "Soundproof German Schuco sliding panoramic glass." }
      ]
    },
    {
      id: "kitchen",
      name: "Modular Kitchen",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1800&q=85",
      hotspots: [
        { x: 45, y: 50, title: "Quartz Countertop & Island Hob", desc: "Heat-proof anti-stain Caesarstone quartz slab." },
        { x: 65, y: 35, title: "Bespoke German Soft-close Cabinets", desc: "Blum fittings with matte charcoal acrylic shutters." }
      ]
    },
    {
      id: "pool",
      name: "Pool Deck",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85",
      hotspots: [
        { x: 50, y: 65, title: "Temperature Controlled Plunge Pool", desc: "Ozone treated crystal clear infinity rim edge." },
        { x: 25, y: 40, title: "Wooden Sun Deck Pergola", desc: "Weatherproof Brazilian Ipe timber deck." }
      ]
    }
  ];

  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);

  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startAngles = useRef({ yaw: 0, pitch: 0 });
  const spinTimer = useRef(null);

  const activeRoom = rooms[activeRoomIndex];

  // Auto-spin logic
  useEffect(() => {
    if (isAutoSpinning) {
      spinTimer.current = setInterval(() => {
        setYaw((prev) => {
          let next = prev + 0.5;
          if (next > 180) next = -180;
          return next;
        });
      }, 30);
    } else {
      if (spinTimer.current) clearInterval(spinTimer.current);
    }
    return () => {
      if (spinTimer.current) clearInterval(spinTimer.current);
    };
  }, [isAutoSpinning]);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    startPos.current = { x: clientX, y: clientY };
    startAngles.current = { yaw, pitch };
    if (isAutoSpinning) setIsAutoSpinning(false);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;

    const sensitivity = 0.4 / zoom;
    let newYaw = startAngles.current.yaw + deltaX * sensitivity;
    let newPitch = startAngles.current.pitch - deltaY * sensitivity;

    newPitch = Math.max(-25, Math.min(25, newPitch));
    if (newYaw > 180) newYaw -= 360;
    if (newYaw < -180) newYaw += 360;

    setYaw(newYaw);
    setPitch(newPitch);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleReset = () => {
    playClickSound();
    setYaw(0);
    setPitch(0);
    setZoom(1);
    setIsAutoSpinning(false);
    setActiveHotspot(null);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(8, 12, 20, 0.96)",
        backdropFilter: "blur(14px)",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        userSelect: "none"
      }}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Top Controls Bar */}
      <div
        style={{
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#ffffff",
          flexWrap: "wrap",
          gap: "12px",
          background: "rgba(11, 17, 32, 0.85)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              padding: "6px 14px",
              background: "linear-gradient(135deg, #d4af37, #f59e0b)",
              borderRadius: "var(--radius-full)",
              fontSize: "0.78rem",
              fontWeight: 800,
              color: "#0f172a",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <Compass size={15} />
            <span>360° 3D ROTATION TOUR</span>
          </div>
          <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f8fafc" }}>
            {property?.title || "Luxury Residence"}
          </span>
        </div>

        {/* Room Switcher Pills */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            background: "rgba(255,255,255,0.08)",
            padding: "4px",
            borderRadius: "var(--radius-full)",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}
        >
          {rooms.map((room, idx) => (
            <button
              key={room.id}
              onClick={() => {
                playClickSound();
                setActiveRoomIndex(idx);
                setActiveHotspot(null);
                setYaw(0);
                setPitch(0);
              }}
              style={{
                padding: "6px 16px",
                borderRadius: "var(--radius-full)",
                fontSize: "0.82rem",
                fontWeight: 700,
                border: "none",
                background: activeRoomIndex === idx ? "var(--accent-primary)" : "transparent",
                color: "#ffffff",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {room.name}
            </button>
          ))}
        </div>

        {/* Right Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Compass Telemetry */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255, 255, 255, 0.06)",
              padding: "5px 12px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.75rem",
              fontFamily: "monospace",
              color: "#94a3b8"
            }}
          >
            <span>YAW: <strong style={{ color: "#d4af37" }}>{Math.round(yaw)}°</strong></span>
            <span>PITCH: <strong style={{ color: "#38bdf8" }}>{Math.round(pitch)}°</strong></span>
            <span>ZOOM: <strong style={{ color: "#10b981" }}>{zoom}x</strong></span>
          </div>

          <button
            onClick={() => {
              playClickSound();
              setIsAutoSpinning(!isAutoSpinning);
            }}
            style={{
              padding: "6px 12px",
              borderRadius: "var(--radius-full)",
              background: isAutoSpinning ? "rgba(212, 175, 55, 0.3)" : "rgba(255,255,255,0.08)",
              border: isAutoSpinning ? "1px solid #d4af37" : "1px solid rgba(255,255,255,0.15)",
              color: isAutoSpinning ? "#f59e0b" : "#ffffff",
              fontSize: "0.78rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer"
            }}
          >
            {isAutoSpinning ? <Pause size={14} /> : <Play size={14} />}
            <span>{isAutoSpinning ? "Spinning" : "Auto Spin"}</span>
          </button>

          <button
            onClick={handleReset}
            style={{
              padding: "6px 10px",
              borderRadius: "var(--radius-full)",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#ffffff",
              fontSize: "0.78rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
            title="Reset Angle"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>

          <button
            onClick={onClose}
            className="btn-icon"
            style={{ background: "rgba(255,255,255,0.15)", color: "#ffffff", border: "none", cursor: "pointer" }}
            aria-label="Close virtual tour"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* 360 Viewport */}
      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          cursor: isDragging.current ? "grabbing" : "grab",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "1200px"
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        {/* Cylindrical 3D Room Image */}
        <div
          style={{
            position: "relative",
            width: "92%",
            height: "85%",
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            boxShadow: "0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(212, 175, 55, 0.2)",
            transform: `perspective(1000px) rotateY(${yaw}deg) rotateX(${-pitch}deg) scale(${zoom})`,
            transition: isDragging.current ? "none" : "transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)",
            transformStyle: "preserve-3d"
          }}
        >
          <img
            src={activeRoom.image}
            alt={activeRoom.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none"
            }}
            draggable="false"
          />

          {/* Dynamic Lighting Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at ${50 + (yaw / 180) * 40}% ${50 + (pitch / 25) * 30}%, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0.35) 75%)`,
              pointerEvents: "none",
              mixBlendMode: "overlay"
            }}
          />

          {/* Interactive Pulsing Hotspots */}
          {activeRoom.hotspots.map((h, i) => (
            <div
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                playClickSound();
                setActiveHotspot(activeHotspot?.title === h.title ? null : h);
              }}
              style={{
                position: "absolute",
                top: `${h.y}%`,
                left: `${h.x}%`,
                transform: "translate(-50%, -50%)",
                zIndex: 20,
                cursor: "pointer"
              }}
            >
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #d4af37, #f59e0b)",
                  border: "2px solid #ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 25px rgba(212, 175, 55, 0.9)",
                  animation: "pulseGlow 2s infinite"
                }}
                title={h.title}
              >
                <Sparkles size={16} color="#0f172a" />
              </div>
            </div>
          ))}
        </div>

        {/* Hotspot Popup Detail */}
        {activeHotspot && (
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              background: "rgba(11, 17, 32, 0.95)",
              backdropFilter: "blur(14px)",
              border: "1px solid #d4af37",
              color: "#ffffff",
              padding: "16px 22px",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "flex-start",
              gap: "14px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.8)",
              zIndex: 35,
              maxWidth: "420px"
            }}
          >
            <CheckCircle2 size={22} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "0.72rem", color: "#d4af37", fontWeight: 800, textTransform: "uppercase" }}>
                Architectural Highlight
              </span>
              <h4 style={{ fontSize: "1.05rem", margin: "2px 0 6px", color: "#ffffff" }}>
                {activeHotspot.title}
              </h4>
              <p style={{ fontSize: "0.82rem", margin: 0, color: "#cbd5e1", lineHeight: 1.4 }}>
                {activeHotspot.desc}
              </p>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              style={{
                color: "#94a3b8",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px"
              }}
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Drag Helper Notice */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            background: "rgba(8, 12, 20, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: "#e2e8f0",
            padding: "8px 18px",
            borderRadius: "var(--radius-full)",
            fontSize: "0.8rem",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <Compass size={15} color="#d4af37" />
          <span>Click & Drag to rotate 360° • Tilt up/down • Click golden pins to inspect</span>
        </div>

        {/* Floating Zoom Controls */}
        <div
          style={{
            position: "absolute",
            right: "24px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            zIndex: 30
          }}
        >
          <button
            onClick={() => {
              playClickSound();
              setZoom((prev) => Math.min(2.5, +(prev + 0.25).toFixed(2)));
            }}
            disabled={zoom >= 2.5}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: zoom >= 2.5 ? "not-allowed" : "pointer",
              opacity: zoom >= 2.5 ? 0.5 : 1
            }}
            title="Zoom In"
          >
            <ZoomIn size={18} />
          </button>

          <button
            onClick={() => {
              playClickSound();
              setZoom((prev) => Math.max(1, +(prev - 0.25).toFixed(2)));
            }}
            disabled={zoom <= 1}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: zoom <= 1 ? "not-allowed" : "pointer",
              opacity: zoom <= 1 ? 0.5 : 1
            }}
            title="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VirtualTourModal;
