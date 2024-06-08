import { Text, StyleSheet, View, Pressable, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
	requestForegroundPermissionsAsync,
	LocationObject,
	enableNetworkProviderAsync,
	getCurrentPositionAsync,
	Accuracy,
} from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";

const REGION_DIMONA = {
	latitude: 31.06804890787784,
	longitude: 35.03470162759657,
};

type Marker = {
	latitude: number;
	longitude: number;
};
export default function GeolocationView() {
	const [location, setLocation] = useState<LocationObject>();
	const [errorMessage, setErrorMessage] = useState<string>();
	const mapRef = useRef<MapView>(null);

	function handleOnLocationChange(location: LocationObject) {
		setLocation(location);
	}
	useEffect(() => {
		async function fetchLocation() {
			console.log(`Requesting location...`);
			const { status } = await requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.log(`Permission to location was denied. status:`);
				console.log(status);
				setErrorMessage(`Permission to location was denied:`);
				return;
			}

			/*
            Asks the user to turn on high accuracy location mode which enables network provider that uses Google Play services to improve location accuracy and location-based services.
            */
			await enableNetworkProviderAsync();

			// let location = await Location.getLastKnownPositionAsync({});
			const location = await getCurrentPositionAsync({
				accuracy: Accuracy.BestForNavigation,
			});

			handleOnLocationChange(location);
		}

		fetchLocation();
	}, []);

	const message = errorMessage ? errorMessage : JSON.stringify(location);

	function handleMoveToDimona() {
		mapRef.current?.animateCamera({
			center: {
				latitude: REGION_DIMONA.latitude,
				longitude: REGION_DIMONA.longitude,
			},
			heading: 0,
			pitch: 90,
			zoom: 15,
		});
	}

	function handleMoveToUser() {
		if (!location) return;
		mapRef.current?.animateCamera({
			center: {
				latitude: location?.coords.latitude,
				longitude: location?.coords.longitude,
			},
			heading: 0,
			pitch: 90,
			zoom: 20,
		});
	}

	function handleCreateMarker() {}
	return (
		<View style={{ height: "100%", width: "100%" }}>
			<Text>Location:</Text>
			<Text>{message}</Text>
			<MapView
				ref={mapRef}
				style={styles.map}
				provider={PROVIDER_GOOGLE}
				showsUserLocation={true}
				showsMyLocationButton={true}
				initialRegion={{
					latitude: REGION_DIMONA.latitude,
					longitude: REGION_DIMONA.longitude,
					latitudeDelta: 0.05,
					longitudeDelta: 0.05,
				}}
			>
				<Circle
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
				<Marker
					coordinate={{
						latitude: location
							? location.coords.latitude + 0.001
							: REGION_DIMONA.latitude + 0.001,
						longitude: location
							? location.coords.longitude + 0.001
							: REGION_DIMONA.longitude + 0.001,
					}}
				>
					<View>
						<Image
							source={{
								uri: "https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg",
							}}
							style={{ width: 32, height: 32, borderRadius: 50 }}
						/>
					</View>
				</Marker>
			</MapView>
			<Pressable onPress={handleMoveToDimona}>
				<Text>Reset to Dimona</Text>
			</Pressable>
			<Pressable onPress={handleMoveToUser}>
				<Text>Look at me</Text>
			</Pressable>
			<Pressable onPress={handleCreateMarker}>
				<Text>Create marker</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	map: {
		width: "100%",
		aspectRatio: 1 / 1,
	},
});
