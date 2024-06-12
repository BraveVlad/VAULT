export type LootType = "DLC" | "Game" | "Skin" | "Coupon";

export type LootId = string;

export type Loot = {
	id: LootId;
	relatedGameId: number;
	lootImage: string;
	type: LootType;
	coupon?: string;
	isRedeemed: boolean;
};

export type Loots = Loot[];

export function getLootsById(loots: Loots, lootId: LootId) {
	return loots.find((loot) => loot.id === lootId);
}
