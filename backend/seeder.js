import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";

try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (e) {}
import Property from "./models/Property.js";
import Agent from "./models/Agent.js";
import { signatureProperties } from "../src/data/properties.js";
import { agents } from "../src/data/agents.js";

dotenv.config();

const seedDB = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/estatehub";
  console.log(`Connecting to MongoDB at: ${mongoUri}...`);

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB!");

    // Clear existing
    await Property.deleteMany({});
    await Agent.deleteMany({});
    console.log("Existing Property and Agent data cleared.");

    // Format properties
    const formattedProperties = signatureProperties.map((p) => ({
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

    // Format agents
    const formattedAgents = agents.map((a) => ({
      numericId: a.id,
      name: a.name,
      role: a.role,
      phone: a.phone,
      email: a.email,
      image: a.image,
      experience: a.experience,
      specialization: a.specialties ? a.specialties.join(", ") : "Luxury Estates",
      rating: a.rating,
      sales: a.dealsClosed,
      bio: a.bio,
    }));

    const insertedProps = await Property.insertMany(formattedProperties);
    const insertedAgents = await Agent.insertMany(formattedAgents);

    console.log(`\n🎉 Success: Seeded ${insertedProps.length} properties and ${insertedAgents.length} agents into MongoDB!`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

seedDB();
