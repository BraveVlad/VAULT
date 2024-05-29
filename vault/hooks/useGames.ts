import { getMockGamesListRequest } from "@/constants/Api";
import axios from "axios";
import { ApiResponse as GamesResponse } from "@/models/Game.Model";
import { useQuery } from "@tanstack/react-query";

async function fetchGames() {
	const request = getMockGamesListRequest();
	return axios.get(request).then(async (response) => response.data);
}

export default function useGames() {
	const gamesQuery = useQuery<GamesResponse>({
		queryKey: ["allGames"],
		queryFn: fetchGames,
	});

	return {
		gamesQuery,
	};
}
