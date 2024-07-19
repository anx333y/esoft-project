import './TimeGroupList.css';
import styleConfig from '../../../../../style.config';

import TimeGroupItem from '../TimeGroupItem/TimeGroupItem';

import { ITimeGroupListProps } from '../../../../../types';

const TimeGroupList = ({values, state, onClickProp}: ITimeGroupListProps) => {
	if (!Array.isArray(values)) {
		return;
	}
	
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
				values.map((value) => (
					<TimeGroupItem
						key={value}
						groupKey={value}
						state={state}
						onClickProp={onClickProp}
					/>
				))
			}
		</div>
	)
};

export default TimeGroupList;