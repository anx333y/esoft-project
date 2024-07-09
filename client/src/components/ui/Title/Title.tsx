import { ReactNode } from "react";
import "./Title.css";
import { Typography, TypographyProps } from "@mui/material";
import styleConfig from "../../../style.config";

type ITitleProps = TypographyProps & {
	children: ReactNode;
	variant?: 'h1' | 'h2' | 'h3' | 'h4';
};

const Title = ({children, variant = "h2", sx, ...props}: ITitleProps) => {
	return (
		<div
			className="title"
		>
			<Typography
				{...props}
				sx={{
					fontFamily: "inherit",
					fontWeight: 500,
					color: styleConfig.colors.primary.dark,
					fontSize: styleConfig.heading[variant],
					textAlign: "center",
					...sx
				}}
				variant={variant}
				// component={variant}
			>
				{children}
			</Typography>
		</div>
	)
};

export default Title;