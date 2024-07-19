import './Chip.css';
import styleConfig from '../../../../style.config';
import { CheckedDateContext } from '../Calendar/Calendar';

import { useContext, useMemo } from "react";

import CalendarChip from '../../../ui/calendar/Chip/CalendarChip';

import { addPopupDate } from '../../../../store/calendarPopupSlice';

import { IChipProps } from '../../../../types';
import { getTimeStampFromDateObj, isDateInData, isDatesEqual, isInactive } from '../../../../helpers/utils';
import { useAppDispatch, useAppSelector } from '../../../../store/hook';



const Chip = ({
	classNames,
	size = "m",
	fullDate,
	startDate,
	setIsPopupOpen
}: IChipProps) => {
	const {checkedDate, setCheckedDate} = useContext(CheckedDateContext);
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.calendar.data);
	
	const isDisabled = useMemo(() => {
		return isDateInData(data, fullDate) || isInactive(fullDate, startDate)
	}, [data, fullDate, startDate])

	const onClick = () => {
		if (isInactive(fullDate, startDate)) {
			return;
		}

		if (isDatesEqual(checkedDate, fullDate)) {
			setCheckedDate({
				"year": 0,
				"month": 0,
				"date": 0
			});
			setIsPopupOpen(false);
			dispatch(addPopupDate(0));
			return;
		}

		const newCheckedDate = {
			"year": fullDate.year,
			"month": fullDate.month,
			"date": fullDate.date
		};
		setCheckedDate(newCheckedDate);
		dispatch(addPopupDate(getTimeStampFromDateObj(newCheckedDate)));
		setIsPopupOpen(true);
	};

	return (
		<CalendarChip
			value={fullDate.date}
			data={fullDate}
			mainData={checkedDate}
			onClickProp={onClick}
			darkColor={styleConfig.colors.secondary?.dark}
			lightColor={styleConfig.colors.secondary?.light}
			styles={{
				...styleConfig.sizes[size].chip,
				borderRadius: "50%",
			}}
			disabled={isDisabled}
			classNames={classNames}
		/>
	)
};

export default Chip;