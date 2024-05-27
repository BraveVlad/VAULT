import MainContainer from "@/components/layout/MainContainer";
import TabsBar from "@/components/layout/TabsBar";
import TopBar from "@/components/layout/TopBar";
import { useMainFonts } from "@/hooks/useFonts";
import { NavigationContainer } from "@react-navigation/native";
import { Slot, Stack } from "expo-router";
import { Text } from "react-native";

export default function RootLayout() {
	const fontsLoaded = useMainFonts();

	if (!fontsLoaded) {
		return <Text>Loading...</Text>;
	}

	return (
		<>
			{/* <MainContainer> */}
			<TopBar />
			<Slot />
			{/* </MainContainer> */}
		</>
	);
}
