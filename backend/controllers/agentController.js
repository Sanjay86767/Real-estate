import Agent from "../models/Agent.js";
import { agents } from "../../src/data/agents.js";
import { getDbStatus } from "../config/db.js";

export const getAgents = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const dbAgents = await Agent.find();
      if (dbAgents.length > 0) {
        return res.json({ success: true, count: dbAgents.length, data: dbAgents });
      }
    }
    return res.json({ success: true, count: agents.length, data: agents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
