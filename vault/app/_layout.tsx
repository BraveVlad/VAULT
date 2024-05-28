import MainContainer from "@/components/layout/MainContainer";
import TabsBar from "@/components/layout/TabsBar";
import TopBar from "@/components/layout/TopBar";
import { useMainFonts } from "@/hooks/useFonts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, Stack } from "expo-router";
import { Text } from "react-native";

export default function RootLayout() {
	const fontsLoaded = useMainFonts();
	const queryClient = new QueryClient();

	if (!fontsLoaded) {
		return <Text>Loading...</Text>;
	}

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<TopBar />
				<Slot />
				<ReactQueryDevtools initialIsOpen={true} />
			</QueryClientProvider>
		</>
	);
}
