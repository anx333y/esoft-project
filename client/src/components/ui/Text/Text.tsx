import { ReactNode } from "react";
import "./Text.css";
import { Typography, TypographyProps } from "@mui/material";
import styleConfig from "../../../style.config";

type ITextProps = TypographyProps & {
	children: ReactNode;
	font?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

const Text = ({children, font = "h2", variant, sx, ...props}: ITextProps) => {
	return (
		<div
			className="text"
		>
			<Typography
				{...props}
				sx={{
					fontFamily: "inherit",
					fontWeight: 500,
					color: styleConfig.colors.secondary.dark,
					fontSize: styleConfig.text[font],
					textAlign: "center",
					...sx
				}}
				variant={variant && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant) ? font : variant}
			>
				{children}
			</Typography>
		</div>
	)
};

export default Text;