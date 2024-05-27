import "dotenv/config";

import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { initConnection } from "./dbConnection";
import { games } from "./data/games-data";
import { ApiResponse, Games, Game } from "./models/Game.Model";
const app = express();

app.use(cors());
app.use(json());

// TODO - replace with real DBs

function loadGames() {
	return games as ApiResponse;
}

const data = loadGames();

app.get("/check", async (_, res) => {
	res.status(200);
	res.json({ status: "Vault backened is OK" });
});

app.get("/games", async (_, res) => {
	res.status(200);
	res.json(data);
});

app.get("/games/:gameId", async (req, res) => {
	const targetGameId = req.params.gameId;
	const targetGame = data.results.find((game) => {
		game.id === Number(targetGameId);
	});

	if (!targetGame) {
		res
			.status(204)
			.send({
				result: null,
				message: `Couldn't find game with id ${targetGameId}`,
			});
	}
	res.status(200);
	res.json(targetGame);
});

async function init() {
	// await initConnection();
	app.listen(process.env.MAIN_PORT, () =>
		console.log(`Server running on http://127.0.0.1:${process.env.MAIN_PORT}`)
	);
}

init();