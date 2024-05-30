import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Image,
	ToastAndroid,
} from "react-native";
import React from "react";
import { Game } from "@/models/Game.Model";
import PlatformsListView from "./PlatformsListView";
import vaultIcon from "@/assets/images/vault.png";
import { useMutation } from "@tanstack/react-query";
import { AddGameToVaultResponse, User } from "@/models/User.Model";
import {
	buildMockAddGameToUserVaultBody,
	buildMockAddGameToUserVaultUri,
} from "@/constants/Api";
import axios, { AxiosError } from "axios";
import { useAddGameToUserVault } from "@/hooks/useAddGameToUserVault";
type GamePageViewProps = {
	game: Game;
};

export default function GamePageView({ game }: GamePageViewProps) {
	const { addGameToUserVaultMutation: vaultMutation } = useAddGameToUserVault(
		"Dracula",
		game.id
	);

	function handleVaultGame(): void {
		vaultMutation.mutate();
	}

	return (
		<View>
			<PlatformsListView platforms={game.parent_platforms} />
			<Text style={styles.gameTitle}>{game.name}</Text>

			<Pressable style={styles.vaultButton} onPress={handleVaultGame}>
				<Image source={vaultIcon} />
				<Text>ADD TO VAULT</Text>
			</Pressable>
			<View>
				<Text>About</Text>
				<Text>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
					incidunt labore, debitis repellendus dolorum ut quae, iure fuga
					sapiente ducimus sit enim natus distinctio consectetur. Sint
					perspiciatis assumenda natus maxime.
				</Text>
			</View>
		</View>
		// TODO - Add screenshots and videos.
	);
}
const styles = StyleSheet.create({
	gameTitle: {},
	vaultButton: {},
	vaultButton__image: {},
	vaultButton__text: {},
	about: {},
	about__title: {},
	about__content: {},
});
