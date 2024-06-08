import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import { ParentPlatform } from "@/models/Game.Model";
import PlatformIcon from "./platform-icons/PlatformIcon";

type PlatformsListViewProps = {
	platforms: ParentPlatform[];
	style?: StyleProp<ViewStyle>;
};

export default function PlatformsListView({
	platforms,
	style,
}: PlatformsListViewProps) {
	return (
		<View style={[styles.platforms, style]}>
			{platforms.map((platform) => (
				<PlatformIcon
					platform={platform}
					key={platform.platform.id}
					style={styles.platforms__icon}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	platforms: {
		alignSelf: "flex-start",
		marginStart: 4,
		flexDirection: "row",
		marginVertical: 6,
		gap: 6,
	},
	platforms__icon: {
		width: 16,
		height: 16,
		resizeMode: "contain",
	},
});
