import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { getMockGameRequest, getMockGamesListRequest } from "@/constants/Api";
import axios from "axios";
import { Game } from "@/models/Game.Model";
import { QueryClient, useQuery } from "@tanstack/react-query";
import GameResultView from "@/components/search-screen/GameResultView";
import { colors } from "@/constants/Colors";
import { mainStyles } from "@/constants/Styles";
import NetworkErrorView from "@/components/search-screen/NetworkErrorView";

async function fetchGame(gameId: string): Promise<Game> {
	const request = getMockGameRequest(gameId);

	return axios.get(request).then((response) => {
		return response.data;
	});
}

function GamePageView() {
	const { gameId } = useLocalSearchParams<{ gameId: string }>();
	const router = useRouter();
	if (!gameId) {
		return <Redirect href={"/game/NotFound"} />;
	}
	const { data, isLoading, isSuccess, isError, error, refetch } =
		useQuery<Game>({
			queryKey: ["singleGame"],
			queryFn: () => fetchGame(gameId),
		});

	if (isSuccess && !data) {
		return <Redirect href={"/game/NotFound"} />;
	}

	function refreshList(): void {
		refetch();
	}

	return (
		<View style={mainStyles.Screen}>
			{isLoading && <Text>Loading game id: {gameId}...</Text>}
			{isError && (
				<NetworkErrorView
					clientErrorMessage="Couldn't load game data."
					debugError={error.message}
					isShowDebugError={true}
					onRefresh={refreshList}
				/>
			)}
			{isSuccess && (
				<GameResultView
					gameId={data.id}
					title={data.name}
					imageUri={data.background_image}
				/>
			)}
		</View>
	);
}

export default GamePageView;

const styles = StyleSheet.create({});
