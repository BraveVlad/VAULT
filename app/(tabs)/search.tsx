import { mainStyles } from "@/constants/Styles";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

function fetchGames() {
	// const key = Constants.manifest2?.extra.rawgApiKey;
}

export default function SearchScreen() {
	const [gamesList, setGamesList] = useState();
	// TODO - FETCH RAWG API

	useEffect(() => {
		//mount
		fetchGames();

		return () => {
			//unmount
		};
	}, []);
	return (
		<View style={mainStyles.Screen}>
			<Text style={mainStyles.Text}>SEARCH</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	test: {
		color: "red",
	},
});
