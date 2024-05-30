import { Text, View } from "react-native";
import React from "react";
import { Redirect, useLocalSearchParams } from "expo-router";
import { buildMockGameRequest } from "@/constants/Api";
import axios from "axios";
import { Game } from "@/models/Game.Model";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { mainStyles } from "@/constants/Styles";
import NetworkErrorView from "@/components/games/NetworkErrorView";
import GamesListItemView from "@/components/games/GamesListItemView";
import useGame from "@/hooks/useGame";
import useGameIdParam from "@/hooks/useGameIdParam";
import GamePageView from "@/components/games/GamePageView";

export default function SingleGameScreen() {
	const { gameId, isInvalidParam } = useGameIdParam();

	if (!gameId || isInvalidParam) return <Redirect href={"/game/NotFound"} />;

	const { query, isNotFound } = useGame(gameId!);

	if (isNotFound) {
		return <Redirect href={"/game/NotFound"} />;
	}

	function refresh(): void {
		query.refetch();
	}

	return (
		<View style={mainStyles.Screen}>
			{query.isLoading && <Text>Loading game id: {gameId}...</Text>}
			{query.isError && (
				<NetworkErrorView
					clientErrorMessage="Couldn't load game data."
					debugError={query.error.message}
					isShowDebugError={true}
					onRefresh={refresh}
				/>
			)}
			{query.isSuccess && <GamePageView game={query.data} />}
		</View>
	);
}
