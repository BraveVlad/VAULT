import useGame from "@/hooks/useGame";
import { Treasure, Treasures } from "@/models/Treasure.Model";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
	View,
	Text,
	FlatList,
	Pressable,
	ListRenderItemInfo,
	StyleSheet,
	Image,
} from "react-native";

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

	function renderTreasureItem({ item }: ListRenderItemInfo<Treasure>) {
		return <TreasureListViewItem treasure={item} />;
	}

	return (
		<View>
			{allTreasuresQuery.isLoading && <Text>Loading all treasures...</Text>}
			{allTreasuresQuery.isSuccess && (
				<FlatList
					style={styles.TreasureList}
					data={allTreasuresQuery.data}
					keyExtractor={(treasure) => treasure.id}
					renderItem={renderTreasureItem}
				/>
			)}
		</View>
	);
}

type TreasureListViewItemProps = {
	treasure: Treasure;
};

function TreasureListViewItem({ treasure }: TreasureListViewItemProps) {
	const lootGame = useGame(treasure.loot.relatedGameId.toString());

	return (
		<Pressable>
			<Text>ID: {treasure.id}</Text>
			<Text>Loot:</Text>
			<View style={styles.TreasureLoot__View}>
				<Image
					style={styles.TreasureLoot__Image}
					source={{ uri: lootGame.query.data?.background_image }}
				/>
				<Text>{lootGame.query.data?.name}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	TreasureList: {
		height: "25%",
	},
	TreasureItem: {},
	TreasureLoot__View: {
		flexDirection: "row",
		gap: 8,
	},
	TreasureLoot__Image: {
		width: 16,
		aspectRatio: 1,
	},
});
