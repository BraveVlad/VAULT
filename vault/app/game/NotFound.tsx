import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { mainStyles } from "@/constants/Styles";

const NotFound = () => {
	return (
		<View style={mainStyles.Screen}>
			<Text style={mainStyles.Text}>Unable to find game!</Text>
		</View>
	);
};

export default NotFound;

const styles = StyleSheet.create({});
