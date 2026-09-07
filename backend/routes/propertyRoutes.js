import express from "express";
import {
  getProperties,
  getPropertyById,
  createProperty,
  seedProperties,
  deleteProperty,
  updatePropertyStatus,
  getAnalytics,
} from "../controllers/propertyController.js";

const router = express.Router();

router.get("/analytics", getAnalytics);
router.route("/").get(getProperties).post(createProperty);
router.post("/seed", seedProperties);
router.route("/:id").get(getPropertyById).delete(deleteProperty);
router.patch("/:id/status", updatePropertyStatus);

export default router;
