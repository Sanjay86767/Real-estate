import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePropertyContext } from "../context/PropertyContext";
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Home,
  IndianRupee,
  MapPin,
  Sparkles,
  Bed,
  Bath,
  Maximize2
} from "lucide-react";

export const ListProperty = () => {
  const navigate = useNavigate();
  const { addCustomProperty, formatPrice } = usePropertyContext();

  const [currentStep, setCurrentStep] = useState(1);

  // Form Data State
  const [formData, setFormData] = useState({
    title: "",
    type: "Apartment",
    status: "For Sale",
    price: "",
    city: "Chandigarh",
    address: "",
    bedrooms: 3,
    bathrooms: 2,
    area: 1550,
    parking: "1 Covered Bay",
    furnishing: "Semi-Furnished",
    facing: "North-East",
    description: "",
    amenities: ["24/7 Security", "Power Backup", "Car Parking"],
    image1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    image2: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
  });

  const amenitiesOptions = [
    "Swimming Pool",
    "Gym & Fitness Suite",
    "Private Garden",
    "Power Backup",
    "24/7 Security",
    "Smart Home Automation",
    "Clubhouse Access",
    "Car Parking",
    "CCTV Surveillance",
    "Kids Play Area"
  ];

  const handleAmenityToggle = (amenity) => {
    if (formData.amenities.includes(amenity)) {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((a) => a !== amenity)
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenity]
      });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePublish = (e) => {
    e.preventDefault();

    const newProperty = {
      title: formData.title,
      tagline: `${formData.bedrooms} BHK ${formData.type} in ${formData.city}`,
      location: `${formData.address}, ${formData.city}`,
      city: formData.city,
      address: formData.address,
      price: Number(formData.price),
      priceFormatted: `₹${(Number(formData.price) / 100000).toFixed(0)} Lakh`,
      type: formData.type,
      status: formData.status,
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      area: Number(formData.area),
      parking: formData.parking,
      furnishing: formData.furnishing,
      facing: formData.facing,
      description: formData.description || `Exquisite ${formData.type} offering premier living in prime ${formData.city}.`,
      images: [formData.image1, formData.image2],
      amenities: formData.amenities
    };

    const newId = addCustomProperty(newProperty);
    navigate(`/property/${newId}`);
  };

  return (
    <div className="list-property-page" style={{ padding: "40px 0 90px", minHeight: "85vh" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--accent-primary)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
            <Sparkles size={16} />
            <span>Owner & Builder Portal</span>
          </div>
          <h1 style={{ fontSize: "2.4rem", marginTop: "4px" }}>List Your Property on EstateHub</h1>
          <p style={{ marginTop: "6px", color: "var(--text-secondary)" }}>
            Reach over 50,000 active buyers and investors across India with zero upfront listing fee.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "36px", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "18px",
              left: "40px",
              right: "40px",
              height: "3px",
              background: "var(--border-light)",
              zIndex: 1
            }}
          >
            <div
              style={{
                height: "100%",
                background: "var(--accent-primary)",
                width: `${((currentStep - 1) / 3) * 100}%`,
                transition: "width 0.3s ease"
              }}
            />
          </div>

          {[
            { num: 1, label: "Basic Info" },
            { num: 2, label: "Specifications" },
            { num: 3, label: "Amenities" },
            { num: 4, label: "Photos & Review" }
          ].map((step) => {
            const isDone = currentStep > step.num;
            const isCurrent = currentStep === step.num;

            return (
              <div key={step.num} style={{ zIndex: 2, textAlign: "center" }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: isDone ? "var(--accent-emerald)" : isCurrent ? "var(--accent-primary)" : "var(--bg-surface)",
                    border: `2px solid ${isDone ? "var(--accent-emerald)" : isCurrent ? "var(--accent-primary)" : "var(--border-light)"}`,
                    color: isDone || isCurrent ? "#ffffff" : "var(--text-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    margin: "0 auto 8px"
                  }}
                >
                  {isDone ? <CheckCircle2 size={18} /> : step.num}
                </div>
                <span style={{ fontSize: "0.78rem", fontWeight: isCurrent ? 700 : 500, color: isCurrent ? "var(--accent-primary)" : "var(--text-secondary)" }}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Wizard Form Card */}
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            padding: "36px",
            boxShadow: "var(--shadow-sm)"
          }}
        >
          {/* STEP 1: Basic Information */}
          {currentStep === 1 && (
            <form onSubmit={handleNext}>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "20px" }}>Step 1: Basic Property Details</h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                    Property Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Royal Greens Ultra Luxury Villa"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      Property Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-light)",
                        background: "var(--bg-secondary)",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    >
                      <option value="Apartment">Modern Apartment</option>
                      <option value="Villa">Luxury Villa</option>
                      <option value="Penthouse">Penthouse Suite</option>
                      <option value="House">Independent House</option>
                      <option value="Plot">Residential Plot</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      Listing Category *
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-light)",
                        background: "var(--bg-secondary)",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    >
                      <option value="For Sale">For Sale</option>
                      <option value="For Rent">For Rent</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      Offering Price (in ₹ INR) *
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 8500000"
                      required
                      min="500000"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-light)",
                        background: "var(--bg-secondary)",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    />
                    {formData.price > 0 && (
                      <span style={{ fontSize: "0.78rem", color: "var(--accent-primary)", fontWeight: 600, marginTop: "4px", display: "block" }}>
                        Preview: {formatPrice(formData.price)}
                      </span>
                    )}
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      City / Region *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-light)",
                        background: "var(--bg-secondary)",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    >
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Mohali">Mohali, Punjab</option>
                      <option value="Delhi">Delhi NCR / Gurgaon</option>
                      <option value="Amritsar">Amritsar, Punjab</option>
                      <option value="Bangalore">Bangalore, Karnataka</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                    Street Address & Sector *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sector 82, Wave Estate, Mohali"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-end", marginTop: "10px" }}>
                  <span>Next: Specifications</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Specifications */}
          {currentStep === 2 && (
            <form onSubmit={handleNext}>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "20px" }}>Step 2: Key Specifications</h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      Bedrooms (BHK)
                    </label>
                    <select
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-light)",
                        background: "var(--bg-secondary)",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    >
                      <option value="1">1 BHK</option>
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4 BHK</option>
                      <option value="5">5+ BHK</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      Bathrooms
                    </label>
                    <select
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-light)",
                        background: "var(--bg-secondary)",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    >
                      <option value="1">1 Bath</option>
                      <option value="2">2 Baths</option>
                      <option value="3">3 Baths</option>
                      <option value="4">4 Baths</option>
                      <option value="5">5+ Baths</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      Super Area (sq.ft) *
                    </label>
                    <input
                      type="number"
                      required
                      min="300"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-light)",
                        background: "var(--bg-secondary)",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      Furnishing Status
                    </label>
                    <select
                      value={formData.furnishing}
                      onChange={(e) => setFormData({ ...formData, furnishing: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-light)",
                        background: "var(--bg-secondary)",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    >
                      <option value="Fully Furnished">Fully Furnished</option>
                      <option value="Semi-Furnished">Semi-Furnished</option>
                      <option value="Unfurnished">Unfurnished</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                      Facing Direction
                    </label>
                    <select
                      value={formData.facing}
                      onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border-light)",
                        background: "var(--bg-secondary)",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem",
                        outline: "none"
                      }}
                    >
                      <option value="North-East">North-East (Vastu Compliant)</option>
                      <option value="East Facing">East Facing</option>
                      <option value="North Facing">North Facing</option>
                      <option value="South-East">South-East</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                    Dedicated Parking Bay
                  </label>
                  <input
                    type="text"
                    value={formData.parking}
                    onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                  <button type="button" onClick={handlePrev} className="btn btn-secondary">
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <span>Next: Amenities</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: Amenities */}
          {currentStep === 3 && (
            <form onSubmit={handleNext}>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>Step 3: Select Amenities</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
                Select all features that apply to your property to attract high-intent buyers.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "12px",
                  marginBottom: "28px"
                }}
              >
                {amenitiesOptions.map((amenity) => {
                  const isChecked = formData.amenities.includes(amenity);
                  return (
                    <label
                      key={amenity}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px 14px",
                        borderRadius: "var(--radius-sm)",
                        background: isChecked ? "var(--accent-primary-light)" : "var(--bg-secondary)",
                        border: `1px solid ${isChecked ? "var(--accent-primary)" : "var(--border-light)"}`,
                        cursor: "pointer",
                        fontSize: "0.88rem",
                        fontWeight: isChecked ? 600 : 400
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleAmenityToggle(amenity)}
                        style={{ accentColor: "var(--accent-primary)" }}
                      />
                      <span>{amenity}</span>
                    </label>
                  );
                })}
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                  Property Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe unique highlights, view, neighborhood, sunlight..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-light)",
                    background: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    outline: "none",
                    resize: "vertical"
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px" }}>
                <button type="button" onClick={handlePrev} className="btn btn-secondary">
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button type="submit" className="btn btn-primary">
                  <span>Next: Review & Photos</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Photos & Review */}
          {currentStep === 4 && (
            <form onSubmit={handlePublish}>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>Step 4: Photography & Final Review</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
                High quality architectural imagery increases site-visit inquiries by up to 300%.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "28px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                    Primary Photo URL
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.image1}
                    onChange={(e) => setFormData({ ...formData, image1: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "6px" }}>
                    Secondary Photo URL
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.image2}
                    onChange={(e) => setFormData({ ...formData, image2: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-light)",
                      background: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      fontSize: "0.9rem",
                      outline: "none"
                    }}
                  />
                </div>

                {/* Live Card Preview */}
                <div style={{ padding: "16px", background: "var(--bg-secondary)", borderRadius: "var(--radius-md)" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                    Live Listing Preview
                  </span>
                  <div style={{ display: "flex", gap: "14px", marginTop: "10px", alignItems: "center" }}>
                    <img
                      src={formData.image1}
                      alt="Preview"
                      style={{ width: "90px", height: "70px", borderRadius: "8px", objectFit: "cover" }}
                    />
                    <div>
                      <h4 style={{ fontSize: "1.05rem", margin: "0 0 4px" }}>{formData.title || "Untitled Property"}</h4>
                      <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--accent-primary)" }}>
                        {formData.price ? formatPrice(formData.price) : "₹0"}
                      </div>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                        📍 {formData.address || "Address"}, {formData.city} • {formData.bedrooms} BHK • {formData.area} sq.ft
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button type="button" onClick={handlePrev} className="btn btn-secondary">
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button type="submit" className="btn btn-gold btn-lg">
                  <Sparkles size={18} />
                  <span>Publish Property Now</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListProperty;
