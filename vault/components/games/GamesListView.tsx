import {
	FlatList,
	FlatListProps,
	ListRenderItem,
	ListRenderItemInfo,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React from "react";
import { Game, Games } from "@/models/Game.Model";
import GamesListItemView from "@/components/games/GamesListItemView";
import { spacingSizes } from "@/constants/Sizes";
import { getMockGamesListRequest } from "@/constants/Api";
import { mainStyles } from "@/constants/Styles";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NetworkErrorView from "./NetworkErrorView";
import useGames from "@/hooks/useGames";

function GameslistView() {
	const { data, isLoading, isSuccess, isError, error, refetch } = useGames();

	const refreshList = () => {
		refetch();
	};

	return (
		<>
			{isLoading && <Text style={styles.loadingMessage}>loading games...</Text>}
			{isError && (
				<NetworkErrorView
					clientErrorMessage="Couldn't load games."
					debugError={error.message}
					isShowDebugError={true}
					onRefresh={refreshList}
				/>
			)}
			{isSuccess && (
				<FlatList
					numColumns={2}
					style={styles.GamesList}
					data={data.results}
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

export default GameslistView;

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
