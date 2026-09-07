import Property from "../models/Property.js";
import { signatureProperties } from "../../src/data/properties.js";
import { getDbStatus } from "../config/db.js";

// In-memory cache/store for when MongoDB is in fallback mode
let inMemoryProperties = [...signatureProperties.map(p => ({
  ...p,
  numericId: p.id,
  _id: `mem-${p.id}`,
  createdAt: new Date().toISOString()
}))];

// @desc    Get all properties with filtering, search, pagination & sorting
// @route   GET /api/properties
export const getProperties = async (req, res) => {
  try {
    const { search, type, city, minPrice, maxPrice, bedrooms, featured, sort, page = 1, limit = 50 } = req.query;
    const { connected } = getDbStatus();

    if (connected) {
      const query = {};

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
          { city: { $regex: search, $options: "i" } },
        ];
      }

      if (type && type !== "All") {
        query.type = type;
      }

      if (city && city !== "All") {
        query.city = { $regex: city, $options: "i" };
      }

      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }

      if (bedrooms && bedrooms !== "All") {
        query.bedrooms = Number(bedrooms);
      }

      if (featured === "true") {
        query.featured = true;
      }

      let sortOptions = { createdAt: -1 };
      if (sort === "price-low") sortOptions = { price: 1 };
      else if (sort === "price-high") sortOptions = { price: -1 };
      else if (sort === "popular") sortOptions = { "vastu.score": -1 };

      const skip = (Number(page) - 1) * Number(limit);
      const total = await Property.countDocuments(query);
      const properties = await Property.find(query).sort(sortOptions).skip(skip).limit(Number(limit));

      return res.json({
        success: true,
        source: "MongoDB",
        count: properties.length,
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)),
        data: properties,
      });
    }

    // In-memory fallback
    let filtered = [...inMemoryProperties];

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(s) ||
          p.location?.toLowerCase().includes(s) ||
          p.city?.toLowerCase().includes(s)
      );
    }

    if (type && type !== "All") {
      filtered = filtered.filter((p) => p.type?.toLowerCase() === type.toLowerCase());
    }

    if (city && city !== "All") {
      filtered = filtered.filter((p) => p.city?.toLowerCase() === city.toLowerCase());
    }

    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= Number(maxPrice));
    }

    if (bedrooms && bedrooms !== "All") {
      filtered = filtered.filter((p) => p.bedrooms === Number(bedrooms));
    }

    if (featured === "true") {
      filtered = filtered.filter((p) => p.featured === true);
    }

    if (sort === "price-low") filtered.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") filtered.sort((a, b) => b.price - a.price);

    return res.json({
      success: true,
      source: "In-Memory MERN Fallback",
      count: filtered.length,
      total: filtered.length,
      data: filtered,
    });
  } catch (error) {
    console.error("Error in getProperties:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const { connected } = getDbStatus();

    if (connected) {
      const isObjectId = id.match(/^[0-9a-fA-F]{24}$/);
      let property;
      if (isObjectId) {
        property = await Property.findById(id);
      } else if (!isNaN(Number(id))) {
        property = await Property.findOne({ numericId: Number(id) });
      }

      if (!property) {
        return res.status(404).json({ success: false, message: "Property not found in database" });
      }
      return res.json({ success: true, data: property });
    }

    // Fallback
    const prop = inMemoryProperties.find(
      (p) => String(p.id) === String(id) || String(p.numericId) === String(id) || p._id === id
    );

    if (!prop) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    return res.json({ success: true, data: prop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new property
// @route   POST /api/properties
export const createProperty = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    const newPropertyData = {
      ...req.body,
      numericId: Date.now(),
      yearBuilt: req.body.yearBuilt || new Date().getFullYear(),
      vastu: req.body.vastu || {
        score: 91,
        facing: "North-East",
        grade: "Ishanya Supreme",
      },
    };

    if (connected) {
      const created = await Property.create(newPropertyData);
      return res.status(201).json({ success: true, message: "Property created in MongoDB", data: created });
    }

    const fallbackItem = {
      ...newPropertyData,
      id: newPropertyData.numericId,
      _id: `mem-${newPropertyData.numericId}`,
      createdAt: new Date().toISOString(),
    };
    inMemoryProperties.unshift(fallbackItem);

    return res.status(201).json({
      success: true,
      message: "Property created in MERN memory store",
      data: fallbackItem,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Seed database with signature properties
// @route   POST /api/properties/seed
export const seedProperties = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (!connected) {
      return res.json({
        success: true,
        message: "Seeded in-memory store with signature properties",
        count: inMemoryProperties.length,
      });
    }

    await Property.deleteMany({});

    const formatted = signatureProperties.map((p) => ({
      numericId: p.id,
      title: p.title,
      tagline: p.tagline || "",
      description: p.description || "",
      price: p.price,
      location: p.location,
      city: p.city,
      state: p.state || "India",
      pincode: p.pincode || "",
      type: p.type || "Apartment",
      status: p.status || "For Sale",
      bedrooms: p.bedrooms || 3,
      bathrooms: p.bathrooms || 3,
      area: p.area || 1500,
      parking: String(p.parking || "2 Covered Slots"),
      yearBuilt: p.yearBuilt || 2024,
      reraId: p.reraId || "RERA-APPROVED-REG-2026",
      featured: p.featured || false,
      badge: p.badge || "",
      images: p.images || [],
      amenities: p.amenities || [],
      vastu: p.vastu || { score: 92, facing: "North-East", grade: "Ishanya Supreme" },
      financials: p.financials || { rentalYield: "4.2%", estAppreciation: "11% YoY" },
      agent: p.agent || { name: "Vikramaditya Oberoi", phone: "+91 98200 11223" },
    }));

    const inserted = await Property.insertMany(formatted);

    return res.json({
      success: true,
      message: `Successfully seeded ${inserted.length} properties into MongoDB Atlas!`,
      count: inserted.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const { connected } = getDbStatus();

    if (connected) {
      const isObjectId = id.match(/^[0-9a-fA-F]{24}$/);
      let deleted;
      if (isObjectId) {
        deleted = await Property.findByIdAndDelete(id);
      } else {
        deleted = await Property.findOneAndDelete({ numericId: Number(id) });
      }

      if (!deleted) {
        return res.status(404).json({ success: false, message: "Property not found to delete" });
      }

      return res.json({ success: true, message: "Property deleted successfully from MongoDB Atlas" });
    }

    inMemoryProperties = inMemoryProperties.filter(
      (p) => String(p.id) !== String(id) && String(p.numericId) !== String(id) && p._id !== id
    );
    return res.json({ success: true, message: "Property deleted from memory store" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update property status (e.g. For Sale, Under Offer, Sold)
// @route   PATCH /api/properties/:id/status
export const updatePropertyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { connected } = getDbStatus();

    if (connected) {
      const isObjectId = id.match(/^[0-9a-fA-F]{24}$/);
      let updated;
      if (isObjectId) {
        updated = await Property.findByIdAndUpdate(id, { status }, { new: true });
      } else {
        updated = await Property.findOneAndUpdate({ numericId: Number(id) }, { status }, { new: true });
      }

      if (!updated) {
        return res.status(404).json({ success: false, message: "Property not found" });
      }

      return res.json({ success: true, message: `Status updated to ${status}`, data: updated });
    }

    const prop = inMemoryProperties.find(
      (p) => String(p.id) === String(id) || String(p.numericId) === String(id) || p._id === id
    );
    if (prop) {
      prop.status = status;
      return res.json({ success: true, message: `Status updated to ${status}`, data: prop });
    }

    return res.status(404).json({ success: false, message: "Property not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get portfolio analytics and telemetry
// @route   GET /api/properties/analytics
export const getAnalytics = async (req, res) => {
  try {
    const { connected } = getDbStatus();

    if (connected) {
      const totalCount = await Property.countDocuments();
      const aggregation = await Property.aggregate([
        {
          $group: {
            _id: null,
            totalValuation: { $sum: "$price" },
            avgPrice: { $avg: "$price" },
            avgArea: { $avg: "$area" },
          },
        },
      ]);

      const cityStats = await Property.aggregate([
        { $group: { _id: "$city", count: { $sum: 1 }, avgPrice: { $avg: "$price" } } },
        { $sort: { count: -1 } },
        { $limit: 6 },
      ]);

      const typeStats = await Property.aggregate([
        { $group: { _id: "$type", count: { $sum: 1 } } },
      ]);

      const stats = aggregation[0] || { totalValuation: 0, avgPrice: 0, avgArea: 0 };

      return res.json({
        success: true,
        source: "MongoDB Atlas Live",
        totalProperties: totalCount,
        totalValuation: stats.totalValuation,
        avgPrice: Math.round(stats.avgPrice),
        avgArea: Math.round(stats.avgArea),
        cities: cityStats,
        types: typeStats,
      });
    }

    // In-memory stats
    const totalVal = inMemoryProperties.reduce((acc, p) => acc + (p.price || 0), 0);
    return res.json({
      success: true,
      source: "In-Memory Store",
      totalProperties: inMemoryProperties.length,
      totalValuation: totalVal,
      avgPrice: Math.round(totalVal / (inMemoryProperties.length || 1)),
      avgArea: 1850,
      cities: [
        { _id: "Mumbai", count: 8 },
        { _id: "Delhi NCR", count: 12 },
        { _id: "Bangalore", count: 10 },
      ],
      types: [
        { _id: "Apartment", count: 24 },
        { _id: "Villa", count: 18 },
        { _id: "Penthouse", count: 15 },
      ],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
