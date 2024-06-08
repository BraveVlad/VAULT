import { TreasureLocation, Treasures } from "@/models/Treasure.Model";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Circle, Marker } from "react-native-maps";
import vaultIcon from "@/assets/images/vault.png";
import { useTreasures } from "@/hooks/useTreasures";

const INITAL_REGION_DIMONA = {
	latitude: 31.06804890787784,
	longitude: 35.03470162759657,
	latitudeDelta: 0.05,
	longitudeDelta: 0.05,
};

export default function AdminMapView() {
	const mapRef = useRef<MapView>(null);
	const treasuresQuery = useTreasures();

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
						id={treasure.id}
						isLootHidden={treasure.isLootHidden}
						lootImage={treasure.loot.lootImage}
						location={treasure.location}
					/>
				))}
		</MapView>
	);
}

/*
{treasuresQuery.isSuccess &&
				treasuresQuery.data.map((treasure) => {
					;
				})}
*/

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
	const [markerImage, setMarkerImage] = useState<string>("");

	useEffect(() => {
		const imageUri = isLootHidden ? vaultIcon : lootImage;

		setMarkerImage(imageUri);
	}, [markerImage]);

	return (
		<View>
			<Circle
				style={{ backgroundColor: "red" }}
				center={{
					latitude: location.coordinate.latitude,
					longitude: location.coordinate.longitude,
				}}
				radius={location.huntRadiusInKm}
				fillColor="#FD8C73"
			/>
			<Marker coordinate={location.coordinate}>
				<Image
					source={{
						uri: markerImage,
					}}
					style={{ width: 32, height: 32, borderRadius: 50 }}
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

/*
{/* <Circle
				style={{ backgroundColor: "red" }}
				center={{
					latitude: location
						? location.coords.latitude + 0.0011
						: REGION_DIMONA.latitude + 0.001,
					longitude: location
						? location.coords.longitude + 0.001
						: REGION_DIMONA.longitude + 0.001,
				}}
				radius={50}
				fillColor="#FD8C73"
			/> 
			{/* <Marker
					coordinate={{
						latitude: location
							? location.coords.latitude + 0.001
							: REGION_DIMONA.latitude + 0.001,
						longitude: location
							? location.coords.longitude + 0.001
							: REGION_DIMONA.longitude + 0.001,
					}}
				> 
			{/* <View
						style={
							{
								// backgroundColor: colors.primary,
								// padding: 10,
								// borderRadius: 64,
							}
						}
					>
						<Image
							source={{
								uri: "https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg",
							}}
							style={{ width: 32, height: 32, borderRadius: 50 }}
						/> 
			{/* </View> 
			{/* </Marker> 
*/
