import { colors } from "@/constants/Colors";
import { mainStyles } from "@/constants/Styles";
import { useMainFonts } from "@/hooks/useFonts";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
	return (
		<View style={mainStyles.Screen}>
			<Text style={mainStyles.Text}>INDEX</Text>
		</View>
	);
}
