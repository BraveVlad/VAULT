import { StyleSheet } from "react-native";
import { colors } from "./Colors";
import { layoutSizes, spacingSizes } from "./Sizes";

export const mainStyles = StyleSheet.create({
	Screen: {
		height: "100%",
		backgroundColor: colors.background,
		padding: spacingSizes.screenPadding,
	},
	Text: {
		color: colors.textPrimary,
	},
});
