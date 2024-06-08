import "dotenv/config";

import express from "express";
import cors from "cors";
import { json } from "body-parser";

import {
	addGameToUserVault,
	getUser,
	isGameExistsInUserVault,
} from "./models/User.Model";

import { router as GamesRouter } from "./Games.Router";

const app = express();

app.use(cors());
app.use(json());

app.use(GamesRouter);

// TODO - replace with real DBs

app.get("/check", async (_, res) => {
	res.status(200);
	res.json({ status: "Vault backened is OK" });
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
		return;
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
		return;
	}

	if (isGameExistsInUserVault(username, gameId)) {
		res.status(400);
		res.send({
			code: `GAME_ALREADY_EXISTS`,
			error: `game #${gameId} already exists in user ${username}'s vault.`,
		});
		return;
	}

	const updatedVault = addGameToUserVault(username, gameId);

	res.status(200);
	res.json({ message: "OK", updatedVault: updatedVault });
});

async function init() {
	app.listen(process.env.MAIN_PORT, () =>
		console.log(`Server running on http://127.0.0.1:${process.env.MAIN_PORT}`)
	);
}

init();
