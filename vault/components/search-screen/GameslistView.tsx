import {
	FlatList,
	FlatListProps,
	ListRenderItem,
	ListRenderItemInfo,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React from "react";
import { Game, Games } from "@/models/Game.Model";
import GameResultView from "@/components/search-screen/GameResultView";
import vaultIcon from "@/assets/images/vault.png";
import { spacingSizes } from "@/constants/Sizes";

type GameslistViewProps = {
	gamesList: Games;
};

function GameslistView({ gamesList }: GameslistViewProps) {
	return (
		<>
			<FlatList
				numColumns={2}
				style={styles.GamesList}
				data={gamesList}
				keyExtractor={(item: Game, index: number) => `${item.id}`}
				renderItem={({ item, index, separators }: ListRenderItemInfo<Game>) => {
					return (
						<GameResultView
							gameId={item.id}
							title={item.name}
							imageUri={item.background_image}
						/>
					);
				}}
			/>
			{/* <View style={styles.GamesList}>
				{/* {gamesList?.results.map((game) => (
					
				))} */}
			{/* <GameResultView
					key={1}
					gameId={123}
					title={"A very long game title name"}
					imageUri={vaultIcon}
				/>
				<GameResultView
					key={2}
					gameId={123}
					title={
						"A veveryveryvery very very very veryveryveryryveryveryvery long game title name"
					}
					imageUri={vaultIcon}
				/>
				<GameResultView
					key={3}
					gameId={123}
					title={"A very long game title name"}
					imageUri={vaultIcon}
				/>
			</View> */}
		</>
	);
}

export default GameslistView;

const styles = StyleSheet.create({
	GamesList: {
		padding: spacingSizes.screenPadding,
		flexDirection: "row",
		width: "100%",
		// alignContent: "center",
		// backgroundColor: "red",
		// height: "100%",

		flexWrap: "wrap",
	},
});
