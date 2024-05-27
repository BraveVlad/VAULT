import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/constants/Colors";
import { fontSizes, layoutSizes, spacingSizes } from "@/constants/Sizes";
import { useMainFonts } from "@/hooks/useFonts";

function TopBar() {
	return (
		<View style={styles.TopBarLayout}>
			<Text style={styles.TopBarLogo}>VAULT</Text>
		</View>
	);
}

export default TopBar;

const styles = StyleSheet.create({
	TopBarLayout: {
		paddingTop: spacingSizes.topBarStatusOffset,
		height: layoutSizes.topbar,
		backgroundColor: colors.background,
		alignItems: "flex-start",
		justifyContent: "center",
	},
	TopBarLogo: {
		color: colors.textPrimary,
		fontSize: fontSizes.logo,
		marginStart: spacingSizes.logoMargins,
		fontFamily: "bold",
	},
});
