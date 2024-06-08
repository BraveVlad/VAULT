import { ShallowUsers } from "./User.Model";

export type Coordinate = {
	latitude: number;
	longitude: number;
};

export const DEFAULT_USERS_SEARCH_RADIUS_IN_KM = 1;
export const MAX_USERS_SEARCH_RADIUS_IN_KM = 10;

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

function distanceBetweenTwoCoordinates(pointA: Coordinate, pointB: Coordinate) {
	const radiusOfEarthInKm = 6371;
	const deltaLatitude = ((pointB.latitude - pointA.latitude) * Math.PI) / 180;
	const deltaLongitude =
		((pointB.longitude - pointA.longitude) * Math.PI) / 180;
	const pointALatitudeInRadians = (pointA.latitude * Math.PI) / 180;
	const pointBLatitudeInRadians = (pointB.latitude * Math.PI) / 180;

	const greatCircleDistance =
		Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
		Math.sin(deltaLongitude / 2) *
			Math.sin(deltaLongitude / 2) *
			Math.cos(pointALatitudeInRadians) *
			Math.cos(pointBLatitudeInRadians);
	const angularDistanceInRadians =
		2 *
		Math.atan2(
			Math.sqrt(greatCircleDistance),
			Math.sqrt(1 - greatCircleDistance)
		);
	const distanceInKm = radiusOfEarthInKm * angularDistanceInRadians;

	return distanceInKm;
}
export function findTreasuresByDistance(
	treasures: Treasures,
	targetLocation: Coordinate,
	searchRadius: number
): Treasures {
	return treasures.filter((treasure) => {
		const distance = distanceBetweenTwoCoordinates(
			treasure.location.coordinate,
			targetLocation
		);
		return distance <= searchRadius;
	});
}

export function isTreasureCollectable(treasure: Treasure) {
	return treasure.collectors.length < treasure.maxAvailableCollections;
}

export function filterTreasuresByIsCollectable(
	treasures: Treasures
): Treasures {
	return treasures.filter((treasure) => isTreasureCollectable(treasure));
}

export function filterTreasuresByGameId(treasures: Treasures, gameId: number) {
	return treasures.filter((treasure) => treasure.loot.relatedGameId === gameId);
}
