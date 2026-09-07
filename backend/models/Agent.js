import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    numericId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Senior Luxury Real Estate Consultant",
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    experience: {
      type: String,
      default: "8+ Years",
    },
    specialization: {
      type: String,
      default: "Luxury & Heritage Estates",
    },
    rating: {
      type: Number,
      default: 4.9,
    },
    sales: {
      type: String,
      default: "₹120+ Cr",
    },
    reraId: {
      type: String,
      default: "A51900018942",
    },
    bio: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Agent = mongoose.models.Agent || mongoose.model("Agent", agentSchema);

export default Agent;
