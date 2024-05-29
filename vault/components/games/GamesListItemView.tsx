import {
	Image,
	ImageSourcePropType,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { colors } from "@/constants/Colors";
import { fonts } from "@/constants/Fonts";
import { useRouter } from "expo-router";

type GameResultViewProps = {
	gameId: number;
	title: string;
	// imageUri: ImageSourcePropType;
	imageUri: string;
};

export default function GameResultView({
	gameId,
	title,
	imageUri,
}: GameResultViewProps) {
	const router = useRouter();

	function openGamePageModal() {
		console.log(`Opening game page modal of: ${gameId}`);
		router.push(`/game/${gameId}`);
	}

	return (
		<Pressable style={styles.Container} onPress={openGamePageModal}>
			<Image style={styles.Image} source={{ uri: imageUri }} />
			<Text style={styles.Title}>{title}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	Container: {
		width: 128,
		alignItems: "center",
		// flexBasis: "50%",
		aspectRatio: 1,
		// borderWidth: 4,
	},
	Image: {
		width: 82,
		height: 82,
		borderRadius: 16,
		borderWidth: 4,
		borderColor: colors.border,
	},
	Title: {
		marginVertical: 8,
		color: colors.textPrimary,
		fontFamily: fonts.bold,
		textAlign: "center",
		width: "100%",
		overflow: "hidden",
		fontSize: 16,
	},
});
