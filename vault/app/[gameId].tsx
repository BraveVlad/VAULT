import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getMockGameRequest, getMockGamesListRequest } from "@/constants/Api";
import axios from "axios";
import { Game } from "@/models/Game.Model";
import { QueryClient, useQuery } from "@tanstack/react-query";
import GameResultView from "@/components/search-screen/GameResultView";
import { colors } from "@/constants/Colors";

async function fetchGame(gameId: string): Promise<Game> {
	const request = getMockGameRequest(gameId);

	return axios.get(request).then((response) => {
		return response.data;
	});
}

function GamePageView() {
	const { gameId } = useLocalSearchParams<{ gameId: string }>();
	if (!gameId) return <Text>No game id provided.</Text>;

	const { data, isLoading, isSuccess, isError, error } = useQuery<Game>({
		queryKey: ["singleGame"],
		queryFn: () => fetchGame(gameId),
	});

	if (isLoading) return <Text>Loading game id: {gameId}...</Text>;
	if (isError) {
		console.error(error);
		return (
			<Text style={{ color: "red" }}>Failed loading game id: {gameId}!</Text>
		);
	}
	if (isSuccess) {
		if (!data)
			return (
				<Text style={{ color: "red" }}>No such game with id:{gameId}!</Text>
			);

		return (
			<View style={{ height: "100%", backgroundColor: colors.background }}>
				<GameResultView
					gameId={data.id}
					title={data.name}
					imageUri={data.background_image}
				/>
			</View>
		);
	}
}

export default GamePageView;

const styles = StyleSheet.create({});
