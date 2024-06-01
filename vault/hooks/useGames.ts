import { buildMockGamesListRequest } from "@/constants/Api";
import axios from "axios";
import { ApiResponse, ApiResponse as GamesResponse } from "@/models/Game.Model";
import { useQuery } from "@tanstack/react-query";

async function fetchGames() {
	const request = buildMockGamesListRequest();
	const result = await axios.get(request);
	return result.data as ApiResponse;
}

export default function useGames() {
	const gamesQuery = useQuery<GamesResponse>({
		queryKey: ["games"],
		queryFn: fetchGames,
	});

	return {
		gamesQuery,
	};
}
