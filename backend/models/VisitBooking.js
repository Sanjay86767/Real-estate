import mongoose from "mongoose";

const visitBookingSchema = new mongoose.Schema(
  {
    propertyId: {
      type: Number,
      required: true,
    },
    propertyTitle: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "",
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      default: "",
    },
    userPhone: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    agentName: {
      type: String,
      default: "Vikramaditya Oberoi",
    },
    agentPhone: {
      type: String,
      default: "+91 98200 11223",
    },
    type: {
      type: String,
      enum: ["VIP Private Inspection", "Architectural Heritage Walk", "Virtual 3D Walkthrough", "Vastu Consultation Inspection"],
      default: "VIP Private Inspection",
    },
    status: {
      type: String,
      enum: ["Confirmed", "Rescheduled", "Completed", "Cancelled"],
      default: "Confirmed",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const VisitBooking = mongoose.models.VisitBooking || mongoose.model("VisitBooking", visitBookingSchema);

export default VisitBooking;
