import { mainStyles } from "@/constants/Styles";
import { View } from "react-native";

import GamesListView from "@/components/games/GamesListView";

export default function SearchScreen() {
	return (
		<View style={mainStyles.Screen}>
			<GamesListView />
		</View>
	);
}
