import { GamesSwipeCardsView } from "@/components/games/GamesSwipeCardsView";
import { mainStyles } from "@/constants/Styles";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function DiscoverScreen() {
	function handleOpenAdminPanel(): void {
		router.navigate("/admin");
	}
	return (
		<View style={mainStyles.Screen}>
			<Pressable onPress={handleOpenAdminPanel}>
				<Text>Press to open admin panel</Text>
			</Pressable>

			<GamesSwipeCardsView />
		</View>
	);
}
