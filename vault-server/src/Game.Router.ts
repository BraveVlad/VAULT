import { Express } from "express";
import { Router } from "express";
import { games } from "./data/games-data";
import { ApiResponse } from "./models/Game.Model";

export const router = Router();

function loadGames() {
	return games as ApiResponse;
}

const data = loadGames();

router.get("/games", async (req, res) => {
	console.log(`All games requested from ip: ${req.ip}`);
	res.status(200);
	return res.json(data);
});

router.get("/games/:gameId", async (req, res) => {
	const rawTargetGameId = req.params.gameId;
	console.log(`Game id ${rawTargetGameId} requested from ip: ${req.ip}`);
	const targetGameId = Number(rawTargetGameId);

	const requestedGame = data.results.find((game) => {
		return game.id === targetGameId;
	});

	if (!requestedGame) {
		res.status(204);
		return res.send({
			result: null,
			message: `Couldn't find game with id ${targetGameId}`,
		});
	}

	console.log(`Game #${targetGameId} found - ${requestedGame?.name}`);
	res.status(200);
	return res.json(requestedGame);
});
