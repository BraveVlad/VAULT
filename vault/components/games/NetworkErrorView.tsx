import {
	GestureResponderEvent,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Image,
} from "react-native";
import React from "react";
import refreshIcon from "@/assets/images/replay.png";

type NetworkErrorViewProps = {
	clientErrorMessage: string;
	onRefresh?: (event: GestureResponderEvent) => void;
	debugError?: string;
	isShowDebugError: boolean;
};
const NetworkErrorView = ({
	clientErrorMessage,
	debugError,
	onRefresh,
	isShowDebugError,
}: NetworkErrorViewProps) => {
	return (
		<View style={styles.mainListContainer}>
			<Text style={styles.clientMessage}>{clientErrorMessage}</Text>
			<Pressable style={styles.refreshContainer} onPress={onRefresh}>
				<Image style={styles.refreshIcon} source={refreshIcon} />
				<Text style={styles.clientMessage}> Try Again</Text>
			</Pressable>
			{isShowDebugError && (
				<ScrollView>
					<Text style={styles.debugError}>Reason: {debugError}</Text>
				</ScrollView>
			)}
		</View>
	);
};

export default NetworkErrorView;

const styles = StyleSheet.create({
	mainListContainer: {
		alignItems: "center",
		height: "100%",
	},
	clientMessage: {
		color: "white",
		fontFamily: "bold",
	},
	debugError: {
		color: "red",
	},
	refreshContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 8,
	},
	refreshIcon: {
		width: 16,
		height: 16,
	},
});
