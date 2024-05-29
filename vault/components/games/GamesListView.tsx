import { FlatList, ListRenderItemInfo, StyleSheet, Text } from "react-native";
import React from "react";
import { Game } from "@/models/Game.Model";
import GamesListItemView from "@/components/games/GamesListItemView";
import { spacingSizes } from "@/constants/Sizes";
import useGames from "@/hooks/useGames";
import NetworkErrorView from "./NetworkErrorView";

export default function GamesListView() {
	const { gamesQuery } = useGames();

	function refreshList(): void {
		gamesQuery.refetch();
	}

	return (
		<>
			{gamesQuery.isLoading && (
				<Text style={styles.loadingMessage}>loading games...</Text>
			)}
			{gamesQuery.isError && (
				<NetworkErrorView
					clientErrorMessage="Couldn't load game data."
					debugError={gamesQuery.error.message}
					isShowDebugError={true}
					onRefresh={refreshList}
				/>
			)}
			{gamesQuery.isSuccess && (
				<FlatList
					numColumns={2}
					style={styles.GamesList}
					data={gamesQuery.data.results}
					keyExtractor={(item: Game) => `${item.id}`}
					renderItem={({ item }: ListRenderItemInfo<Game>) => {
						return (
							<GamesListItemView
								gameId={item.id}
								title={item.name}
								imageUri={item.background_image}
							/>
						);
					}}
				/>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	GamesList: {
		padding: spacingSizes.screenPadding,
		flexDirection: "row",
		width: "100%",
		flexWrap: "wrap",
	},
	loadingMessage: {
		color: "white",
	},
});
