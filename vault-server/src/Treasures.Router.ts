import { Router } from "express";
import { treasures } from "./data/treasure-data";

export const router = Router();

router.get("/treasures", async (req, res) => {
	console.log(`All treasyres requested from ip: ${req.ip}`);
	res.status(200);
	res.json(treasures);
});
