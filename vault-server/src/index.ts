import "dotenv/config";

import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { games } from "./data/games-data";
import { ApiResponse, Games, Game } from "./models/Game.Model";
import { users } from "./data/users-data";
import {
	addGameToUserVault,
	getUser,
	getUserVault,
	isGameExistsInUserVault,
} from "./models/User.Model";

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

app.get("/games", async (req, res) => {
	console.log(`All games requested from ip: ${req.ip}`);
	res.status(200);
	res.json(data);
});

app.get("/games/:gameId", async (req, res) => {
	const rawTargetGameId = req.params.gameId;
	console.log(`Game id ${rawTargetGameId} requested from ip: ${req.ip}`);
	const targetGameId = Number(rawTargetGameId);

	const requestedGame = data.results.find((game) => {
		return game.id === targetGameId;
	});

	if (!requestedGame) {
		res.status(204);
		res.send({
			result: null,
			message: `Couldn't find game with id ${targetGameId}`,
		});
		return;
	}

	console.log(`Game #${targetGameId} found - ${requestedGame?.name}`);
	res.status(200);
	res.json(requestedGame);
});

app.get("/users/:username", async (req, res) => {
	const targetUsername = req.params.username;
	console.log(`User ${targetUsername} requested from ip: ${req.ip}`);

	const targetUser = getUser(targetUsername);

	if (!targetUser) {
		res.status(204);
		res.send({
			result: null,
			message: `Couldn't find user ${targetUsername}`,
		});
	}

	console.log(`User ${targetUser?.username} found.`);
	res.status(200);
	res.json(targetUser);
});

app.post("/users/vault/addGame", (req, res) => {
	const { username, gameId } = req.body;

	if (!username || !gameId) {
		res.status(400);
		res.send({
			error: `invalid username ${username} or game id ${gameId}`,
		});
	}

	if (isGameExistsInUserVault(username, gameId)) {
		res.status(400);
		res.send({
			error: `game #${gameId} already exists in user ${username}'s vault.`,
		});
	}

	const updatedVault = addGameToUserVault(username, gameId);

	res.status(200);
	res.json({ message: "OK", updatedVault: updatedVault });
});
async function init() {
	// await initConnection();
	app.listen(process.env.MAIN_PORT, () =>
		console.log(`Server running on http://127.0.0.1:${process.env.MAIN_PORT}`)
	);
}

init();
