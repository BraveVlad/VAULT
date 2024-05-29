import { Pressable, StyleSheet, Image, View } from "react-native";
import React from "react";
import { Slot, useRouter } from "expo-router";
import { mainStyles } from "@/constants/Styles";
import closeButton from "@/assets/images/clear.png";

export default function GameScreensLayout() {
	const router = useRouter();

	function handleBackButton() {
		router.navigate("/search");
	}

	return (
		<View style={mainStyles.Screen}>
			<Pressable onPress={handleBackButton}>
				<Image style={styles.BackButton} source={closeButton} />
			</Pressable>
			<Slot />
		</View>
	);
}

const styles = StyleSheet.create({
	BackButton: {
		width: 16,
		height: 16,
	},
});
