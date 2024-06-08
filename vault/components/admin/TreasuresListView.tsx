import { Treasures } from "@/models/Treasure.Model";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { View, Text } from "react-native";

async function fetchAllTreasuresAsync() {
	const request = "http://127.0.0.1:3000/treasures";
	const result = await axios.get(request);
	return result.data as Treasures;
}

export default function TreasuresListView() {
	const allTreasuresQuery = useQuery<Treasures>({
		queryKey: ["AllTreasures"],
		queryFn: fetchAllTreasuresAsync,
	});

	return (
		<View>
			{allTreasuresQuery.isLoading && <Text>Loading all treasures...</Text>}
			{allTreasuresQuery.isSuccess && (
				<Text>{JSON.stringify(allTreasuresQuery.data[0])}</Text>
			)}
		</View>
	);
}
