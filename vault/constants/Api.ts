export const RAWG_API_KEY = "35e4dff1865d4e3588512be0a0c01bb9";
export const RAWG_API_URL = {
	base: "https://api.rawg.io/api/",
	games: "https://api.rawg.io/api/games",
};

export function getGamesListRequest(gamesCount: number, currentPage?: number) {
	return `${RAWG_API_URL.games}?${
		currentPage ? `page=${currentPage}` : ``
	}&page_size=${gamesCount}&key=${RAWG_API_KEY}`;
}
