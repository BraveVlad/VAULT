import { colors } from "@/constants/Colors";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";

import discoverIcon from "@/assets/images/discover.png";
import searchIcon from "@/assets/images/search.png";
import vaultIcon from "@/assets/images/vault.png";
import { iconSizes, layoutSizes } from "@/constants/Sizes";

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "blue",
				headerShown: false,
				tabBarStyle: styles.tabBar,
				tabBarItemStyle: styles.tabItem,
				tabBarLabelStyle: styles.tabTitle,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "DISCOVER",
					tabBarIcon: getDiscoverTabIcon,
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "SEARCH",
					tabBarIcon: getSearchTabIcon,
				}}
			/>
			<Tabs.Screen
				name="vault"
				options={{
					title: "VAULT",
					tabBarIcon: getVaultTabIcon,
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		backgroundColor: colors.background,
		height: layoutSizes.tabsbar,
		borderTopColor: colors.background,
	},
	tabItem: {
		padding: 6,
		gap: 8,
	},
	tabTitle: {
		color: colors.textPrimary,
		fontFamily: "bold",
	},
});

function getDiscoverTabIcon() {
	return getTabIcon(discoverIcon);
}

function getSearchTabIcon() {
	return getTabIcon(searchIcon);
}
function getVaultTabIcon() {
	return getTabIcon(vaultIcon);
}

function getTabIcon(source: ImageSourcePropType) {
	return (
		<Image
			source={source}
			style={{ width: iconSizes.tabIcon, height: iconSizes.tabIcon }}
		/>
	);
}
