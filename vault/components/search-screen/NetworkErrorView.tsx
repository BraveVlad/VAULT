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
import { mainStyles } from "@/constants/Styles";
import refreshIcon from "@/assets/images/replay.png";

type NetworkErrorViewProps = {
	clientErrorMessage: string;
	onRefresh: (event: GestureResponderEvent) => void;
	debugError: string;
	isShowDebugError: boolean;
};
const NetworkErrorView = ({
	clientErrorMessage,
	debugError,
	onRefresh,
	isShowDebugError,
}: NetworkErrorViewProps) => {
	return (
		<View style={mainStyles.Screen}>
			<Text style={styles.clientMessage}>{clientErrorMessage}</Text>
			<Pressable onPress={onRefresh}>
				<Image source={refreshIcon} />
			</Pressable>
			{isShowDebugError && (
				<ScrollView>
					<Text style={styles.debugError}>{debugError}</Text>
				</ScrollView>
			)}
		</View>
	);
};

export default NetworkErrorView;

const styles = StyleSheet.create({
	clientMessage: {
		color: "white",
		fontFamily: "bold",
	},
	debugError: {
		color: "red",
	},
	refreshIcon: {
		width: 32,
		height: 32,
	},
});
