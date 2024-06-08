import { useFonts } from "expo-font";

import fontThin from "@expo-google-fonts/josefin-sans/JosefinSans_100Thin.ttf";
import fontRegular from "@expo-google-fonts/josefin-sans/JosefinSans_400Regular.ttf";
import fontBold from "@expo-google-fonts/josefin-sans/JosefinSans_700Bold.ttf";

export const useMainFonts = () => {
	const [fontsLoaded] = useFonts({
		thin: fontThin,
		regular: fontRegular,
		bold: fontBold,
	});

	return fontsLoaded;
};
