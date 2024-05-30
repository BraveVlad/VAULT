import AndroidIcon from "@/components/games/platform-icons/AndroidIcon";
import LinuxIcon from "@/components/games/platform-icons/LinuxIcon";
import MacIcon from "@/components/games/platform-icons/MacIcon";
import NintendoIcon from "@/components/games/platform-icons/NintendoIcon";
import PcIcon from "@/components/games/platform-icons/PcIcon";
import PlaystationIcon from "@/components/games/platform-icons/PlaystationIcon";
import XboxIcon from "@/components/games/platform-icons/XboxIcon";
import IosIcon from "@/components/games/platform-icons/IosIcon";
import { ParentPlatform } from "@/models/Game.Model";
import { StyleProp, ViewStyle } from "react-native";

type PlatformIconProps = {
	platform: ParentPlatform;
	style?: StyleProp<ViewStyle>;
};
export default function PlatformIcon({ platform, style }: PlatformIconProps) {
	switch (platform.platform.slug) {
		case "pc":
			return <PcIcon style={style} />;

		case "playstation":
			return <PlaystationIcon style={style} />;

		case "xbox":
			return <XboxIcon style={style} />;

		case "nintendo":
			return <NintendoIcon style={style} />;

		case "android":
			return <AndroidIcon style={style} />;

		case "linux":
			return <LinuxIcon style={style} />;

		case "mac":
			return <MacIcon style={style} />;

		case "ios":
			return <IosIcon style={style} />;

		default:
			console.error(
				`Couldn't get icon for platform: ${platform.platform.slug}`
			);
			return <PcIcon style={style} />;
	}
}
