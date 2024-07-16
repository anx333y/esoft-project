import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { ReactNode } from "react";
import styleConfig from "../../../../style.config";
import "./CalendarButton.css";

// type ConditionalArrowFunction<R = void> = () => R;
type ICalendarButtonProps = ButtonProps & {
	children?: ReactNode;
	onClickProp?: any;
	isLoading?: boolean;
}

const CalendarButton = ({children, onClickProp, disabled, isLoading, sx, ...props}: ICalendarButtonProps) => {
	const onClick = () => {
		if (onClickProp) {
			onClickProp();
		}
	};

	return (
		<div className="calendar-button">
			<Button
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
			</Button>
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

export default CalendarButton;