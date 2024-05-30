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
type GamePageViewProps = {
	game: Game;
};

async function postGameToUserVault(username: string, gameId: number) {
	const requestUri = buildMockAddGameToUserVaultUri();
	const requestBody = buildMockAddGameToUserVaultBody(username, gameId);
	const response = await axios.post(requestUri, requestBody);
	return response.data as AddGameToVaultResponse;
}

export default function GamePageView({ game }: GamePageViewProps) {
	const vaultMutation = useMutation<AddGameToVaultResponse, AxiosError>({
		mutationKey: ["AddGameToVault"],
		mutationFn: () => postGameToUserVault("Dracula", game.id),
		onSuccess: (data) => {
			console.log(`Adding game ${game.name} to user's vault is success!`);
			console.log(data);
		},
		onError: (error) => {
			const errorData = error.response?.data as {
				code: string;
				message: string;
			};
			const errorCode = errorData.code;

			if (errorCode === "GAME_ALREADY_EXISTS") {
				const messageToClient = `Game ${game.name} is already in your vault!`;
				console.log(messageToClient);
				ToastAndroid.show(messageToClient, ToastAndroid.SHORT);
			}
		},
		retry: 3,
	});

	function handleVaultGame(): void {
		console.log(`User wants to vault game ${game.id}`);
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
