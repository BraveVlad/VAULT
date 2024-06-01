import { GamesSwipeCardsView } from "@/components/games/GamesSwipeCardsView";
import NetworkErrorView from "@/components/games/NetworkErrorView";
import { mainStyles } from "@/constants/Styles";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function DiscoverScreen() {
	function handlePress(): void {
		router.navigate("/modules/camera");
	}

	return (
		<View style={mainStyles.Screen}>
			<Pressable onPress={handlePress}>
				<Text>Pres to open camera</Text>
			</Pressable>
			<GamesSwipeCardsView />
		</View>
	);
}
