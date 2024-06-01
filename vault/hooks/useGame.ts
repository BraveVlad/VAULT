import { buildMockGameRequest } from "@/constants/Api";
import axios from "axios";
import { Game } from "@/models/Game.Model";
import { useQuery } from "@tanstack/react-query";
import NetworkErrorView from "@/components/games/NetworkErrorView";

async function fetchGame(gameId: string): Promise<Game> {
	const request = buildMockGameRequest(gameId);

	return axios.get(request).then((response) => {
		return response.data;
	});
}

export default function useGame(gameId: string) {
	const gameQuery = useQuery<Game>({
		queryKey: ["games", gameId],
		queryFn: () => fetchGame(gameId),
	});

	const isNotFound = gameQuery.isSuccess && !gameQuery.data;

	return {
		query: gameQuery,
		isNotFound: isNotFound,
	};
}
