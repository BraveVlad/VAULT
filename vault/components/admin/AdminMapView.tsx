import { TreasureLocation } from "@/models/Treasure.Model";
import { useEffect, useRef } from "react";
import { StyleSheet, View, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Circle, Marker } from "react-native-maps";
import vaultIcon from "@/assets/images/vault.png";
import { useTreasures } from "@/hooks/useTreasures";
import useGame from "@/hooks/useGame";
import { colors } from "@/constants/Colors";

const INITAL_REGION_DIMONA = {
	latitude: 31.06804890787784,
	longitude: 35.03470162759657,
	latitudeDelta: 0.05,
	longitudeDelta: 0.05,
};

type AdminMapViewProps = {
	selectedTreasureId: string | undefined;
};
export default function AdminMapView({
	selectedTreasureId,
}: AdminMapViewProps) {
	const mapRef = useRef<MapView>(null);
	const treasuresQuery = useTreasures();

	useEffect(() => {
		const selectedTreasureLocation = treasuresQuery.data?.find(
			(treasure) => treasure.id === selectedTreasureId
		);
		if (!selectedTreasureLocation) return;

		mapRef.current?.animateCamera({
			center: selectedTreasureLocation.location.coordinate,
			heading: 0,
			pitch: 90,
			zoom: 18,
		});
	}, [selectedTreasureId]);
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
		>
			{treasuresQuery.isSuccess &&
				treasuresQuery.data.map((treasure) => (
					<TreasureMarkerView
						key={treasure.id}
						gameId={treasure.loot.relatedGameId}
						isLootHidden={treasure.isLootHidden}
						location={treasure.location}
					/>
				))}
		</MapView>
	);
}

type TreasureMarkerViewProps = {
	gameId: number;
	isLootHidden: boolean;
	location: TreasureLocation;
};
function TreasureMarkerView({
	gameId,
	isLootHidden,
	location,
}: TreasureMarkerViewProps) {
	const gameQuery = useGame(gameId.toString());

	return (
		<View>
			<Circle
				style={{ backgroundColor: "red" }}
				center={{
					latitude: location.coordinate.latitude,
					longitude: location.coordinate.longitude,
				}}
				radius={location.huntRadiusInKm}
				fillColor={colors.treasureRadiusBackground}
			/>
			<Marker coordinate={location.coordinate}>
				<Image
					source={
						isLootHidden || !gameQuery.query.data?.background_image
							? vaultIcon
							: {
									uri: isLootHidden
										? vaultIcon
										: gameQuery.query.data?.background_image,
							  }
					}
					style={{
						width: 32,
						height: 32,
						borderRadius: 50,
						backgroundColor: colors.background,
					}}
				/>
			</Marker>
		</View>
	);
}

const styles = StyleSheet.create({
	map: {
		width: "100%",
		aspectRatio: 1 / 1,
	},
});
