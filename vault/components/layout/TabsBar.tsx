import React from "react";
import { Tabs } from "expo-router";
import { colors } from "@/constants/Colors";

export default function TabsBar() {
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
