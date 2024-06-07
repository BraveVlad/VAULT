import { PassThrough } from "stream";
import { users } from "../data/users-data";
import { Games } from "./Game.Model";

export type VaultGame = {
	gameId: number;
};
export type VaultGames = VaultGame[];

export type User = {
	username: string;
	password: string;
	vault: VaultGames;
};

export type ShallowUsers = Pick<User, "username">[];
export type Users = User[];

export function getUser(username: string) {
	return users.find((user) => user.username === username);
}

export function getUserVault(username: string) {
	return getUser(username)?.vault;
}

export function addGameToUserVault(username: string, gameId: number) {
	getUser(username)?.vault.push({ gameId: gameId });
	return getUserVault(username);
}

export function isGameExistsInUserVault(username: string, gameId: number) {
	return getUserVault(username)?.find((game) => game.gameId === gameId);
}
