import { View, Text, StyleSheet, LayoutChangeEvent } from "react-native";
import NetworkErrorView from "./NetworkErrorView";
import useGames from "@/hooks/useGames";
import { GameCardView } from "./GameCardView";
import { Games } from "@/models/Game.Model";
import { colors } from "@/constants/Colors";
import { useState } from "react";

type BackCardRelativeDimensions = {
	width: number;
	offsetY: number;
};

export function GamesSwipeCardsView() {
	const { gamesQuery } = useGames();
	const [frontCardDimensions, setfrontCardDimensions] =
		useState<BackCardRelativeDimensions>();

	function refreshList() {
		gamesQuery.refetch();
	}

	function getRandomGame(games: Games) {
		const random = Math.floor(Math.random() * games.length);
		return games[random];
	}

	function measureFrontCardLayout(event: LayoutChangeEvent) {
		const { width, height, y } = event.nativeEvent.layout;
		const backCardWidth = width - width * 0.2;
		const backCardOffsetY = y - height * 0.05;
		setfrontCardDimensions({ width: backCardWidth, offsetY: backCardOffsetY });
	}

	function handleCardAction(gameId: number) {}

	return (
		<>
			{gamesQuery.isLoading && (
				<Text style={styles.loadingMessage}>loading games...</Text>
			)}
			{gamesQuery.isError && (
				<NetworkErrorView
					clientErrorMessage="Couldn't load game data."
					debugError={gamesQuery.error.message}
					isShowDebugError={true}
					onRefresh={refreshList}
				/>
			)}
			{gamesQuery.isSuccess && (
				<View style={styles.deck}>
					<GameCardView
						style={styles.frontCard}
						game={getRandomGame(gamesQuery.data?.results)}
						onCardLayout={measureFrontCardLayout}
						onCardDiscarded={handleCardAction}
					/>
					<GameCardView
						style={[
							styles.backCard,
							{
								top: frontCardDimensions ? frontCardDimensions.offsetY : 0,
								width: frontCardDimensions ? frontCardDimensions.width : 0,
							},
						]}
						game={getRandomGame(gamesQuery.data?.results)}
					/>
				</View>
			)}
		</>
	);
}

const frontCardWidth = 90;

const styles = StyleSheet.create({
	loadingMessage: {
		color: "white",
	},
	deck: {
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	frontCard: {
		position: "absolute",
		zIndex: 1,
	},
	backCard: {
		backgroundColor: colors.backgroundTint,
		position: "absolute",
		zIndex: -1,
	},
});
