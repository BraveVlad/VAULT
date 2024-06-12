import { Treasures } from "../models/Treasure.Model";

export const treasures: Treasures = [
	// DIMONA
	{
		id: "treasure11",
		qrValue: "QR111213",
		location: {
			coordinate: { latitude: 31.0672, longitude: 35.0325 }, // Dimona, Israel
			huntRadiusInKm: 20,
		},
		isLootHidden: true,
		collectors: [],
		maxAvailableCollections: 10,
		loot: "loot11",
		creationDate: new Date("2024-05-01T00:00:00Z"),
		expireDate: new Date("2024-08-31T23:59:59Z"),
	},

	{
		id: "treasure150",
		qrValue: "QR111213",
		location: {
			coordinate: { latitude: 31.073915, longitude: 35.028071 }, // Dimona, Israel
			huntRadiusInKm: 20,
		},
		isLootHidden: false,
		collectors: [],
		maxAvailableCollections: 10,
		loot: "loot12",
		creationDate: new Date("2024-05-01T00:00:00Z"),
		expireDate: new Date("2024-08-31T23:59:59Z"),
	},

	{
		id: "treasure153",
		qrValue: "QR111213",
		location: {
			coordinate: { latitude: 31.060148, longitude: 35.020476 }, // Dimona, Israel
			huntRadiusInKm: 50,
		},
		isLootHidden: false,
		collectors: [],
		maxAvailableCollections: 10,
		loot: "loot13",
		creationDate: new Date("2024-05-01T00:00:00Z"),
		expireDate: new Date("2024-08-31T23:59:59Z"),
	},
	{
		id: "treasure12",
		qrValue: "QR141516",
		location: {
			coordinate: { latitude: 31.0679, longitude: 35.0345 }, // Dimona, Israel
			huntRadiusInKm: 3,
		},
		isLootHidden: false,
		collectors: [],
		maxAvailableCollections: 7,
		loot: "loot14",
		creationDate: new Date("2024-07-01T00:00:00Z"),
		expireDate: new Date("2024-10-31T23:59:59Z"),
	},
	{
		id: "treasure13",
		qrValue: "QR171819",
		location: {
			coordinate: { latitude: 31.0676, longitude: 35.0312 }, // Dimona, Israel
			huntRadiusInKm: 4,
		},
		isLootHidden: true,
		collectors: [],
		maxAvailableCollections: 15,
		loot: "loot15",
		creationDate: new Date("2024-08-01T00:00:00Z"),
		expireDate: new Date("2024-11-30T23:59:59Z"),
	},

	// BEER-SHEBA
	{
		id: "treasure14",
		qrValue: "QR202122",
		location: {
			coordinate: { latitude: 31.2586, longitude: 34.7995 }, // Beer-Sheba, Israel
			huntRadiusInKm: 2,
		},
		isLootHidden: true,
		collectors: [],
		maxAvailableCollections: 10,
		loot: "loot16",
		creationDate: new Date("2024-05-01T00:00:00Z"),
		expireDate: new Date("2024-08-31T23:59:59Z"),
	},
	{
		id: "treasure15",
		qrValue: "QR232425",
		location: {
			coordinate: { latitude: 31.253, longitude: 34.7915 }, // Beer-Sheba, Israel
			huntRadiusInKm: 3,
		},
		isLootHidden: false,
		collectors: [],
		maxAvailableCollections: 7,
		loot: "loot17",
		creationDate: new Date("2024-07-01T00:00:00Z"),
		expireDate: new Date("2024-10-31T23:59:59Z"),
	},
	{
		id: "treasure16",
		qrValue: "QR262728",
		location: {
			coordinate: { latitude: 31.2513, longitude: 34.7929 }, // Beer-Sheba, Israel
			huntRadiusInKm: 4,
		},
		isLootHidden: true,
		collectors: [],
		maxAvailableCollections: 15,
		loot: "loot18",
		creationDate: new Date("2024-08-01T00:00:00Z"),
		expireDate: new Date("2024-11-30T23:59:59Z"),
	},
	{
		id: "treasure17",
		qrValue: "QR293031",
		location: {
			coordinate: { latitude: 31.2519, longitude: 34.7944 }, // Beer-Sheba, Israel
			huntRadiusInKm: 3,
		},
		isLootHidden: false,
		collectors: [],
		maxAvailableCollections: 7,
		loot: "loot19",
		creationDate: new Date("2024-09-01T00:00:00Z"),
		expireDate: new Date("2024-12-31T23:59:59Z"),
	},
	{
		id: "treasure18",
		qrValue: "QR323334",
		location: {
			coordinate: { latitude: 31.2547, longitude: 34.7966 }, // Beer-Sheba, Israel
			huntRadiusInKm: 2,
		},
		isLootHidden: true,
		collectors: [],
		maxAvailableCollections: 10,
		loot: "loot20",
		creationDate: new Date("2024-10-01T00:00:00Z"),
		expireDate: new Date("2025-01-31T23:59:59Z"),
	},
];
