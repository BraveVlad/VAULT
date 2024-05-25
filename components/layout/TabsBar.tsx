import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DiscoverScreen from "@/app/(tabs)";
import { Tabs } from "expo-router";
import { colors } from "@/constants/Colors";

function TabsBar() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "blue",
				headerShown: false,
				tabBarInactiveBackgroundColor: colors.background,
				tabBarActiveBackgroundColor: colors.background,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "TITLE",
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "HOME",
				}}
			/>
			<Tabs.Screen
				name="vault"
				options={{
					title: "VAULT",
				}}
			/>
		</Tabs>
	);
}

export default TabsBar;

const styles = StyleSheet.create({});
