export const MOCK_RAWG_API_URL = {
	base: "http://192.168.1.43:3000",
	gamesPerfix: `/games`,
	singleGamePerfix: `/games/`,
};

// export function getGamesListRequest(gamesCount: number, currentPage?: number) {
// 	return `${RAWG_API_URL.games}?${
// 		currentPage ? `page=${currentPage}` : ``
// 	}&page_size=${gamesCount}&key=${RAWG_API_KEY}`;
// }

export function getMockGamesListRequest() {
	return `${MOCK_RAWG_API_URL.base}${MOCK_RAWG_API_URL.gamesPerfix}`;
}

export function getMockGameRequest(gameId: string) {
	return `${MOCK_RAWG_API_URL.base}${MOCK_RAWG_API_URL.singleGamePerfix}${gameId}`;
}
