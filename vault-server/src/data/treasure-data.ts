import { Treasures } from "../models/Treasure.Model";

export const treasures: Treasures = [
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
			relatedGameId: 106,
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
			relatedGameId: 107,
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
			relatedGameId: 108,
			lootImage: "https://example.com/images/loot13.png",
			type: "Coupon",
			coupon: "DISCOUNT15",
			isRedeemed: false,
		},
		creationDate: new Date("2024-08-01T00:00:00Z"),
		expireDate: new Date("2024-11-30T23:59:59Z"),
	},
];
