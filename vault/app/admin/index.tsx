import AdminMapView from "@/components/admin/AdminMapView";
import TreasuresListView from "@/components/admin/TreasuresListView";
import { mainStyles } from "@/constants/Styles";
import { View, Text } from "react-native";

export default function AdminScreen() {
	return (
		<View style={[mainStyles.AdminScreen, { gap: 6 }]}>
			<TreasuresListView />
			<AdminMapView />
		</View>
	);
}
