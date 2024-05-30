import game from "@/app/game";
import {
	buildMockAddGameToUserVaultUri,
	buildMockAddGameToUserVaultBody,
} from "@/constants/Api";
import { AddGameToVaultResponse } from "@/models/User.Model";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ToastAndroid } from "react-native";

async function postGameToUserVault(username: string, gameId: number) {
	const requestUri = buildMockAddGameToUserVaultUri();
	const requestBody = buildMockAddGameToUserVaultBody(username, gameId);
	const response = await axios.post(requestUri, requestBody);
	return response.data as AddGameToVaultResponse;
}

export function useAddGameToUserVault(username: string, gameId: number) {
	const vaultMutation = useMutation<AddGameToVaultResponse, AxiosError>({
		mutationKey: ["AddGameToVault"],
		mutationFn: () => postGameToUserVault(username, gameId),
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

	return {
		addGameToUserVaultMutation: vaultMutation,
	};
}
