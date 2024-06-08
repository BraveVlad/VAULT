import { Router } from "express";
import {
	getUser,
	isGameExistsInUserVault,
	addGameToUserVault,
} from "./models/User.Model";

export const router = Router();

router.get("/users/:username", async (req, res) => {
	const targetUsername = req.params.username;
	console.log(`User ${targetUsername} requested from ip: ${req.ip}`);

	const targetUser = getUser(targetUsername);

	if (!targetUser) {
		res.status(204);
		return res.send({
			result: null,
			message: `Couldn't find user ${targetUsername}`,
		});
	}

	console.log(`User ${targetUser?.username} found.`);
	res.status(200);
	return res.json(targetUser);
});

router.post("/users/vault/addGame", (req, res) => {
	const { username, gameId } = req.body;

	if (!username || !gameId) {
		res.status(400);
		return res.send({
			error: `invalid username ${username} or game id ${gameId}`,
		});
	}

	if (isGameExistsInUserVault(username, gameId)) {
		res.status(400);
		return res.send({
			code: `GAME_ALREADY_EXISTS`,
			error: `game #${gameId} already exists in user ${username}'s vault.`,
		});
	}

	const updatedVault = addGameToUserVault(username, gameId);

	res.status(200);
	return res.json({ message: "OK", updatedVault: updatedVault });
});
