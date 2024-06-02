import {
	BarcodeScanningResult,
	Camera,
	CameraType,
	CameraView,
	useCameraPermissions,
} from "expo-camera";
import { Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useState } from "react";

export default function CameraViewScreen() {
	const [facing, setFacing] = useState<CameraType>("front");
	const [scanned, setScanned] = useState(false);
	const [scannedBarcode, setscannedBarcode] = useState<BarcodeScanningResult>();
	const [permission, requestPermission] = useCameraPermissions();

	if (!permission) {
		console.log("Please approve camera permissions");
		return <Text>Waiting for camera permissions....</Text>;
	}

	if (!permission.granted) {
		console.log("why kaha?");

		return (
			<Pressable onPress={requestPermission}>
				<Text style={{ color: "red" }}>
					no camera for you. unless you approve:
				</Text>
			</Pressable>
		);
	}

	function toggleCameraDirection() {
		setFacing((current) => (current === "back" ? "front" : "back"));
	}

	function handleBarcodeScanned(scanningResult: BarcodeScanningResult): void {
		console.log(
			`Barcode type ${scanningResult.type} scanned: ${scanningResult.data}`
		);
		setscannedBarcode(scanningResult);
		setScanned(true);
	}

	function handleRescan(): void {
		setscannedBarcode(undefined);
		setScanned(false);
	}

	return (
		<View style={{ height: "100%", width: "100%" }}>
			<CameraView
				barcodeScannerSettings={{
					barcodeTypes: [
						"aztec",
						"ean13",
						"ean8",
						"qr",
						"pdf417",
						"upc_e",
						"datamatrix",
						"code39",
						"code93",
						"itf14",
						"codabar",
						"code128",
						"upc_a",
					],
				}}
				onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
				style={{ flex: 1, width: 400 }}
				facing={facing}
			></CameraView>
			<Pressable onPress={toggleCameraDirection}>
				<Text>Toggle camera</Text>
			</Pressable>
			<Pressable onPress={handleRescan}>
				<Text>Scan!</Text>
			</Pressable>
			<Text style={{ flex: 1, width: 300 }}>
				Scanned barcode: {scannedBarcode?.data}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({});
