import TreasuresListView from "@/components/admin/TreasuresListView";
import { mainStyles } from "@/constants/Styles";
import { View, Text } from "react-native";

export default function AdminScreen() {
	return (
		<View style={mainStyles.AdminScreen}>
			<Text> Welcome to admin page!</Text>
			<TreasuresListView />
		</View>
	);
}
