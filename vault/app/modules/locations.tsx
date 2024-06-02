import { Text, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
	requestForegroundPermissionsAsync,
	LocationObject,
	enableNetworkProviderAsync,
	getCurrentPositionAsync,
	Accuracy,
} from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const REGION_ISRAEL = {
	latitude: 31.06804890787784,
	longitude: 35.03470162759657,
};

export default function GeolocationView() {
	const [location, setLocation] = useState<LocationObject>();
	const [errorMessage, setErrorMessage] = useState<string>();

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

	return (
		<View style={{ height: "100%", width: "100%" }}>
			<Text>Location:</Text>
			<Text>{message}</Text>
			<MapView
				style={styles.map}
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: REGION_ISRAEL.latitude,
					longitude: REGION_ISRAEL.longitude,
					latitudeDelta: 1,
					longitudeDelta: 1,
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	map: {
		width: "100%",
		aspectRatio: 1 / 1,
	},
});
