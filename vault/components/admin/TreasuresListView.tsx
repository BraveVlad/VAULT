import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { View, Text } from "react-native";

async function fetchAllTreasuresAsync() {
	const request = "http://127.0.0.1:3000/treasures";
	const result = await axios.get(request);
	return result.data;
}

export default function TreasuresListView() {
	const allTreasuresQuery = useQuery({
		queryKey: ["AllTreasures"],
		queryFn: fetchAllTreasuresAsync,
	});

	return (
		<View>
			{allTreasuresQuery.isLoading && <Text>Loading all treasures...</Text>}
			<Text>{JSON.stringify(allTreasuresQuery.data)}</Text>
		</View>
	);
}
