import './TimeList.css';
import TimeListItem from "../TimeListItem/TimeListItem";
import { IQueue, ITimeListProps } from '../../../../../types';

const TimeList = ({values}: ITimeListProps) => {
	if (!Array.isArray(values)) {
		// console.log(values)
		return;
	}
	
	// console.log(values)
	return (
		<div className="popup-timelist">
			{
				values.map((value: IQueue) => {
					return (
					<TimeListItem
						key={value?.queue_time + value?.queue_time}
						row={value}
						disabled={value?.status}
					/>
				)})
			}
		</div>
	)
};

export default TimeList;