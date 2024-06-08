import { Platform } from "react-native";

export const MOCK_RAWG_API_URL = {
	base:
		Platform.OS === "web"
			? "http://127.0.0.1:3000"
			: "http://192.168.1.222:3000",
	gamesPerfix: `/games`,
	singleGamePerfix: `/games/`,
	userPerfix: `/users/`,
	addGameToVaultPerfix: `/users/vault/addGame`,
	allTreasuresPerfix: `/treasures`,
};

// export function getGamesListRequest(gamesCount: number, currentPage?: number) {
// 	return `${RAWG_API_URL.games}?${
// 		currentPage ? `page=${currentPage}` : ``
// 	}&page_size=${gamesCount}&key=${RAWG_API_KEY}`;
// }

export function buildMockGamesListRequest() {
	return `${MOCK_RAWG_API_URL.base}${MOCK_RAWG_API_URL.gamesPerfix}`;
}

export function buildMockGameRequest(gameId: string) {
	return `${MOCK_RAWG_API_URL.base}${MOCK_RAWG_API_URL.singleGamePerfix}${gameId}`;
}

export function buildMockUserRequest(username: string) {
	return `${MOCK_RAWG_API_URL.base}${MOCK_RAWG_API_URL.userPerfix}${username}`;
}

export function buildMockAddGameToUserVaultUri() {
	return `${MOCK_RAWG_API_URL.base}${MOCK_RAWG_API_URL.addGameToVaultPerfix}`;
}

export function buildMockAddGameToUserVaultBody(
	username: string,
	gameToVaultId: number
) {
	return {
		username: username,
		gameId: gameToVaultId,
	};
}

export function buildMockAllTreasuresUri() {
	return `${MOCK_RAWG_API_URL.base}${MOCK_RAWG_API_URL.allTreasuresPerfix}`;
}
