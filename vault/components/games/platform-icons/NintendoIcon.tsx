import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const NintendoIcon = (props: SvgProps) => (
	<Svg viewBox="0 0 21 16" width={24} height={24} {...props}>
		<Path
			fill="#FFF"
			fillRule="evenodd"
			d="M8 0h5a8 8 0 1 1 0 16H8A8 8 0 1 1 8 0zm-.135 1.935a6.065 6.065 0 0 0 0 12.13h5.12a6.065 6.065 0 0 0 0-12.13h-5.12zm-1.33 2.304h2.401l3.199 5.175V4.24h2.346v7.495H12.18L8.864 6.537v5.201H6.53l.005-7.499z"
		/>
	</Svg>
);
export default NintendoIcon;
