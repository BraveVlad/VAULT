import { ShallowUsers } from "./User.Model";

export type Coordinate = {
	latitude: number;
	longitude: number;
};

export const DEFAULT_USERS_SEARCH_RADIUS_IN_KM = 1;
export const MAX_USERS_SEARCH_RADIUS_IN_KM = 10;

export type TreasureLocation = {
	coordinate: Coordinate;
	huntRadiusInKm: number;
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
