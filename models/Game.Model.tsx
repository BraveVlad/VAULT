export type ApiResponse = {
	count: number;
	next: string;
	previous: string | null;
	results: Game[];
	seo_title: string;
	seo_description: string;
	seo_keywords: string;
	seo_h1: string;
	noindex: boolean;
	nofollow: boolean;
	description: string;
	filters: Filters;
};

export type Game = {
	id: number;
	slug: string;
	name: string;
	released: string;
	tba: boolean;
	background_image: string;
	rating: number;
	rating_top: number;
	ratings: Rating[];
	ratings_count: number;
	reviews_text_count: number;
	added: number;
	added_by_status: AddedByStatus;
	metacritic: number;
	playtime: number;
	suggestions_count: number;
	updated: string;
	user_game: any;
	reviews_count: number;
	saturated_color: string;
	dominant_color: string;
	platforms: PlatformInfo[];
	parent_platforms: ParentPlatform[];
	genres: Genre[];
	stores: StoreInfo[];
	clip: any;
	tags: Tag[];
	esrb_rating: EsrbRating;
	short_screenshots: Screenshot[];
};

export type Rating = {
	id: number;
	title: string;
	count: number;
	percent: number;
};

export type AddedByStatus = {
	yet: number;
	owned: number;
	beaten: number;
	toplay: number;
	dropped: number;
	playing: number;
};

export type PlatformInfo = {
	platform: Platform;
	released_at: string;
	requirements_en: Requirements | null;
	requirements_ru: Requirements | null;
};

export type Platform = {
	id: number;
	name: string;
	slug: string;
	image: string | null;
	year_end: number | null;
	year_start: number | null;
	games_count: number;
	image_background: string;
};

export type Requirements = {
	minimum: string;
	recommended: string;
};

export type ParentPlatform = {
	platform: {
		id: number;
		name: string;
		slug: string;
	};
};

export type Genre = {
	id: number;
	name: string;
	slug: string;
	games_count: number;
	image_background: string;
};

export type StoreInfo = {
	id: number;
	store: Store;
};

export type Store = {
	id: number;
	name: string;
	slug: string;
	domain: string;
	games_count: number;
	image_background: string;
};

export type Tag = {
	id: number;
	name: string;
	slug: string;
	language: string;
	games_count: number;
	image_background: string;
};

export type EsrbRating = {
	id: number;
	name: string;
	slug: string;
};

export type Screenshot = {
	id: number;
	image: string;
};

export type Filters = {
	years: YearFilter[];
};

export type YearFilter = {
	from: number;
	to: number;
	filter: string;
	decade: number;
	years: Year[];
	nofollow: boolean;
	count: number;
};

export type Year = {
	year: number;
	count: number;
	nofollow: boolean;
};
