import { Router } from "express";
import { treasures } from "./data/treasure-data";
import {
	DEFAULT_USERS_SEARCH_RADIUS_IN_KM,
	findTreasuresByDistance,
	isValidCoordinate,
} from "./models/Treasure.Model";

export const router = Router();

router.get("/treasures", async (req, res) => {
	console.log(`All treasyres requested from ip: ${req.ip}`);
	res.status(200);
	return res.json(treasures);
});

router.get("/treasures/nearby", (req, res) => {
	const { longitude, latitude, distance } = req.query;

	if (!longitude || !latitude) {
		res.status(400);
		return res.send(`Please specify coordinates to search treasures nearby.`);
	}

	const coordinate = {
		longitude: parseFloat(longitude as string),
		latitude: parseFloat(latitude as string),
	};

	const searchRadius = !distance
		? DEFAULT_USERS_SEARCH_RADIUS_IN_KM
		: parseFloat(distance as string);

	const treasuresNearby = findTreasuresByDistance(
		treasures,
		coordinate,
		searchRadius
	);
	const treasuresNearbyCount = treasuresNearby.length;

	res.status(200);
	return res.json({
		count: treasuresNearbyCount,
		treasures: treasuresNearby,
	});
});

router.post("/treasures/new", (req, res) => {
	const { coordinate } = req.body;

	if (!coordinate || !isValidCoordinate(coordinate)) {
		res.status(400);
		return res.send({
			error: `invalid coordinate ${JSON.stringify(coordinate)}`,
		});
	}
	const latitude = coordinate.latitude;
	const longitude = coordinate.longitude;

	res
		.status(200)
		.send(`New treasure created at lat:${latitude} long:${longitude}.`);
});
