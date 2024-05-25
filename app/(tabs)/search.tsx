import { mainStyles } from "@/constants/Styles";
import { StyleSheet, Text, View } from "react-native";

export default function SearchScreen() {
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
