import { RAWG_API_KEY, getGamesListRequest } from "@/constants/Api";
import { mainStyles } from "@/constants/Styles";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";
import { ApiResponse as GamesResponse, Game } from "@/models/Game.Model";

async function fetchGames() {
	const request = getGamesListRequest(10);

	return axios
		.get(request)
		.then(async (response) => {
			const gamesData = response.data;
			console.log(gamesData);
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

			{gamesList?.results.map((game) => (
				<View key={game.id}>
					<Image
						source={{ uri: game.background_image }}
						style={{ width: 32, height: 32 }}
					/>
					<Text style={mainStyles.Text}>{game.name}</Text>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	test: {
		color: "red",
	},
});
