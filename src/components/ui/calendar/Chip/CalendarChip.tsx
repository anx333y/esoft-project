import { Chip, SxProps } from "@mui/material";

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
	// if (false) {
	// 	return 'inactive-chip';
	// }

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
			console.log(first[key], second[key])
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

type ConditionalArrowFunction<R = void> = () => R;
type IChipProps = {
	value: string | number;
	data: IData;
	mainData: IData;
	onClickProp: ConditionalArrowFunction;
	styles?: SxProps;
	darkColor?: string;
	lightColor?: string;
	disabled?: boolean;
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
	classNames
}: IChipProps) => {
	const onClick = () => {
		onClickProp();
	};
	return (
		<div className={"calendar-chip" + classNames ? ` ${classNames}` : ''}>
			<Chip
				label={value}
				onClick={onClick}
				sx={{
					width: "100%",
					...getChipTheme(mainData, data, darkColor, lightColor),
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