import React, { useState, useRef, useEffect } from "react";
import {
  RotateCcw,
  Compass,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Eye,
  Info,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { playClickSound } from "../utils/effects";

export const Interactive3DPhotoRotator = ({ property, initialImageIndex = 0 }) => {
  const images = property?.images && property.images.length > 0 ? property.images : [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
  ];

  const [activeIdx, setActiveIdx] = useState(initialImageIndex);
  const [yaw, setYaw] = useState(0); // -180 to 180 degrees
  const [pitch, setPitch] = useState(0); // -25 to 25 degrees
  const [zoom, setZoom] = useState(1); // 1 to 2.5
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [spinSpeed, setSpinSpeed] = useState(1);

  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startAngles = useRef({ yaw: 0, pitch: 0 });
  const autoSpinTimer = useRef(null);

  // Sync initial index if prop changes
  useEffect(() => {
    setActiveIdx(initialImageIndex);
  }, [initialImageIndex]);

  // Architectural inspection hotspots with 3D offset multipliers
  const inspectionHotspots = [
    {
      id: "facade",
      title: "Anti-Seismic Structural Grade",
      desc: "Earthquake-resistant reinforced M40 concrete structure with RERA verification.",
      x: 32,
      y: 40,
      tag: "RERA Certified"
    },
    {
      id: "vastu",
      title: "Vastu Ishanya North-East Alignment",
      desc: "Optimal solar energy capture and morning natural illumination corridor.",
      x: 68,
      y: 30,
      tag: "Vastu 100%"
    },
    {
      id: "glazing",
      title: "Double-Glazed Low-E Glass",
      desc: "Soundproof acoustic glazing cutting exterior decibels by 85% with UV heat shields.",
      x: 50,
      y: 65,
      tag: "Acoustic Shield"
    },
    {
      id: "finish",
      title: "Italian Marble & Teak Finish",
      desc: "Imported Botticino polished flooring with zero-scratch resin coating.",
      x: 22,
      y: 75,
      tag: "Ultra Luxury"
    }
  ];

  // Preset camera inspection angles
  const presetAngles = [
    { label: "Front Facade (0°)", y: 0, p: 0 },
    { label: "NE Vastu Isometric (45°)", y: 45, p: 10 },
    { label: "East Wing (90°)", y: 90, p: 0 },
    { label: "Panoramic Deck (180°)", y: 180, p: 5 },
    { label: "Aerial Bird-Eye (Top Tilt)", y: 25, p: -22 }
  ];

  // Auto-Spin animation loop
  useEffect(() => {
    if (isAutoSpinning) {
      autoSpinTimer.current = setInterval(() => {
        setYaw((prev) => {
          let next = prev + 0.6 * spinSpeed;
          if (next > 180) next = -180;
          return next;
        });
      }, 30);
    } else {
      if (autoSpinTimer.current) clearInterval(autoSpinTimer.current);
    }

    return () => {
      if (autoSpinTimer.current) clearInterval(autoSpinTimer.current);
    };
  }, [isAutoSpinning, spinSpeed]);

  // Mouse & Touch drag handlers
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

    // Convert pixels to rotation degrees
    const sensitivity = 0.45 / zoom;
    let newYaw = startAngles.current.yaw + deltaX * sensitivity;
    let newPitch = startAngles.current.pitch - deltaY * sensitivity;

    // Clamp pitch between -28 and +28 deg
    newPitch = Math.max(-28, Math.min(28, newPitch));

    // Wrap yaw around -180 to 180
    if (newYaw > 180) newYaw -= 360;
    if (newYaw < -180) newYaw += 360;

    setYaw(newYaw);
    setPitch(newPitch);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleResetOrientation = () => {
    playClickSound();
    setYaw(0);
    setPitch(0);
    setZoom(1);
    setIsAutoSpinning(false);
    setActiveHotspot(null);
  };

  const handleApplyPreset = (targetYaw, targetPitch) => {
    playClickSound();
    setIsAutoSpinning(false);
    setYaw(targetYaw);
    setPitch(targetPitch);
  };

  const handleZoom = (delta) => {
    playClickSound();
    setZoom((prev) => Math.max(1, Math.min(2.5, +(prev + delta).toFixed(1))));
  };

  const currentImg = images[activeIdx] || images[0];

  // Dynamic light reflection calculations based on yaw & pitch
  const lightReflectionX = 50 + (yaw / 180) * 40;
  const lightReflectionY = 50 + (pitch / 28) * 30;

  return (
    <div
      ref={containerRef}
      style={{
        position: isFullscreen ? "fixed" : "relative",
        inset: isFullscreen ? 0 : "auto",
        width: "100%",
        height: isFullscreen ? "100vh" : "560px",
        zIndex: isFullscreen ? 99999 : 1,
        background: "#080c14",
        borderRadius: isFullscreen ? 0 : "var(--radius-xl)",
        overflow: "hidden",
        border: "1px solid rgba(212, 175, 55, 0.3)",
        boxShadow: isFullscreen
          ? "none"
          : "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 175, 55, 0.15)",
        display: "flex",
        flexDirection: "column",
        userSelect: "none"
      }}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Top Pro-Header & Telemetry Strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          background: "linear-gradient(180deg, rgba(8, 12, 20, 0.95), rgba(8, 12, 20, 0.75))",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          zIndex: 20,
          flexWrap: "wrap",
          gap: "10px"
        }}
      >
        {/* Left: Badge and Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              padding: "4px 10px",
              borderRadius: "var(--radius-full)",
              background: "linear-gradient(135deg, #d4af37, #f59e0b)",
              color: "#0f172a",
              fontSize: "0.72rem",
              fontWeight: 900,
              letterSpacing: "0.5px",
              display: "flex",
              alignItems: "center",
              gap: "5px"
            }}
          >
            <Compass size={13} />
            <span>3D ROTATIONAL INSPECTION</span>
          </span>

          <span style={{ color: "#e2e8f0", fontSize: "0.85rem", fontWeight: 700 }}>
            {property?.title || "Signature Luxury Estate"}
          </span>
        </div>

        {/* Center: Live 3D Degrees Telemetry */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            background: "rgba(255, 255, 255, 0.05)",
            padding: "4px 14px",
            borderRadius: "var(--radius-full)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            fontSize: "0.75rem",
            fontFamily: "monospace",
            color: "#94a3b8"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#d4af37" }}>YAW:</span>
            <strong style={{ color: "#f8fafc" }}>{Math.round(yaw)}°</strong>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#38bdf8" }}>PITCH:</span>
            <strong style={{ color: "#f8fafc" }}>{Math.round(pitch)}°</strong>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{ color: "#10b981" }}>ZOOM:</span>
            <strong style={{ color: "#f8fafc" }}>{zoom}x</strong>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Auto Spin */}
          <button
            onClick={() => {
              playClickSound();
              setIsAutoSpinning(!isAutoSpinning);
            }}
            style={{
              padding: "6px 12px",
              borderRadius: "var(--radius-full)",
              background: isAutoSpinning ? "rgba(212, 175, 55, 0.25)" : "rgba(255, 255, 255, 0.08)",
              border: isAutoSpinning ? "1px solid #d4af37" : "1px solid rgba(255, 255, 255, 0.15)",
              color: isAutoSpinning ? "#f59e0b" : "#e2e8f0",
              fontSize: "0.75rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            title={isAutoSpinning ? "Pause auto-rotation" : "Auto-spin 360° continuously"}
          >
            {isAutoSpinning ? <Pause size={13} /> : <Play size={13} />}
            <span>{isAutoSpinning ? "Spinning" : "360° Auto-Spin"}</span>
          </button>

          {/* Hotspots Toggle */}
          <button
            onClick={() => {
              playClickSound();
              setShowHotspots(!showHotspots);
            }}
            style={{
              padding: "6px 10px",
              borderRadius: "var(--radius-full)",
              background: showHotspots ? "rgba(59, 130, 246, 0.2)" : "rgba(255, 255, 255, 0.08)",
              border: showHotspots ? "1px solid #3b82f6" : "1px solid rgba(255, 255, 255, 0.15)",
              color: showHotspots ? "#60a5fa" : "#94a3b8",
              fontSize: "0.75rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer"
            }}
            title="Toggle Architectural Detail Hotspots"
          >
            <Sparkles size={13} />
            <span>Hotspots</span>
          </button>

          {/* Reset Orientation */}
          <button
            onClick={handleResetOrientation}
            style={{
              padding: "6px 10px",
              borderRadius: "var(--radius-full)",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#cbd5e1",
              fontSize: "0.75rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer"
            }}
            title="Reset to 0° Center"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => {
              playClickSound();
              setIsFullscreen(!isFullscreen);
            }}
            style={{
              padding: "6px 10px",
              borderRadius: "var(--radius-full)",
              background: isFullscreen ? "rgba(239, 68, 68, 0.2)" : "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "0.75rem"
            }}
            title={isFullscreen ? "Exit Fullscreen" : "Inspect Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            <span>{isFullscreen ? "Close" : "Full Screen"}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Interactive Stage */}
      <div
        style={{
          position: "relative",
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          perspective: "1400px",
          cursor: isDragging.current ? "grabbing" : "grab",
          background: "radial-gradient(circle at center, #151d30 0%, #080c14 85%)"
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        {/* Subtle 3D Grid floor */}
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            width: "140%",
            height: "60%",
            background:
              "linear-gradient(rgba(212, 175, 55, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.12) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            transform: "rotateX(75deg)",
            transformOrigin: "bottom center",
            pointerEvents: "none",
            opacity: 0.6
          }}
        />

        {/* 3D Rotational Image Canvas Card */}
        <div
          style={{
            position: "relative",
            width: isFullscreen ? "80%" : "90%",
            height: isFullscreen ? "78%" : "82%",
            maxWidth: "1000px",
            maxHeight: "500px",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: `
              ${-yaw * 0.4}px ${15 + pitch * 0.4}px 45px rgba(0, 0, 0, 0.8),
              0 0 25px rgba(212, 175, 55, ${0.1 + Math.abs(yaw) / 900})
            `,
            transform: `
              perspective(1200px)
              rotateY(${yaw}deg)
              rotateX(${-pitch}deg)
              scale(${zoom})
            `,
            transition: isDragging.current ? "none" : "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
            transformStyle: "preserve-3d",
            willChange: "transform"
          }}
        >
          {/* Main Photo */}
          <img
            src={currentImg}
            alt={property?.title || "Property 3D View"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
              userSelect: "none"
            }}
          />

          {/* Dynamic 3D Specular Light Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at ${lightReflectionX}% ${lightReflectionY}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 65%)`,
              pointerEvents: "none",
              mixBlendMode: "overlay"
            }}
          />

          {/* Dynamic Vignette & Depth border */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              border: "1px solid rgba(212, 175, 55, 0.4)",
              borderRadius: "inherit",
              pointerEvents: "none",
              boxShadow: "inset 0 0 40px rgba(0,0,0,0.4)"
            }}
          />

          {/* Interactive Inspection Hotspots (projected onto the image surface) */}
          {showHotspots &&
            inspectionHotspots.map((h) => {
              // Hotspots slightly shift with yaw & pitch for 3D parallax feel
              const offsetX = ((yaw / 180) * 8).toFixed(1);
              const offsetY = ((-pitch / 28) * 6).toFixed(1);

              return (
                <div
                  key={h.id}
                  style={{
                    position: "absolute",
                    left: `calc(${h.x}% + ${offsetX}px)`,
                    top: `calc(${h.y}% + ${offsetY}px)`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 25,
                    pointerEvents: "auto"
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    playClickSound();
                    setActiveHotspot(activeHotspot?.id === h.id ? null : h);
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "rgba(212, 175, 55, 0.9)",
                      boxShadow: "0 0 20px rgba(212, 175, 55, 0.9), 0 0 0 4px rgba(0,0,0,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      animation: "pulse 2s infinite"
                    }}
                    title={h.title}
                  >
                    <Sparkles size={16} color="#0f172a" />
                  </div>

                  {/* Hotspot Card Popover */}
                  {activeHotspot?.id === h.id && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "40px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "240px",
                        background: "rgba(11, 17, 32, 0.95)",
                        backdropFilter: "blur(14px)",
                        border: "1px solid #d4af37",
                        borderRadius: "var(--radius-md)",
                        padding: "12px",
                        color: "#ffffff",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                        pointerEvents: "auto"
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "6px"
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.68rem",
                            padding: "2px 6px",
                            borderRadius: "var(--radius-full)",
                            background: "rgba(212, 175, 55, 0.2)",
                            color: "#d4af37",
                            fontWeight: 800
                          }}
                        >
                          {h.tag}
                        </span>
                        <button
                          onClick={() => setActiveHotspot(null)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#94a3b8",
                            cursor: "pointer",
                            fontSize: "0.8rem"
                          }}
                        >
                          ✕
                        </button>
                      </div>
                      <h4 style={{ fontSize: "0.85rem", fontWeight: 700, margin: "0 0 4px", color: "#f8fafc" }}>
                        {h.title}
                      </h4>
                      <p style={{ fontSize: "0.75rem", margin: 0, color: "#cbd5e1", lineHeight: 1.4 }}>
                        {h.desc}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Drag Hint Overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(8, 12, 20, 0.8)",
            backdropFilter: "blur(8px)",
            padding: "6px 14px",
            borderRadius: "var(--radius-full)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            fontSize: "0.75rem",
            color: "#cbd5e1",
            display: "flex",
            alignItems: "center",
            gap: "7px",
            pointerEvents: "none",
            zIndex: 15
          }}
        >
          <Compass size={14} color="#d4af37" />
          <span>Click & Drag to rotate photo in 3D orbit • Pinch or scroll to zoom</span>
        </div>

        {/* Floating Zoom Controls on Right */}
        <div
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            zIndex: 20
          }}
        >
          <button
            onClick={() => handleZoom(0.25)}
            disabled={zoom >= 2.5}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "rgba(15, 23, 42, 0.85)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: zoom >= 2.5 ? "not-allowed" : "pointer",
              opacity: zoom >= 2.5 ? 0.5 : 1,
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
            }}
            title="Zoom In"
          >
            <ZoomIn size={17} />
          </button>

          <button
            onClick={() => handleZoom(-0.25)}
            disabled={zoom <= 1}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              background: "rgba(15, 23, 42, 0.85)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: zoom <= 1 ? "not-allowed" : "pointer",
              opacity: zoom <= 1 ? 0.5 : 1,
              boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
            }}
            title="Zoom Out"
          >
            <ZoomOut size={17} />
          </button>
        </div>
      </div>

      {/* Bottom Architectural Presets & Photo Selector Bar */}
      <div
        style={{
          padding: "12px 18px",
          background: "linear-gradient(0deg, rgba(8, 12, 20, 0.98), rgba(8, 12, 20, 0.85))",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 20
        }}
      >
        {/* Preset Angle Buttons Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 800,
                color: "#d4af37",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginRight: "4px"
              }}
            >
              Angle Presets:
            </span>

            {presetAngles.map((p, i) => {
              const isMatch = Math.round(yaw) === p.y && Math.round(pitch) === p.p;
              return (
                <button
                  key={i}
                  onClick={() => handleApplyPreset(p.y, p.p)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "var(--radius-full)",
                    background: isMatch ? "rgba(212, 175, 55, 0.25)" : "rgba(255, 255, 255, 0.06)",
                    border: isMatch ? "1px solid #d4af37" : "1px solid rgba(255, 255, 255, 0.1)",
                    color: isMatch ? "#f59e0b" : "#cbd5e1",
                    fontSize: "0.73rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Quick Photo Counter & Info */}
          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
            Viewing angle of photo <strong style={{ color: "#ffffff" }}>{activeIdx + 1}</strong> of{" "}
            <strong style={{ color: "#ffffff" }}>{images.length}</strong>
          </div>
        </div>

        {/* Thumbnail Strip to rotate other pictures of the property */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            paddingBottom: "4px"
          }}
        >
          {images.map((imgUrl, idx) => (
            <div
              key={idx}
              onClick={() => {
                playClickSound();
                setActiveIdx(idx);
                setActiveHotspot(null);
              }}
              style={{
                width: "80px",
                height: "52px",
                borderRadius: "var(--radius-sm)",
                overflow: "hidden",
                cursor: "pointer",
                border: activeIdx === idx ? "2px solid #d4af37" : "1px solid rgba(255, 255, 255, 0.15)",
                opacity: activeIdx === idx ? 1 : 0.6,
                transform: activeIdx === idx ? "scale(1.04)" : "scale(1)",
                transition: "all 0.2s ease",
                flexShrink: 0,
                position: "relative"
              }}
              title={`Switch to Photo ${idx + 1} for 3D rotation`}
            >
              <img
                src={imgUrl}
                alt={`Angle ${idx + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {activeIdx === idx && (
                <div
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#d4af37"
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interactive3DPhotoRotator;
