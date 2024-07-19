import { Chip, SxProps } from "@mui/material";
import { useMemo } from "react";

type IData =
	{
		[key in string]: string | number;
	}
	| string
	| number;

type IFunReturn = {
	color?: string,
	bgcolor?: string,
	"&:hover"?: {
		bgcolor: string,
	}
}


const getChipTheme = (
	first: IData,
	second: IData,
	darkColor: string,
	lightColor: string
): IFunReturn | undefined => {
	let flag = false;
	if (typeof(first) !== typeof(second)) {
		return;
	}

	if (typeof(first) === 'string' || typeof(second) === 'number') {
		if (first !== second) {
			flag = true;
		}
	} else if (typeof(first) === 'object' && typeof(second) === 'object') {
		if (Array.isArray(first) || Array.isArray(second)) {
			return;
		}
		for (const key in first) {
			if (first[key] !== second[key]) {
				flag = true;
				break;
			}
		}
	}

	if (flag) {
		return {
			color: darkColor,
			bgcolor: lightColor,
			"&:hover": {
				bgcolor: lightColor,
			}
		}
	}

	return {
		color: lightColor,
		bgcolor: darkColor,
		"&:hover": {
			bgcolor: darkColor,
		}
	}
};

type IChipProps = {
	value: string | number;
	data?: IData;
	mainData?: IData;
	onClickProp: () => void;
	styles?: SxProps;
	darkColor?: string;
	lightColor?: string;
	disabled?: boolean;
	type?: "date" | "none";
	isClicked?: boolean;
	classNames?: string;
};

const CalendarChip = ({
	value,
	data,
	mainData,
	onClickProp,
	styles,
	darkColor = '#000',
	lightColor = '#fff',
	disabled = false,
	type = "date",
	isClicked,
	classNames
}: IChipProps) => {
	const onClick = () => {
		onClickProp();
	};
	const theme = useMemo(() => {
		if (type === "date" && !!mainData && !!data) {
			return getChipTheme(mainData, data, darkColor, lightColor);
		}
		if (!isClicked) {
			return {
				color: darkColor,
				bgcolor: lightColor,
				"&:hover": {
					bgcolor: lightColor,
				}
			}
		}
		return {
			color: lightColor,
			bgcolor: darkColor,
			"&:hover": {
				bgcolor: darkColor,
			}
		}
	}, [mainData, data, isClicked]);
	return (
		<div className={"calendar-chip" + (classNames ? ` ${classNames}` : '')}>
			<Chip
				label={value}
				onClick={onClick}
				sx={{
					width: "100%",
					...theme,
					...styles,
					fontFamily: "inherit",
					'& .MuiChip-label': {
						padding: "0",
					}
				}}
				disabled={disabled}
			/>
		</div>
	);
};

export default CalendarChip;