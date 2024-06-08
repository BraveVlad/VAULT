import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/constants/Colors";
import { fontSizes, layoutSizes, spacingSizes } from "@/constants/Sizes";

export default function TopBar() {
	return (
		<View style={styles.TopBarLayout}>
			<Text style={styles.TopBarLogo}>VAULT</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	TopBarLayout: {
		flexDirection: "row",
		paddingTop: spacingSizes.topBarStatusOffset,
		height: layoutSizes.topbar,
		backgroundColor: colors.background,
		alignItems: "flex-start",
	},
	TopBarLogo: {
		color: colors.textPrimary,
		fontSize: fontSizes.logo,
		marginStart: spacingSizes.logoMargins,
		fontFamily: "bold",
	},
});
