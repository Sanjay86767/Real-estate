import VisitBooking from "../models/VisitBooking.js";
import { getDbStatus } from "../config/db.js";

let inMemoryVisits = [
  {
    _id: "sv-1",
    propertyId: 1,
    propertyTitle: "Imperial Skyline Penthouse",
    location: "Worli Sea Face, Mumbai",
    date: "2026-09-12",
    time: "11:30 AM",
    agentName: "Vikramaditya Oberoi",
    agentPhone: "+91 98200 11223",
    status: "Confirmed",
    type: "VIP Private Inspection",
    createdAt: "2026-09-06T10:00:00.000Z",
  },
  {
    _id: "sv-2",
    propertyId: 2,
    propertyTitle: "Raj Darbhanga Royal Heritage Kothi",
    location: "Kameshwari Complex, Darbhanga",
    date: "2026-09-15",
    time: "03:00 PM",
    agentName: "Sanjay Kumar (Founder Desk)",
    agentPhone: "+91 8809604880",
    status: "Confirmed",
    type: "Architectural Heritage Walk",
    createdAt: "2026-09-07T12:00:00.000Z",
  },
];

// @desc    Get all scheduled visits
// @route   GET /api/visits
export const getVisits = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const visits = await VisitBooking.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: visits.length, data: visits });
    }
    return res.json({ success: true, count: inMemoryVisits.length, data: inMemoryVisits });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Schedule a new site inspection visit
// @route   POST /api/visits
export const createVisit = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    const visitData = {
      ...req.body,
      status: "Confirmed",
    };

    if (connected) {
      const visit = await VisitBooking.create(visitData);
      return res.status(201).json({ success: true, message: "Site visit booked successfully", data: visit });
    }

    const fallbackVisit = {
      _id: `sv-${Date.now()}`,
      ...visitData,
      createdAt: new Date().toISOString(),
    };
    inMemoryVisits.unshift(fallbackVisit);

    return res.status(201).json({
      success: true,
      message: "Site visit confirmed",
      data: fallbackVisit,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Cancel a visit
// @route   DELETE /api/visits/:id
export const cancelVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const { connected } = getDbStatus();

    if (connected) {
      await VisitBooking.findByIdAndDelete(id);
      return res.json({ success: true, message: "Site inspection cancelled" });
    }

    inMemoryVisits = inMemoryVisits.filter((v) => v._id !== id && String(v.id) !== id);
    return res.json({ success: true, message: "Site inspection cancelled" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
