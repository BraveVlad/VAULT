import { GamesSwipeCardsView } from "@/components/games/GamesSwipeCardsView";
import { mainStyles } from "@/constants/Styles";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function DiscoverScreen() {
	function handleOpenCamera(): void {
		router.navigate("/modules/camera");
	}
	function handleOpenLocation(): void {
		router.navigate("/modules/locations");
	}
	return (
		<View style={mainStyles.Screen}>
			<Pressable onPress={handleOpenCamera}>
				<Text>Pres to open camera</Text>
			</Pressable>
			<Pressable onPress={handleOpenLocation}>
				<Text>Pres to open location testing</Text>
			</Pressable>
			<GamesSwipeCardsView />
		</View>
	);
}
