import { getMockGamesListRequest } from "@/constants/Api";
import { mainStyles } from "@/constants/Styles";
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
import NetworkErrorView from "@/components/search-screen/NetworkErrorView";

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
				<NetworkErrorView
					clientErrorMessage="Couldn't load games."
					debugError={error.message}
					isShowDebugError={true}
					onRefresh={refreshList}
				/>
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
	loadingMessage: {
		color: "white",
	},
});
