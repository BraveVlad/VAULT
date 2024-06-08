import { Game, Games } from "./Game.Model";

export type VaultGame = {
	gameId: number;
};
export type VaultGames = VaultGame[];

export type User = {
	username: string;
	password: string;
	vault: VaultGames;
};

export type AddGameToVaultResponse = {
	message: string;
	updatedVault: VaultGames;
};

export type ShallowUsers = Pick<User, "username">[];
export type Users = User[];
