import { TreasureLocation, Treasures } from "@/models/Treasure.Model";
import { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Circle, Marker } from "react-native-svg";

const INITAL_REGION_DIMONA = {
	latitude: 31.06804890787784,
	longitude: 35.03470162759657,
	latitudeDelta: 0.05,
	longitudeDelta: 0.05,
};

type AdminMapViewProps = {
	treasures: Treasures;
};
export default function AdminMapView({ treasures }: AdminMapViewProps) {
	const mapRef = useRef<MapView>(null);

	return (
		<MapView
			ref={mapRef}
			style={styles.map}
			provider={PROVIDER_GOOGLE}
			showsUserLocation={true}
			showsMyLocationButton={true}
			initialRegion={{
				latitude: INITAL_REGION_DIMONA.latitude,
				longitude: INITAL_REGION_DIMONA.longitude,
				latitudeDelta: INITAL_REGION_DIMONA.latitudeDelta,
				longitudeDelta: INITAL_REGION_DIMONA.longitudeDelta,
			}}
		></MapView>
	);
}

type TreasureMarkerViewProps = {
	id: string;
	isLootHidden: boolean;
	lootImage: string;
	location: TreasureLocation;
};
function TreasureMarkerView({
	id,
	isLootHidden,
	lootImage,
	location,
}: TreasureMarkerViewProps) {
	return <Marker></Marker>;
}

const styles = StyleSheet.create({
	map: {
		width: "100%",
		aspectRatio: 1 / 1,
	},
});
