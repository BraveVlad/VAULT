import { buildMockAllTreasuresUri } from "@/constants/Api";
import { Treasures } from "@/models/Treasure.Model";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchAllTreasuresAsync() {
	const request = buildMockAllTreasuresUri();
	const result = await axios.get(request);
	return result.data as Treasures;
}

export function useTreasures() {
	return useQuery<Treasures>({
		queryKey: ["AllTreasures"],
		queryFn: fetchAllTreasuresAsync,
	});
}
