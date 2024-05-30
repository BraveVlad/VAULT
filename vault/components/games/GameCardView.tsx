import { colors } from "@/constants/Colors";
import { fontSizes } from "@/constants/Sizes";
import { Game } from "@/models/Game.Model";
import {
	View,
	Text,
	StyleSheet,
	Image,
	Pressable,
	StyleProp,
	ViewStyle,
	LayoutChangeEvent,
} from "react-native";
import vaultIcon from "@/assets/images/vault.png";
import discardIcon from "@/assets/images/replay.png";
import PlatformsListView from "./PlatformsListView";
import { useAddGameToUserVault } from "@/hooks/useAddGameToUserVault";

export type GameCardViewProps = {
	game: Game;
	style?: StyleProp<ViewStyle>;
	onCardLayout?: (event: LayoutChangeEvent) => void;
	onCardDiscarded?: (gameId: number) => void;
};

export function GameCardView({
	game,
	style,
	onCardLayout,
	onCardDiscarded,
}: GameCardViewProps) {
	const { addGameToUserVaultMutation: vaultMutation } = useAddGameToUserVault(
		"Dracula",
		game.id
	);
	function handleDiscardGame() {
		onCardDiscarded?.(game.id);
	}

	function handleVaultGame() {
		console.log(`User wants to vault game ${game.id}`);
		vaultMutation.mutate();
	}

	return (
		<View style={[styles.card, style]} onLayout={onCardLayout}>
			<Image style={styles.gameImage} source={{ uri: game.background_image }} />
			<PlatformsListView platforms={game.parent_platforms} />
			<Text style={styles.gameTitle}>{game.name}</Text>
			<View style={styles.actions}>
				<Pressable style={styles.actions__button} onPress={handleDiscardGame}>
					<Image source={discardIcon} style={styles.actions__buttonImage} />
				</Pressable>
				<View style={styles.readMore__container}>
					<Text style={styles.readMore__text}>READ MORE</Text>
					<Image style={styles.readMore__icon} />
				</View>
				<Pressable style={styles.actions__button} onPress={handleVaultGame}>
					<Image source={vaultIcon} style={styles.actions__buttonImage} />
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: colors.backgroundLight,
		width: "90%",
		maxWidth: 400,
		maxHeight: "90%",
		aspectRatio: 1 / 1.5,
		borderRadius: 8,
		padding: 8,
		alignItems: "center",
	},

	gameImage: {
		width: "100%",
		flex: 8,
		borderRadius: 8,
	},
	gameTitle: {
		flex: 1,
		width: "90%",
		textAlign: "center",
		color: colors.textPrimary,
		fontFamily: "bold",
		fontSize: fontSizes.heading,
		marginVertical: 16,
		alignContent: "center",
	},
	actions: {
		flex: 2,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 2,
		width: "100%",
	},
	actions__button: {
		height: 64,
		aspectRatio: 1 / 1,
		backgroundColor: colors.primary,
		borderRadius: 128,
		alignItems: "center",
		justifyContent: "center",
	},
	actions__buttonImage: {
		height: "60%",
		width: "60%",
		resizeMode: "contain",
	},
	readMore__container: {},
	readMore__text: {},
	readMore__icon: {},
});
