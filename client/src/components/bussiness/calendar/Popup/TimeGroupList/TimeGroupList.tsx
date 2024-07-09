import './TimeGroupList.css';
import styleConfig from '../../../../../style.config';
import TimeGroupItem from '../TimeGroupItem/TimeGroupItem';

type ITimeGroupListProps = {
	values: string[];
	onClickProp: any;
	state: string | null;
}

const TimeGroupList = ({values, state, onClickProp}: ITimeGroupListProps) => {
	if (!Array.isArray(values)) {
		// console.log(values)
		return;
	}
	
	// console.log(values)
	return (
		<div className="popup-timegroup-list">
			<span
				className="popup-timegroup-helptext"
				style={{
					color: styleConfig.colors.secondary?.dark
				}}
			>
				Выберите время записи:
			</span>
			{
				values.map((value) => {
					return (
					<TimeGroupItem key={value} groupKey={value} state={state} onClickProp={onClickProp}/>
				)})
			}
		</div>
	)
};

export default TimeGroupList;