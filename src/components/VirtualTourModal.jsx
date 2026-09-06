import React, { useState, useRef } from "react";
import { X, Eye, Compass, Maximize, RotateCcw, Info, CheckCircle2 } from "lucide-react";

export const VirtualTourModal = ({ property, onClose }) => {
  const rooms = [
    {
      id: "living",
      name: "Living Lounge",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      hotspots: [
        { x: 35, y: 55, title: "Italian Botticino Marble Flooring" },
        { x: 72, y: 38, title: "Soaring 14-ft Double Height Ceiling" },
        { x: 50, y: 80, title: "Centralized Climate Control AC" }
      ]
    },
    {
      id: "bedroom",
      name: "Master Suite",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85",
      hotspots: [
        { x: 40, y: 60, title: "King Size Ergonomic Teak Bed" },
        { x: 80, y: 45, title: "Floor-to-Ceiling Balcony Glazing" }
      ]
    },
    {
      id: "kitchen",
      name: "Modular Kitchen",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85",
      hotspots: [
        { x: 45, y: 50, title: "Quartz Countertop & Island Hob" },
        { x: 65, y: 35, title: "Bespoke German Soft-close Cabinets" }
      ]
    },
    {
      id: "pool",
      name: "Pool Deck",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
      hotspots: [
        { x: 50, y: 65, title: "Temperature Controlled Plunge Pool" },
        { x: 25, y: 40, title: "Wooden Sun Deck Pergola" }
      ]
    }
  ];

  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [panOffset, setPanOffset] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const activeRoom = rooms[activeRoomIndex];

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX - panOffset;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const newOffset = e.clientX - startX.current;
    // Limit pan range
    if (newOffset > -200 && newOffset < 200) {
      setPanOffset(newOffset);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(11, 17, 32, 0.94)",
        backdropFilter: "blur(10px)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column"
      }}
      onMouseUp={handleMouseUp}
    >
      {/* Top Controls Bar */}
      <div
        style={{
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          color: "#ffffff"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              padding: "6px 12px",
              background: "var(--accent-primary)",
              borderRadius: "var(--radius-full)",
              fontSize: "0.8rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <Compass size={15} />
            <span>360° VIRTUAL WALKTHROUGH</span>
          </div>
          <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>{property.title}</span>
        </div>

        {/* Room Switcher Pills */}
        <div style={{ display: "flex", gap: "8px", background: "rgba(255,255,255,0.1)", padding: "4px", borderRadius: "var(--radius-full)" }}>
          {rooms.map((room, idx) => (
            <button
              key={room.id}
              onClick={() => {
                setActiveRoomIndex(idx);
                setActiveHotspot(null);
                setPanOffset(0);
              }}
              style={{
                padding: "6px 16px",
                borderRadius: "var(--radius-full)",
                fontSize: "0.85rem",
                fontWeight: 600,
                background: activeRoomIndex === idx ? "var(--accent-primary)" : "transparent",
                color: "#ffffff",
                transition: "all 0.2s"
              }}
            >
              {room.name}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="btn-icon"
          style={{ background: "rgba(255,255,255,0.15)", color: "#ffffff", border: "none" }}
          aria-label="Close virtual tour"
        >
          <X size={20} />
        </button>
      </div>

      {/* 360 Viewport */}
      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          cursor: "grab",
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <img
          src={activeRoom.image}
          alt={activeRoom.name}
          style={{
            position: "absolute",
            width: "120%",
            height: "100%",
            objectFit: "cover",
            transform: `translateX(${panOffset}px) scale(1.05)`,
            transition: isDragging.current ? "none" : "transform 0.4s ease-out"
          }}
          draggable="false"
        />

        {/* Interactive Pulsing Hotspots */}
        {activeRoom.hotspots.map((h, i) => (
          <div
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setActiveHotspot(h);
            }}
            style={{
              position: "absolute",
              top: `${h.y}%`,
              left: `calc(${h.x}% + ${panOffset * 0.7}px)`,
              transform: "translate(-50%, -50%)",
              zIndex: 20,
              cursor: "pointer"
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "rgba(37, 99, 235, 0.8)",
                border: "2px solid #ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)",
                animation: "pulseGlow 2s infinite"
              }}
            >
              <Info size={16} color="#ffffff" />
            </div>
          </div>
        ))}

        {/* Hotspot Popup Detail */}
        {activeHotspot && (
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              background: "rgba(15, 23, 42, 0.9)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#ffffff",
              padding: "16px 20px",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: "var(--shadow-lg)",
              zIndex: 30
            }}
            className="animate-fade-in"
          >
            <CheckCircle2 size={20} color="var(--accent-emerald)" />
            <div>
              <span style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase" }}>
                Feature Highlight
              </span>
              <h4 style={{ fontSize: "1rem", margin: "2px 0 0", color: "#ffffff" }}>
                {activeHotspot.title}
              </h4>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              style={{ color: "#94a3b8", marginLeft: "10px" }}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Drag Helper Notice */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            background: "rgba(0,0,0,0.6)",
            color: "#ffffff",
            padding: "6px 14px",
            borderRadius: "var(--radius-full)",
            fontSize: "0.8rem",
            pointerEvents: "none"
          }}
        >
          ↔ Drag mouse horizontally to pan 360° room view
        </div>
      </div>
    </div>
  );
};

export default VirtualTourModal;
