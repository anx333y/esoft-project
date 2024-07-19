import "./ExplicitText.css";
import styleConfig from "../../../../../style.config";

import { IExplicitText } from "../../../../../types";



const ExplicitText = ({
	children,
	bgColor = styleConfig.colors.secondary.light,
	color = styleConfig.colors.secondary.dark,
	style = {}
}: IExplicitText) => {
	return (
		<span
			className="admin-dashboard-explicit-text"
			style={{
				backgroundColor: bgColor,
				color,
				...style
			}}
		>
			{children}
		</span>
	)
};

export default ExplicitText;