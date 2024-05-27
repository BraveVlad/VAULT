import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getMockGameRequest, getMockGamesListRequest } from "@/constants/Api";
import axios from "axios";
import { Game } from "@/models/Game.Model";

async function fetchGame(gameId: string) {
	const request = getMockGameRequest(gameId);

	return axios
		.get(request)
		.then(async (response) => {
			const gamesData = response.data;
			return gamesData;
		})
		.catch((error) => {
			console.error(error);
			return {} as Game;
		});
}

function GamePageView() {
	const { gameId } = useLocalSearchParams<{ gameId: string }>();

	const [game, setGame] = useState<Game>();

	useEffect(() => {
		fetchGame(gameId!).then(setGame);
	}, []);

	return (
		<View>
			<Text>Game: {game?.name}</Text>
		</View>
	);
}

export default GamePageView;

const styles = StyleSheet.create({});
