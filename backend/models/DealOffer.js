import mongoose from "mongoose";

const dealOfferSchema = new mongoose.Schema(
  {
    loiCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    propertyId: {
      type: Number,
      required: true,
    },
    propertyTitle: {
      type: String,
      required: true,
    },
    buyerName: {
      type: String,
      default: "Verified VIP Investor",
    },
    buyerEmail: {
      type: String,
      default: "",
    },
    askingPrice: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
      required: true,
    },
    deposit: {
      type: Number,
      required: true,
    },
    timeline: {
      type: String,
      default: "30 Days",
    },
    probability: {
      type: String,
      default: "85%",
    },
    status: {
      type: String,
      enum: ["Under Review", "Countered", "Accepted", "Rejected", "Earnest Escrowed"],
      default: "Under Review",
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

const DealOffer = mongoose.models.DealOffer || mongoose.model("DealOffer", dealOfferSchema);

export default DealOffer;
