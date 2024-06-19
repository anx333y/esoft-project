import './Chip.css';
import styleConfig from '../../../../style.config';
import { CheckedDateContext } from '../Calendar/Calendar';
import { IDate, getTimeStampFromDateObj, isDatesEqual, isInactive } from '../utils';

import { useContext } from "react";
import { useDispatch } from 'react-redux';
import { addPopupDate } from '../../../../store/calendarPopupSlice';
import CalendarChip from '../../../ui/calendar/Chip/CalendarChip';

export type IChipProps = {
	classNames?: string;
	size?: 's' | 'm' | 'l';
	theme?: string;
	name?: string;
	fullDate: IDate;
	popupElem: HTMLDivElement;
};

const Chip = ({
	classNames,
	size = "m",
	fullDate,
	popupElem
}: IChipProps) => {
	const {checkedDate, setCheckedDate} = useContext(CheckedDateContext);

	const dispatch = useDispatch();

	const onClick = () => {
		if (isInactive(fullDate)) {
			return;
		}

		if (isDatesEqual(checkedDate, fullDate)) {
			console.log(checkedDate, fullDate)
			setCheckedDate({
				"year": 0,
				"month": 0,
				"date": 0
			});
			popupElem && popupElem.classList.add('hidden');
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
		popupElem && popupElem.classList.remove('hidden');
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
			disabled={isInactive(fullDate)}
			classNames={classNames}
		/>
	)
};

export default Chip;