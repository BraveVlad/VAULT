import "dotenv/config";

import express from "express";
import cors from "cors";
import { json } from "body-parser";

import { router as GamesRouter } from "./Games.Router";
import { router as UsersRouter } from "./Users.Router";
import { router as TreasuresRouter } from "./Treasures.Router";

const app = express();

app.use(cors());
app.use(json());

app.use(GamesRouter);
app.use(UsersRouter);
app.use(TreasuresRouter);

// TODO - replace with real DBs

app.get("/check", async (_, res) => {
	res.status(200);
	res.json({ status: "Vault backened is OK" });
});

async function init() {
	app.listen(process.env.MAIN_PORT, () =>
		console.log(`Server running on http://127.0.0.1:${process.env.MAIN_PORT}`)
	);
}

init();
