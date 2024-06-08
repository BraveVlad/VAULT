import "dotenv/config";

import express from "express";
import cors from "cors";
import { json } from "body-parser";

import { router as GameRouter } from "./Game.Router";
import { router as UserRouter } from "./User.Router";
import { router as TreasureRouter } from "./Treasure.Router";

const app = express();

app.use(cors());
app.use(json());

app.use(GameRouter);
app.use(UserRouter);
app.use(TreasureRouter);

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
