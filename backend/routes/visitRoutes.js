import express from "express";
import { getVisits, createVisit, cancelVisit } from "../controllers/visitController.js";

const router = express.Router();

router.route("/").get(getVisits).post(createVisit);
router.route("/:id").delete(cancelVisit);

export default router;
