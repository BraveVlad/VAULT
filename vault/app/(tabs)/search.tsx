import {
	RAWG_API_KEY,
	getGamesListRequest,
	getMockGamesListRequest,
} from "@/constants/Api";
import { mainStyles } from "@/constants/Styles";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";
import { ApiResponse as GamesResponse, Game } from "@/models/Game.Model";
import GameslistView from "@/components/search-screen/GameslistView";

async function fetchGames() {
	// const request = getGamesListRequest(10);
	const request = getMockGamesListRequest();

	return axios
		.get(request)
		.then(async (response) => {
			const gamesData = response.data;
			// console.log(gamesData);
			return gamesData;
		})
		.catch((error) => {
			console.error(error);
			return {} as GamesResponse;
		});
}

export default function SearchScreen() {
	const [gamesList, setGamesList] = useState<GamesResponse>();

	useEffect(() => {
		//mount
		fetchGames().then(setGamesList);

		return () => {
			//unmount
		};
	}, []);
	return (
		<View style={mainStyles.Screen}>
			<Text style={mainStyles.Text}>Total Games: {gamesList?.count}</Text>
			<GameslistView gamesList={gamesList?.results!} />
		</View>
	);
}

const styles = StyleSheet.create({});
