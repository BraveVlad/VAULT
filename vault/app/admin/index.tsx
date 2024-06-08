import AdminMapView from "@/components/admin/AdminMapView";
import TreasuresListView from "@/components/admin/TreasuresListView";
import { mainStyles } from "@/constants/Styles";
import { useState } from "react";
import { View, Text } from "react-native";

export default function AdminScreen() {
	const [selectedTreasure, setSelectedTreasure] = useState<
		string | undefined
	>();

	function handleSelectedTreasure(treasureId: string) {
		setSelectedTreasure(treasureId);
	}
	return (
		<View style={[mainStyles.AdminScreen, { gap: 6 }]}>
			<TreasuresListView
				selectedTreasure={selectedTreasure}
				onSelectedTreasure={handleSelectedTreasure}
			/>
			<AdminMapView selectedTreasureId={selectedTreasure} />
		</View>
	);
}
