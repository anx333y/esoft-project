import './TimeListItem.css';
import styleConfig from '../../../../../style.config';

import { useMemo } from 'react';

import CalendarChip from '../../../../ui/calendar/Chip/CalendarChip';

import { addPopupTimeRow } from "../../../../../store/calendarPopupSlice";

import { useAppDispatch, useAppSelector } from '../../../../../store/hook';
import { IPopupItemProps } from '../../../../../types';

const TimeListItem = ({row, disabled, darkColor, lightColor}: IPopupItemProps) => {
	const dispatch = useAppDispatch();
	const time = useAppSelector((state) => state.calendarPopup.time);
	
	const value = useMemo(() => {
		const timeArr = row["queue_time"].split(":");
		const tempTime = `${timeArr[0]}:${timeArr[1]}`;
		return tempTime;
	}, [])

	const valueObj = useMemo(() => {
		const [hours, minutes] = value.split(':');
		return {
			hours: parseInt(hours),
			minutes: parseInt(minutes)
		}
	}, [value])

	const onClick = () => {
		if (time.hours === valueObj.hours && time.minutes === valueObj.minutes) {
			dispatch(addPopupTimeRow({time: "0:0", row: null}));
			return;
		}
		dispatch(addPopupTimeRow({time: value, row: row}));
	};

	return (
		<div className="popup-timelist-item">
			<CalendarChip
				value={value}
				data={valueObj}
				mainData={time}
				onClickProp={onClick}
				darkColor={darkColor ? darkColor : styleConfig.colors.secondary?.dark}
				lightColor={lightColor ? lightColor : styleConfig.colors.secondary?.light}
				styles={{
					fontSize: "14px"
				}}
				disabled={disabled}
			/>
		</div>
	)
};

export default TimeListItem;