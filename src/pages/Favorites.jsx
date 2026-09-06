import React from "react";
import { Link } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import PropertyCard from "../components/PropertyCard";
import { Heart, Trash2, ArrowRight, Home } from "lucide-react";

export const Favorites = () => {
  const { properties, favorites, clearAllFavorites } = usePropertyContext();

  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="favorites-page" style={{ padding: "40px 0 80px", minHeight: "80vh" }}>
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "36px",
            flexWrap: "wrap",
            gap: "16px"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--accent-rose)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
              <Heart size={16} fill="var(--accent-rose)" />
              <span>Saved Shortlist</span>
            </div>
            <h1 style={{ fontSize: "2.4rem", marginTop: "4px" }}>My Favourite Properties</h1>
            <p style={{ marginTop: "4px" }}>
              Saved in your browser local storage. Easily compare and contact advisors whenever you're ready.
            </p>
          </div>

          {favoriteProperties.length > 0 && (
            <button
              onClick={clearAllFavorites}
              className="btn btn-secondary btn-sm"
              style={{ gap: "6px", color: "var(--accent-rose)" }}
            >
              <Trash2 size={16} />
              <span>Clear Shortlist</span>
            </button>
          )}
        </div>

        {/* Content */}
        {favoriteProperties.length > 0 ? (
          <div>
            <div style={{ marginBottom: "20px", fontSize: "0.95rem", color: "var(--text-secondary)" }}>
              Showing <strong>{favoriteProperties.length}</strong> saved {favoriteProperties.length === 1 ? "property" : "properties"}
            </div>
            <div className="properties-grid">
              {favoriteProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div
            style={{
              background: "var(--bg-surface)",
              borderRadius: "var(--radius-lg)",
              padding: "80px 24px",
              textAlign: "center",
              border: "1px dashed var(--border-light)",
              maxWidth: "600px",
              margin: "40px auto"
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "var(--accent-rose-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                color: "var(--accent-rose)"
              }}
            >
              <Heart size={34} />
            </div>
            <h2 style={{ fontSize: "1.8rem", marginBottom: "10px" }}>No Favourites Saved Yet</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "30px", fontSize: "1rem", lineHeight: "1.6" }}>
              Click the heart icon on any property card or details page to bookmark your preferred villas, apartments, or plots here for quick access.
            </p>
            <Link to="/properties" className="btn btn-primary btn-lg">
              <Home size={18} />
              <span>Explore All Properties</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
