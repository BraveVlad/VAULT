import NetworkErrorView from "@/components/games/NetworkErrorView";
import { getMockUserRequest } from "@/constants/Api";
import { mainStyles } from "@/constants/Styles";
import { User } from "@/models/User.Model";
import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { StyleSheet, Text, View } from "react-native";

async function fetchUser(username: string) {
	const request = getMockUserRequest(username);
	return axios.get(request).then(async (response) => response.data);
}

export default function VaultScreen() {
	const userQuery = useQuery<User>({
		queryKey: ["user"],
		queryFn: () => fetchUser("Dracula"), // load from storage
	});

	function handleRefresh() {
		userQuery.refetch();
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
					{userQuery.data.vault.map((vaultGame) => (
						<Text key={vaultGame.gameId}>• {vaultGame.gameId}</Text>
					))}
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({});
