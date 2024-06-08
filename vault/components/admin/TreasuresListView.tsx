import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { View, Text } from "react-native";

async function fetchAllTreasuresAsync() {
	const request = "http://127.0.0.1:3000/treasures";
	const result = await axios.get(request);
	return result.data;
}

export default function TreasuresListView() {
	return (
		<View>
			<Text>Treasures List View</Text>
		</View>
	);
}
