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
import PlatformIcon from "@/components/games/platform-icons/PlatformIcon";

export type GameCardViewProps = {
	game: Game;
	style?: StyleProp<ViewStyle>;
	onCardLayout?: (event: LayoutChangeEvent) => void;
};

export function GameCardView({ game, style, onCardLayout }: GameCardViewProps) {
	console.log(game.parent_platforms);

	return (
		<View style={[styles.card, style]} onLayout={onCardLayout}>
			<Image style={styles.gameImage} source={{ uri: game.background_image }} />
			<View style={styles.platforms}>
				{game.parent_platforms.map((platform) => (
					<PlatformIcon
						platform={platform}
						key={platform.platform.id}
						style={styles.platforms__icon}
					/>
				))}
			</View>
			<Text style={styles.gameTitle}>{game.name}</Text>
			<View style={styles.actions}>
				<Pressable style={styles.actions__button}>
					<Image source={discardIcon} style={styles.actions__buttonImage} />
				</Pressable>
				<View style={styles.readMore__container}>
					<Text style={styles.readMore__text}>READ MORE</Text>
					<Image style={styles.readMore__icon} />
				</View>
				<Pressable style={styles.actions__button}>
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
	platforms: {
		alignSelf: "flex-start",
		marginStart: 4,
		flexDirection: "row",
		marginVertical: 6,
		gap: 6,
	},
	platforms__icon: {
		width: 16,
		height: 16,
		resizeMode: "contain",
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
