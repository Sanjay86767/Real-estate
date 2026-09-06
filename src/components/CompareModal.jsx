import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import {
  X,
  Scale,
  Check,
  Minus,
  Trash2,
  ExternalLink,
  ChevronUp,
  Bed,
  Bath,
  Maximize2
} from "lucide-react";

export const CompareModal = () => {
  const { properties, compareList, toggleCompare, clearCompare, formatPrice, formatArea } = usePropertyContext();
  const [isOpen, setIsOpen] = useState(false);

  if (!compareList || compareList.length === 0) return null;

  const compareProperties = properties.filter((p) => compareList.includes(p.id));

  const allAmenities = [
    "Swimming Pool",
    "Gym & Fitness Suite",
    "Private Garden",
    "Power Backup",
    "24/7 Security",
    "Smart Home Automation",
    "Clubhouse Access",
    "Car Parking"
  ];

  return (
    <>
      {/* Floating Bottom Compare Bar */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 900,
          background: "var(--bg-surface-elevated)",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-full)",
          padding: "10px 24px",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          alignItems: "center",
          gap: "18px"
        }}
        className="animate-fade-in"
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "var(--accent-primary)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Scale size={15} />
          </div>
          <span style={{ fontSize: "0.9rem", fontWeight: 700 }}>
            Compare ({compareProperties.length}/3)
          </span>
        </div>

        {/* Thumbnails */}
        <div style={{ display: "flex", gap: "6px" }}>
          {compareProperties.map((p) => (
            <div
              key={p.id}
              style={{
                position: "relative",
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid var(--accent-primary)"
              }}
              title={p.title}
            >
              <img src={p.images[0]} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-primary btn-sm"
          style={{ padding: "6px 16px", fontSize: "0.85rem", gap: "6px" }}
        >
          <span>Compare Now</span>
          <ChevronUp size={15} />
        </button>

        <button
          onClick={clearCompare}
          className="btn-icon"
          style={{ width: "30px", height: "30px" }}
          title="Clear Compare"
          aria-label="Clear Compare"
        >
          <Trash2 size={14} color="var(--accent-rose)" />
        </button>
      </div>

      {/* Comparison Fullscreen Modal */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              background: "var(--bg-surface)",
              borderRadius: "var(--radius-lg)",
              maxWidth: "1050px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "var(--shadow-lg)",
              padding: "32px",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Scale size={24} color="var(--accent-primary)" />
                <h2 style={{ fontSize: "1.6rem", margin: 0 }}>Side-by-Side Property Comparison</h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="btn-icon" aria-label="Close modal">
                <X size={20} />
              </button>
            </div>

            {/* Comparison Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border-light)" }}>
                    <th style={{ padding: "16px", width: "180px", color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase" }}>
                      Feature
                    </th>
                    {compareProperties.map((prop) => (
                      <th key={prop.id} style={{ padding: "16px", minWidth: "240px", verticalAlign: "top" }}>
                        <div style={{ position: "relative", marginBottom: "10px" }}>
                          <img
                            src={prop.images[0]}
                            alt={prop.title}
                            style={{ width: "100%", height: "130px", objectFit: "cover", borderRadius: "var(--radius-md)" }}
                          />
                          <button
                            onClick={() => toggleCompare(prop.id)}
                            style={{
                              position: "absolute",
                              top: "6px",
                              right: "6px",
                              background: "rgba(0,0,0,0.6)",
                              color: "#ffffff",
                              borderRadius: "50%",
                              width: "24px",
                              height: "24px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                            title="Remove from compare"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <h4 style={{ fontSize: "1rem", marginBottom: "4px" }}>{prop.title}</h4>
                        <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--accent-primary)" }}>
                          {formatPrice(prop.price)}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-secondary)" }}>Location</td>
                    {compareProperties.map((p) => (
                      <td key={p.id} style={{ padding: "12px 16px" }}>{p.location}</td>
                    ))}
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-secondary)" }}>Property Type</td>
                    {compareProperties.map((p) => (
                      <td key={p.id} style={{ padding: "12px 16px" }}>
                        <span className="badge badge-type">{p.type}</span>
                      </td>
                    ))}
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-secondary)" }}>Bedrooms</td>
                    {compareProperties.map((p) => (
                      <td key={p.id} style={{ padding: "12px 16px", fontWeight: 600 }}>
                        {p.bedrooms > 0 ? `${p.bedrooms} BHK` : "Plot Land"}
                      </td>
                    ))}
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-secondary)" }}>Bathrooms</td>
                    {compareProperties.map((p) => (
                      <td key={p.id} style={{ padding: "12px 16px" }}>{p.bathrooms > 0 ? `${p.bathrooms} Baths` : "—"}</td>
                    ))}
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-secondary)" }}>Super Area</td>
                    {compareProperties.map((p) => (
                      <td key={p.id} style={{ padding: "12px 16px", fontWeight: 700 }}>{formatArea(p.area)}</td>
                    ))}
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-secondary)" }}>Furnishing</td>
                    {compareProperties.map((p) => (
                      <td key={p.id} style={{ padding: "12px 16px" }}>{p.furnishing}</td>
                    ))}
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-secondary)" }}>Facing</td>
                    {compareProperties.map((p) => (
                      <td key={p.id} style={{ padding: "12px 16px" }}>{p.facing}</td>
                    ))}
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text-secondary)" }}>Parking</td>
                    {compareProperties.map((p) => (
                      <td key={p.id} style={{ padding: "12px 16px" }}>{p.parking}</td>
                    ))}
                  </tr>

                  {/* Amenities Checklist */}
                  {allAmenities.map((amenity) => (
                    <tr key={amenity} style={{ borderBottom: "1px solid var(--border-light)" }}>
                      <td style={{ padding: "10px 16px", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                        {amenity}
                      </td>
                      {compareProperties.map((p) => {
                        const hasIt = p.amenities && p.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase()) || amenity.toLowerCase().includes(a.toLowerCase()));
                        return (
                          <td key={p.id} style={{ padding: "10px 16px" }}>
                            {hasIt ? (
                              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--accent-emerald)", fontWeight: 800, fontSize: "0.82rem" }}>
                                <Check size={17} color="var(--accent-emerald)" strokeWidth={3} />
                                <span>Available</span>
                              </div>
                            ) : (
                              <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                                <Minus size={14} />
                                <span>Optional</span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* Action Row */}
                  <tr>
                    <td style={{ padding: "20px 16px" }}></td>
                    {compareProperties.map((p) => (
                      <td key={p.id} style={{ padding: "20px 16px" }}>
                        <Link
                          to={`/property/${p.id}`}
                          onClick={() => setIsOpen(false)}
                          className="btn btn-primary btn-sm"
                          style={{ width: "100%" }}
                        >
                          <span>Full Details</span>
                          <ExternalLink size={14} />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompareModal;
