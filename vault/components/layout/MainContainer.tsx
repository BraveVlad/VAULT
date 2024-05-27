import { StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren } from "react";
import { colors } from "@/constants/Colors";
import { layoutSizes } from "@/constants/Sizes";

function MainContainer({ children }: PropsWithChildren) {
	return <View style={styles.MainContainer}>{children}</View>;
}

export default MainContainer;

const styles = StyleSheet.create({
	MainContainer: {
		height: "100%",
		backgroundColor: colors.background,
	},
});
