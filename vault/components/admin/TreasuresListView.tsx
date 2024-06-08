import { buildMockAllTreasuresUri } from "@/constants/Api";
import { colors } from "@/constants/Colors";
import useGame from "@/hooks/useGame";
import { useTreasures } from "@/hooks/useTreasures";
import { Treasure, Treasures } from "@/models/Treasure.Model";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
	View,
	Text,
	FlatList,
	Pressable,
	ListRenderItemInfo,
	StyleSheet,
	Image,
} from "react-native";

type TreasuresListViewProps = {
	selectedTreasure: string | undefined;
	onSelectedTreasure: (treasureId: string) => void;
};

export default function TreasuresListView({
	selectedTreasure,
	onSelectedTreasure,
}: TreasuresListViewProps) {
	const treasuresQuery = useTreasures();

	function handleItemPressed(itemId: string): void {
		onSelectedTreasure(itemId);
	}

	function renderTreasureItem({ item }: ListRenderItemInfo<Treasure>) {
		const isCurrentItemSelected = selectedTreasure === item.id;

		return (
			<TreasureListViewItem
				treasure={item}
				isSelected={isCurrentItemSelected}
				onItemPressed={handleItemPressed}
			/>
		);
	}

	return (
		<View>
			{treasuresQuery.isLoading && <Text>Loading all treasures...</Text>}
			{treasuresQuery.isSuccess && (
				<FlatList
					style={styles.TreasureList}
					data={treasuresQuery.data}
					keyExtractor={(treasure) => treasure.id}
					renderItem={renderTreasureItem}
					extraData={selectedTreasure}
					contentContainerStyle={{
						gap: 8,
						backgroundColor: colors.textPrimary,
						padding: 8,
						justifyContent: "center",
					}}
					numColumns={2}
				/>
			)}
		</View>
	);
}

type TreasureListViewItemProps = {
	treasure: Treasure;
	isSelected: boolean;
	onItemPressed: (id: string) => void;
};

function TreasureListViewItem({
	treasure,
	isSelected,
	onItemPressed,
}: TreasureListViewItemProps) {
	const lootGame = useGame(treasure.loot.relatedGameId.toString());

	return (
		<Pressable
			style={[
				styles.TreasureItem,
				isSelected ? styles.SelectedItem : undefined,
			]}
			onPress={() => onItemPressed(treasure.id)}
		>
			<Text>ID: {treasure.id}</Text>
			<Text>Loot:</Text>
			<View style={styles.TreasureLoot__View}>
				{!lootGame.query.data?.background_image ? (
					""
				) : (
					<Image
						style={styles.TreasureLoot__Image}
						source={{
							uri: lootGame.query.data?.background_image,
						}}
					/>
				)}
				<Text>{lootGame.query.data?.name}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	TreasureList: {
		height: 250,
	},
	TreasureItem: {
		flexBasis: "50%",
		borderWidth: 1,
		borderColor: colors.backgroundLight,
	},
	SelectedItem: {
		backgroundColor: colors.secondary,
	},
	TreasureLoot__View: {
		flexDirection: "row",
		gap: 8,
	},
	TreasureLoot__Image: {
		width: 16,
		aspectRatio: 1,
	},
});
