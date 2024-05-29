import { GamesSwipeCardsView } from "@/components/games/GamesSwipeCardsView";
import NetworkErrorView from "@/components/games/NetworkErrorView";
import { mainStyles } from "@/constants/Styles";
import { Text, View } from "react-native";

export default function DiscoverScreen() {
	return (
		<View style={mainStyles.Screen}>
			<GamesSwipeCardsView />
		</View>
	);
}
