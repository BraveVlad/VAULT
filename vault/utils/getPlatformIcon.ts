import { ParentPlatform } from "@/models/Game.Model";
import pcIcon from "@/assets/images/platforms/pc.svg";
import xboxIcon from "@/assets/images/platforms/xbox.svg";
import psIcon from "@/assets/images/platforms/ps.svg";
import nintendoIcon from "@/assets/images/platforms/nintendo.svg";
import macIcon from "@/assets/images/platforms/mac.svg";
import androidIcon from "@/assets/images/platforms/android.svg";
import linuxIcon from "@/assets/images/platforms/linux.svg";

export default function getPlatformIcon(platform: ParentPlatform) {
	switch (platform.platform.slug) {
		case "pc":
			return pcIcon;
		case "playstation":
			return psIcon;

		case "xbox":
			return xboxIcon;

		case "nintendo":
			return nintendoIcon;

		case "android":
			return androidIcon;

		case "linux":
			return linuxIcon;

		case "mac":
			return macIcon;

		default:
			console.error(
				`Couldn't get icon for platform: ${platform.platform.slug}`
			);
			return pcIcon;
	}
}
