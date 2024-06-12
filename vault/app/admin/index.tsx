import AdminMapView from "@/components/admin/AdminMapView";
import TreasuresListView from "@/components/admin/TreasuresListView";
import { mainStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { useState } from "react";
import { Platform, Text, View } from "react-native";

export default function AdminScreen() {
	const [selectedTreasure, setSelectedTreasure] = useState<
		string | undefined
	>();

	function handleSelectedTreasure(treasureId: string) {
		setSelectedTreasure(treasureId);
	}

	return (
		<View style={[mainStyles.AdminScreen, { gap: 6 }]}>
			<Link push href="/admin/create-treasure">
				<Text>New Treasure</Text>
			</Link>

			<TreasuresListView
				selectedTreasure={selectedTreasure}
				onSelectedTreasure={handleSelectedTreasure}
			/>
			{Platform.OS !== "web" && (
				<AdminMapView selectedTreasureId={selectedTreasure} />
			)}
		</View>
	);
}
