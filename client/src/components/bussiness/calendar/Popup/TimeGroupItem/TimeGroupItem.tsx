import "./TimeGroupItem.css";
import styleConfig from "../../../../../style.config";

import CalendarChip from "../../../../ui/calendar/Chip/CalendarChip";

import { ITimeGroupItemProps } from "../../../../../types";

const TimeGroupItem = ({groupKey, state, onClickProp}: ITimeGroupItemProps) => {
	const onClick = () => {
		if (state === groupKey) {
			return () => onClickProp(null);
		}
		return () => onClickProp(groupKey)
	};
	
	return (
		<div className="popup-timegroup-item">
			<CalendarChip
				value={`${groupKey}:00`}
				onClickProp={onClick()}
				darkColor={styleConfig.colors.secondary?.dark}
				lightColor={styleConfig.colors.secondary?.light}
				styles={{
					fontSize: "14px"
				}}
				isClicked={state === groupKey}
			/>
		</div>
	)
};

export default TimeGroupItem;