import GameResultView from "@/components/games/GamesListItemView";
import NetworkErrorView from "@/components/games/NetworkErrorView";
import { mainStyles } from "@/constants/Styles";
import useGames from "@/hooks/useGames";
import useUser from "@/hooks/useUser";
import { VaultGame } from "@/models/User.Model";
import {
	FlatList,
	ListRenderItemInfo,
	StyleSheet,
	Text,
	View,
} from "react-native";

export default function VaultScreen() {
	const { userQuery, isVaultEmpty } = useUser("Dracula");
	const { gamesQuery } = useGames();

	function handleRefresh() {
		userQuery.refetch();
	}

	function convertGameIdToGame(gameId: number) {
		const game = gamesQuery.data?.results.find((gameInfo) => {
			return gameInfo.id === gameId;
		});

		if (!game) return <Text key={gameId}>Couldn't find game {gameId}</Text>;

		return (
			<View style={styles.vaultItem}>
				<GameResultView
					key={game.id}
					gameId={game.id}
					title={game.name}
					imageUri={game.background_image}
				/>
			</View>
		);
	}
	return (
		<View style={mainStyles.Screen}>
			{userQuery.isLoading && <Text>Loading user...</Text>}
			{userQuery.isError && (
				<NetworkErrorView
					clientErrorMessage="Unable to load user data"
					isShowDebugError={true}
					debugError={userQuery.error.message}
					onRefresh={handleRefresh}
				/>
			)}
			{userQuery.isSuccess && (
				<>
					<Text>User: {userQuery.data.username} vault:</Text>
					{isVaultEmpty && <Text>Vault is empty. Add games!</Text>}

					<View>
						{!isVaultEmpty && (
							<FlatList
								numColumns={4}
								data={userQuery.data.vault}
								keyExtractor={(item: VaultGame) => `${item.gameId}`}
								renderItem={({ item }: ListRenderItemInfo<VaultGame>) => {
									return convertGameIdToGame(item.gameId);
								}}
							/>
						)}
					</View>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	vaultList: {
		width: "100%",
		flexWrap: "wrap",
	},
	vaultItem: {
		height: "50%",
	},
});
