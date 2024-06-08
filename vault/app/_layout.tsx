import TopBar from "@/components/layout/TopBar";
import { useMainFonts } from "@/hooks/useFonts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { useState } from "react";
import { Text } from "react-native";

export default function RootLayout() {
	const fontsLoaded = useMainFonts();
	const [queryClient] = useState(new QueryClient());

	if (!fontsLoaded) {
		return <Text>Loading...</Text>;
	}

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<TopBar />
				<Slot />
				{/* <ReactQueryDevtools initialIsOpen={true} /> */}
			</QueryClientProvider>
		</>
	);
}
