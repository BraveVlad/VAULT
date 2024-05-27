import { getMockGamesListRequest } from "@/constants/Api";
import { mainStyles } from "@/constants/Styles";
import { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	Pressable,
	ScrollView,
} from "react-native";
import axios from "axios";
import {
	ApiResponse as GamesResponse,
	Game,
	Games,
	ApiResponse,
} from "@/models/Game.Model";
import GameslistView from "@/components/search-screen/GameslistView";
import { useQuery } from "@tanstack/react-query";
import refreshIcon from "@/assets/images/replay.png";

async function fetchGames() {
	const request = getMockGamesListRequest();

	return axios.get(request).then(async (response) => response.data);
}

export default function SearchScreen() {
	const { data, isLoading, isSuccess, isError, error, refetch } =
		useQuery<ApiResponse>({
			queryKey: ["allGames"],
			queryFn: fetchGames,
		});

	const refreshList = () => {
		refetch();
	};

	return (
		<View style={mainStyles.Screen}>
			{isLoading && <Text style={styles.loadingMessage}>loading games...</Text>}
			{isError && (
				<View>
					<Text style={styles.errorMessage}>
						Failed fetching games from server.
					</Text>
					<Pressable onPress={refreshList}>
						<Image source={refreshIcon} />
					</Pressable>
					<ScrollView>
						<Text style={styles.errorMessage}>{error.message}</Text>
					</ScrollView>
				</View>
			)}
			{isSuccess && (
				<View>
					<Text style={mainStyles.Text}>Total Games: {data.count}</Text>
					<GameslistView gamesList={data.results} />
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	errorMessage: {
		color: "red",
	},
	loadingMessage: {
		color: "white",
	},
});
