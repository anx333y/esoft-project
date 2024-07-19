import "./Button.css";
import styleConfig from "../../../style.config";
import { CircularProgress } from "@mui/material";
import MuiButton from "@mui/material/Button";

import { ICalendarButtonProps } from "../../../types";



const Button = ({children, onClickProp, disabled, isLoading, sx, ...props}: ICalendarButtonProps) => {
	const onClick = () => {
		if (onClickProp) {
			onClickProp();
		}
	};

	return (
		<div className="calendar-button">
			<MuiButton
				{...props}
				sx={{
					bgcolor: styleConfig.colors.secondary?.light,
					color: styleConfig.colors.secondary?.dark,
					fontFamily: "inherit",
					fontWeight: 400,
					'&:hover': {
						bgcolor: styleConfig.colors.secondary?.light
					},
					...sx
				}}
				disabled={isLoading || disabled}
				onClick={onClick}
			>
				{children}
			</MuiButton>
			{isLoading &&
				<CircularProgress
					sx={{
						color: styleConfig.colors.secondary?.dark,
						position: 'absolute',
						top: '50%',
						left: '50%',
						marginTop: '-12px',
						marginLeft: '-12px',
					}}
					size={24}
				/>}
		</div>
	)
};

export default Button;