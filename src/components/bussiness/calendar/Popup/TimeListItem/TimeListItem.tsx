import './TimeListItem.css';
import styleConfig from '../../../../../style.config';

import { useDispatch, useSelector } from "react-redux";
import { addPopupTime } from "../../../../../store/calendarPopupSlice";
import { RootState } from '../../../../../store/store';

import { useMemo } from 'react';
import CalendarChip from '../../../../ui/calendar/Chip/CalendarChip';

type IPopupItemProps = {
	value: string;
}

const TimeListItem = ({value}: IPopupItemProps) => {
	const dispatch = useDispatch();
	const time = useSelector((state: RootState) => state.calendarPopup.time);

	const valueObj = useMemo(() => {
		const [hours, minutes] = value.split(':');
		return {
			hours: parseInt(hours),
			minutes: parseInt(minutes)
		}
	}, [value])

	const onClick = () => {
		dispatch(addPopupTime(value));
	};

	return (
		<div className="popup-timelist-item">
			<CalendarChip
				value={value}
				data={valueObj}
				mainData={time}
				onClickProp={onClick}
				darkColor={styleConfig.colors.secondary?.dark}
				lightColor={styleConfig.colors.secondary?.light}
			/>
		</div>
	)
};

export default TimeListItem;