import { Text, View } from "react-native";
import React from "react";
import { Redirect, useLocalSearchParams } from "expo-router";
import { getMockGameRequest } from "@/constants/Api";
import axios from "axios";
import { Game } from "@/models/Game.Model";
import { useQuery } from "@tanstack/react-query";
import { mainStyles } from "@/constants/Styles";
import NetworkErrorView from "@/components/games/NetworkErrorView";
import GamesListItemView from "@/components/games/GamesListItemView";
import useGame from "@/hooks/useGame";
import useGameIdParam from "@/hooks/useGameIdParam";

function SingleGameScreen() {
	const { gameId, isInvalidParam } = useGameIdParam();

	if (!gameId || isInvalidParam) return <Redirect href={"/game/NotFound"} />;

	const { query: gameQuery, isNotFound } = useGame(gameId!);

	if (isNotFound) {
		return <Redirect href={"/game/NotFound"} />;
	}

	function refresh(): void {
		gameQuery.refetch();
	}

	return (
		<View style={mainStyles.Screen}>
			{gameQuery.isLoading && <Text>Loading game id: {gameId}...</Text>}
			{gameQuery.isError && (
				<NetworkErrorView
					clientErrorMessage="Couldn't load game data."
					debugError={gameQuery.error.message}
					isShowDebugError={true}
					onRefresh={refresh}
				/>
			)}
			{gameQuery.isSuccess && (
				<GamesListItemView
					gameId={gameQuery.data.id}
					title={gameQuery.data.name}
					imageUri={gameQuery.data.background_image}
				/>
			)}
		</View>
	);
}

export default SingleGameScreen;
