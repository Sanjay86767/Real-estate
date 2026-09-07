import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    numericId: {
      type: Number,
      required: false,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Property title is required"],
      trim: true,
    },
    tagline: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: [true, "Property description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      index: true,
    },
    location: {
      type: String,
      required: [true, "Location string is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      index: true,
    },
    state: {
      type: String,
      default: "India",
    },
    pincode: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      required: true,
      default: "Apartment",
      index: true,
    },
    status: {
      type: String,
      default: "For Sale",
    },
    bedrooms: {
      type: Number,
      required: true,
      default: 3,
    },
    bathrooms: {
      type: Number,
      required: true,
      default: 3,
    },
    area: {
      type: Number,
      required: true,
      comment: "Area in square feet",
    },
    parking: {
      type: String,
      default: "2 Covered Slots",
    },
    yearBuilt: {
      type: Number,
      default: 2024,
    },
    reraId: {
      type: String,
      default: "RERA-APPROVED-REG-2026",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    badge: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    floorPlan: {
      type: String,
      default: "",
    },
    amenities: {
      type: [String],
      default: [],
    },
    vastu: {
      score: { type: Number, default: 92 },
      facing: { type: String, default: "North-East" },
      grade: { type: String, default: "Ishanya Supreme" },
      elementHarmony: {
        water: { type: Number, default: 95 },
        fire: { type: Number, default: 88 },
        air: { type: Number, default: 92 },
        earth: { type: Number, default: 90 },
        space: { type: Number, default: 96 },
      },
      highlights: { type: [String], default: [] },
    },
    financials: {
      rentalYield: { type: String, default: "4.2% p.a." },
      estAppreciation: { type: String, default: "11.5% YoY" },
      emiEst: { type: String, default: "₹2.4L / mo" },
    },
    agent: {
      id: { type: Number, default: 1 },
      name: { type: String, default: "Vikramaditya Oberoi" },
      phone: { type: String, default: "+91 98200 11223" },
      email: { type: String, default: "vikram@estatehub.in" },
      avatar: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

// Text indexing for fast search
propertySchema.index({ title: "text", location: "text", city: "text", description: "text" });

const Property = mongoose.models.Property || mongoose.model("Property", propertySchema);

export default Property;
