export type LootType = "DLC" | "Game" | "Skin" | "Coupon";

export type lootId = string;

export type Loot = {
	id: lootId;
	relatedGameId: number;
	lootImage: string;
	type: LootType;
	coupon?: string;
	isRedeemed: boolean;
};
