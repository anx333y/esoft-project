import { HTMLAttributes, ReactNode } from "react";
import "./ExplicitText.css";
import styleConfig from "../../../../../style.config";

type IExplicitText = {
	children: ReactNode;
	bgColor?: string;
	color?: string;
	style?: HTMLAttributes<HTMLSpanElement>['style'];
}

const ExplicitText = ({children, bgColor = styleConfig.colors.secondary.light, color = styleConfig.colors.secondary.dark, style = {}}: IExplicitText) => {
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