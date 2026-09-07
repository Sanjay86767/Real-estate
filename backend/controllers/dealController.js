import DealOffer from "../models/DealOffer.js";
import { getDbStatus } from "../config/db.js";

let inMemoryDeals = [
  {
    _id: "off-8910",
    loiCode: "LOI-ESTATE-MUM-2026-8910",
    propertyId: 1,
    propertyTitle: "Imperial Skyline Penthouse, Worli",
    buyerName: "Verified VIP Investor",
    askingPrice: 185000000,
    offerPrice: 177500000,
    deposit: 15000000,
    timeline: "30 Days",
    probability: "84%",
    status: "Under Review",
    createdAt: "2026-09-06T15:00:00.000Z",
  },
];

// @desc    Get all active LOI deals & offers
// @route   GET /api/deals
export const getDeals = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const deals = await DealOffer.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: deals.length, data: deals });
    }
    return res.json({ success: true, count: inMemoryDeals.length, data: inMemoryDeals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Submit a new Deal Desk LOI offer
// @route   POST /api/deals
export const createDeal = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    const loiCode = req.body.loiCode || `LOI-ESTATE-${Date.now().toString().slice(-6)}`;

    const dealData = {
      ...req.body,
      loiCode,
      status: req.body.status || "Under Review",
    };

    if (connected) {
      const deal = await DealOffer.create(dealData);
      return res.status(201).json({ success: true, message: "Deal offer submitted to seller", data: deal });
    }

    const fallbackDeal = {
      _id: `off-${Math.floor(1000 + Math.random() * 9000)}`,
      ...dealData,
      createdAt: new Date().toISOString(),
    };
    inMemoryDeals.unshift(fallbackDeal);

    return res.status(201).json({
      success: true,
      message: "Deal offer submitted to seller",
      data: fallbackDeal,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update deal status (e.g. Accept, Counter, Reject)
// @route   PATCH /api/deals/:id/status
export const updateDealStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { connected } = getDbStatus();

    if (connected) {
      const deal = await DealOffer.findByIdAndUpdate(id, { status }, { new: true });
      return res.json({ success: true, message: `Deal status updated to ${status}`, data: deal });
    }

    const target = inMemoryDeals.find((d) => d._id === id || d.id === id);
    if (target) {
      target.status = status;
      return res.json({ success: true, message: `Deal status updated to ${status}`, data: target });
    }

    return res.status(404).json({ success: false, message: "Deal not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
