import TreasuresListView from "@/components/admin/TreasuresListView";
import { View, Text } from "react-native";

export default function AdminScreen() {
	return (
		<View>
			<Text> Welcome to admin page!</Text>
			<TreasuresListView />
		</View>
	);
}
