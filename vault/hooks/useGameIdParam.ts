import { useLocalSearchParams } from "expo-router";

export default function useGameIdParam() {
	const { gameId } = useLocalSearchParams<{ gameId: string }>();
	const isInvalidParam = isNaN(Number(gameId));

	return {
		gameId: gameId,
		isInvalidParam: isInvalidParam,
	};
}
