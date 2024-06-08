import { Text, View } from "react-native";
import React from "react";
import { mainStyles } from "@/constants/Styles";

export default function NotFound() {
	return (
		<View style={mainStyles.Screen}>
			<Text style={mainStyles.Text}>Unable to find game!</Text>
		</View>
	);
}
