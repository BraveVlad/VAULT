import { Treasures } from "../models/Treasure.Model";

export const treasures: Treasures = [
	// DIMONA
	{
		id: "treasure11",
		qrValue: "QR111213",
		location: {
			coordinate: { latitude: 31.0672, longitude: 35.0325 }, // Dimona, Israel
			huntRadiusInKm: 2,
		},
		isLootHidden: true,
		collectors: [],
		maxAvailableCollections: 10,
		loot: {
			id: "loot11",
			relatedGameId: 3498,
			lootImage: "https://example.com/images/loot11.png",
			type: "Skin",
			coupon: "GIFTSKIN12345",
			isRedeemed: false,
		},
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
		loot: {
			id: "loot12",
			relatedGameId: 3328,
			lootImage: "https://example.com/images/loot12.png",
			type: "Game",
			coupon: "FREEGAME12345",
			isRedeemed: true,
		},
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
		loot: {
			id: "loot13",
			relatedGameId: 4200,
			lootImage: "https://example.com/images/loot13.png",
			type: "Coupon",
			coupon: "DISCOUNT15",
			isRedeemed: false,
		},
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
		loot: {
			id: "loot14",
			relatedGameId: 4291,
			lootImage: "https://example.com/images/loot14.png",
			type: "Skin",
			isRedeemed: false,
		},
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
		loot: {
			id: "loot15",
			relatedGameId: 5286,
			lootImage: "https://example.com/images/loot15.png",
			type: "Game",
			isRedeemed: true,
		},
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
		loot: {
			id: "loot16",
			relatedGameId: 13536,
			lootImage: "https://example.com/images/loot16.png",
			type: "Coupon",
			coupon: "DISCOUNT15",
			isRedeemed: false,
		},
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
		loot: {
			id: "loot17",
			relatedGameId: 12020,
			lootImage: "https://example.com/images/loot17.png",
			type: "Skin",
			isRedeemed: true,
		},
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
		loot: {
			id: "loot18",
			relatedGameId: 5679,
			lootImage: "https://example.com/images/loot18.png",
			type: "DLC",
			isRedeemed: false,
		},
		creationDate: new Date("2024-10-01T00:00:00Z"),
		expireDate: new Date("2025-01-31T23:59:59Z"),
	},
];
