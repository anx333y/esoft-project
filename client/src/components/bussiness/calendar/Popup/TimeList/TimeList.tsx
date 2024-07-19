import './TimeList.css';
import styleConfig from '../../../../../style.config';

import TimeListItem from "../TimeListItem/TimeListItem";

import { IQueue, ITimeListProps } from '../../../../../types';
import { isDateInCalendarValues } from '../../../../../helpers/utils';

const TimeList = ({values, calendarValues}: ITimeListProps) => {
	if (!Array.isArray(values)) {
		return;
	}

	return (
		<div className="popup-timelist">
			{
				values.map((value: IQueue) => {
					const isInUserCalendar = isDateInCalendarValues(
						new Date(value.queue_date + 'T' + value.queue_time),
						calendarValues
					);

					return (
					<TimeListItem
						key={value?.queue_time + value?.queue_time}
						row={value}
						disabled={value?.status !== 'free'}
						darkColor={isInUserCalendar ? styleConfig.colors.error.main : ''}
					/>
				)})
			}
		</div>
	)
};

export default TimeList;