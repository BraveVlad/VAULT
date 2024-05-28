import { mainStyles } from "@/constants/Styles";
import { View } from "react-native";

import GameslistView from "@/components/search-screen/GameslistView";

export default function SearchScreen() {
	return (
		<View style={mainStyles.Screen}>
			<GameslistView />
		</View>
	);
}
