import { ShallowUsers } from "./User.Model";

export type TreasureLocation = {
	x: number;
	y: number;
	radius: number;
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
