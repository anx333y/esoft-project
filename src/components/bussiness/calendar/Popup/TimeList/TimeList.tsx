import './TimeList.css';
import TimeListItem from "../TimeListItem/TimeListItem";
import styleConfig from '../../../../../style.config';

type ITimeListProps = {
	values: string[];
}

const TimeList = ({values}: ITimeListProps) => {
	return (
		<div className="popup-timelist">
			<span
				className="popup-timelist-helptext"
				style={{
					color: styleConfig.colors.secondary?.dark
				}}
			>
				Выберите время записи:
			</span>
			{
				values.map((value) => (
					<TimeListItem
						key={value}
						value={value}
					/>
				))
			}
		</div>
	)
};

export default TimeList;