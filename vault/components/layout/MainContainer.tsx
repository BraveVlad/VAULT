import { StyleSheet, View } from "react-native";
import React, { PropsWithChildren } from "react";
import { colors } from "@/constants/Colors";

export default function MainContainer({ children }: PropsWithChildren) {
	return <View style={styles.MainContainer}>{children}</View>;
}

const styles = StyleSheet.create({
	MainContainer: {
		height: "100%",
		backgroundColor: colors.background,
	},
});
