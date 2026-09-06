import React, { useState } from "react";
import { Plane, Train, Hospital, GraduationCap, ShoppingBag, Briefcase, Car, Footprints, Bus } from "lucide-react";

export const NeighborhoodRadar = ({ city = "Chandigarh" }) => {
  const [travelMode, setTravelMode] = useState("car"); // 'car' | 'walk' | 'transit'

  const landmarks = [
    {
      id: "airport",
      name: "International Airport",
      icon: <Plane size={18} color="var(--accent-primary)" />,
      carTime: "12 mins (8.4 km)",
      walkTime: "1 hr 40 mins",
      transitTime: "25 mins (Bus 204)"
    },
    {
      id: "metro",
      name: "Rapid Metro / Central Transit Station",
      icon: <Train size={18} color="var(--accent-emerald)" />,
      carTime: "4 mins (1.8 km)",
      walkTime: "15 mins",
      transitTime: "8 mins"
    },
    {
      id: "hospital",
      name: "Fortis / Apollo Multi-Specialty Hospital",
      icon: <Hospital size={18} color="var(--accent-rose)" />,
      carTime: "6 mins (3.2 km)",
      walkTime: "30 mins",
      transitTime: "14 mins"
    },
    {
      id: "school",
      name: "Delhi Public / British International School",
      icon: <GraduationCap size={18} color="var(--accent-gold)" />,
      carTime: "5 mins (2.5 km)",
      walkTime: "22 mins",
      transitTime: "10 mins"
    },
    {
      id: "mall",
      name: "City Center Shopping & Entertainment Mall",
      icon: <ShoppingBag size={18} color="#8b5cf6" />,
      carTime: "8 mins (4.1 km)",
      walkTime: "45 mins",
      transitTime: "18 mins"
    },
    {
      id: "itpark",
      name: "Rajiv Gandhi IT Park / DLF Cyber City",
      icon: <Briefcase size={18} color="#06b6d4" />,
      carTime: "10 mins (6.0 km)",
      walkTime: "1 hr 10 mins",
      transitTime: "22 mins"
    }
  ];

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-lg)",
        padding: "28px",
        boxShadow: "var(--shadow-sm)"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "14px"
        }}
      >
        <div>
          <h3 style={{ fontSize: "1.25rem", margin: 0 }}>Hyperlocal Neighborhood & Connectivity</h3>
          <p style={{ fontSize: "0.85rem", margin: 0, color: "var(--text-secondary)" }}>
            Real-time travel times from this property to essential civic hubs
          </p>
        </div>

        {/* Travel Mode Toggle */}
        <div style={{ display: "flex", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", padding: "3px" }}>
          <button
            onClick={() => setTravelMode("car")}
            className={`btn-sm ${travelMode === "car" ? "btn-primary" : ""}`}
            style={{ padding: "4px 10px", fontSize: "0.8rem", gap: "4px" }}
          >
            <Car size={14} />
            <span>Drive</span>
          </button>
          <button
            onClick={() => setTravelMode("transit")}
            className={`btn-sm ${travelMode === "transit" ? "btn-primary" : ""}`}
            style={{ padding: "4px 10px", fontSize: "0.8rem", gap: "4px" }}
          >
            <Bus size={14} />
            <span>Transit</span>
          </button>
          <button
            onClick={() => setTravelMode("walk")}
            className={`btn-sm ${travelMode === "walk" ? "btn-primary" : ""}`}
            style={{ padding: "4px 10px", fontSize: "0.8rem", gap: "4px" }}
          >
            <Footprints size={14} />
            <span>Walk</span>
          </button>
        </div>
      </div>

      {/* Grid of Landmarks */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "14px"
        }}
      >
        {landmarks.map((landmark) => {
          const displayTime =
            travelMode === "car"
              ? landmark.carTime
              : travelMode === "transit"
              ? landmark.transitTime
              : landmark.walkTime;

          return (
            <div
              key={landmark.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px",
                borderRadius: "var(--radius-md)",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-light)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "var(--bg-surface)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "var(--shadow-xs)"
                  }}
                >
                  {landmark.icon}
                </div>
                <strong style={{ fontSize: "0.88rem", color: "var(--text-primary)" }}>
                  {landmark.name}
                </strong>
              </div>

              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--accent-primary)",
                  whiteSpace: "nowrap",
                  marginLeft: "8px"
                }}
              >
                {displayTime}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NeighborhoodRadar;
