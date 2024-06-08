import { ShallowUsers } from "./User.Model";

export type Coordinate = {
	latitude: number;
	longitude: number;
};

export type TreasureLocation = {
	coordinate: Coordinate;
	huntRadius: number;
	revealRadius: number;
};

export type LootType = "DLC" | "Game" | "Skin" | "Coupon";

export type Loot = {
	id: string;
	relatedGameId: number;
	lootImage: string;
	type: LootType;
	coupon?: string;
	isRedeemed: boolean;
};

export type Treasure = {
	id: string;
	qrValue: string;
	location: TreasureLocation;
	isLootHidden: boolean;
	collectors: ShallowUsers;
	maxAvailableCollections: number;
	loot: Loot;
	creationDate: Date;
	expireDate: Date;
};

export type Treasures = Treasure[];

function distanceBetweenTwoPoints(pointA: Coordinate, pointB: Coordinate) {
	const deltaOfLatitude = pointA.latitude - pointB.latitude;
	const deltaOfLongitude = pointA.longitude - pointB.longitude;
	return Math.abs(Math.hypot(deltaOfLatitude, deltaOfLongitude));
}
export function findTreasuresByDistance(
	treasures: Treasures,
	targetLocation: Coordinate,
	searchRadius: number
): Treasures {
	return treasures.filter((treasure) => {
		const distance = distanceBetweenTwoPoints(
			treasure.location.coordinate,
			targetLocation
		);
		return distance <= searchRadius;
	});
}
