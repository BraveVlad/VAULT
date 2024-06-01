import game from "@/app/game";
import {
	buildMockAddGameToUserVaultUri,
	buildMockAddGameToUserVaultBody,
} from "@/constants/Api";
import { AddGameToVaultResponse } from "@/models/User.Model";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, isAxiosError } from "axios";
import { ToastAndroid } from "react-native";
import useUser from "./useUser";

async function postGameToUserVault(username: string, gameId: number) {
	const requestUri = buildMockAddGameToUserVaultUri();
	const requestBody = buildMockAddGameToUserVaultBody(username, gameId);
	const response = await axios.post(requestUri, requestBody);
	return response.data as AddGameToVaultResponse;
}

export function useAddGameToUserVault() {
	// const userQuery = useUser(username);
	const queryClient = useQueryClient();

	const vaultMutation = useMutation({
		mutationKey: ["AddGameToVault"],
		mutationFn: ({ username, gameId }: { username: string; gameId: number }) =>
			postGameToUserVault(username, gameId),
		onSuccess: (data) => {
			console.log(`Adding game ${game.name} to user's vault is success!`);
			console.log(data);
			queryClient.invalidateQueries({
				queryKey: ["user"],
			});
		},
		onError: (error) => {
			if (!isAxiosError(error)) return;
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
		retry: 1,
	});

	return {
		addGameToUserVaultMutation: vaultMutation,
	};
}
