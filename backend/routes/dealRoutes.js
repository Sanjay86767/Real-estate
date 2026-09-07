import express from "express";
import { getDeals, createDeal, updateDealStatus } from "../controllers/dealController.js";

const router = express.Router();

router.route("/").get(getDeals).post(createDeal);
router.route("/:id/status").patch(updateDealStatus);

export default router;
