import { Loot, LootId, Loots, getLootById } from "./Loot.Model";
import { ShallowUsers } from "./User.Model";

export type Coordinate = {
	latitude: number;
	longitude: number;
};

export const DEFAULT_USERS_SEARCH_RADIUS_IN_KM = 1;
export const MAX_USERS_SEARCH_RADIUS_IN_KM = 10;
export const MIN_DISTANCE_BETWEEN_TREASURES_IN_KM = 1;

export type TreasureLocation = {
	coordinate: Coordinate;
	huntRadiusInKm: number;
};

export type Treasure = {
	id: string;
	qrValue: string;
	location: TreasureLocation;
	isLootHidden: boolean;
	collectors: ShallowUsers;
	maxAvailableCollections: number;
	loot: LootId;
	creationDate: Date;
	expireDate: Date;
};

export type Treasures = Treasure[];

const RADIUS_OF_EARTH_IN_KM = 6371;

function distanceBetweenTwoCoordinates(pointA: Coordinate, pointB: Coordinate) {
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
	const distanceInKm = RADIUS_OF_EARTH_IN_KM * angularDistanceInRadians;

	return distanceInKm;
}

export function findTreasuresByDistance(
	treasures: Treasures,
	targetLocation: Coordinate,
	searchRadiusInKm: number
): Treasures {
	return treasures.filter((treasure) => {
		const distance = distanceBetweenTwoCoordinates(
			treasure.location.coordinate,
			targetLocation
		);
		return distance <= searchRadiusInKm;
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

export function filterTreasuresByGameId(
	treasures: Treasures,
	loots: Loots,
	gameId: number
) {
	return treasures.filter((treasure) => {
		const treasureLoot = getLootById(loots, treasure.loot);
		return treasureLoot?.relatedGameId === gameId;
	});
}

export function isValidCoordinate(
	coordinate: unknown
): coordinate is Coordinate {
	if (!(typeof coordinate === "object" && coordinate !== null)) {
		return false;
	}

	const isLatitudeExists =
		"latitude" in coordinate && typeof coordinate.latitude === "number";
	const isLongitudeExists =
		"longitude" in coordinate && typeof coordinate.longitude === "number";

	if (!isLatitudeExists || !isLongitudeExists) return false;

	const validCoordinate = coordinate as Coordinate;

	const isLatitudeValid =
		validCoordinate.latitude >= -90 && validCoordinate.latitude <= 90;
	const isLongitudeValid =
		validCoordinate.longitude >= -180 && validCoordinate.longitude <= 180;

	return isLatitudeValid && isLongitudeValid;
}
