import NetworkErrorView from "@/components/games/NetworkErrorView";
import { mainStyles } from "@/constants/Styles";
import useUser from "@/hooks/useUser";
import { StyleSheet, Text, View } from "react-native";

export default function VaultScreen() {
	const { userQuery, isVaultEmpty } = useUser("Dracula");

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
					{isVaultEmpty && <Text>Vault is empty. Add games!</Text>}
					{!isVaultEmpty &&
						userQuery.data.vault.map((vaultGame) => (
							<Text key={vaultGame.gameId}>• {vaultGame.gameId}</Text>
						))}
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({});
