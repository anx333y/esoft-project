import './Popup.css';
import { shallowEqual, useSelector } from 'react-redux';
import type { RootState } from '../../../../store/store';

import { ForwardRefRenderFunction, forwardRef, useMemo } from 'react';

import { time } from '../tipoDB';
import TimeList from './TimeList/TimeList';
import Line from '../Line/Line';
import styleConfig from '../../../../style.config';

type IPopupProps = {
	size?: 's' | 'm' | 'l';
}

const Popup: ForwardRefRenderFunction<HTMLDivElement, IPopupProps> = ({size = 'm'}, ref) => {
	const dateTimeStamp = useSelector((state: RootState) => state.calendarPopup.dateTimeStamp, shallowEqual);
	console.log(dateTimeStamp)

	const dateString = useMemo(() => {
		if(!dateTimeStamp) {
			return;
		}
		const date = new Date(dateTimeStamp);
		return date.toLocaleDateString();
	}, [dateTimeStamp]);

	if (!dateString) {
		return ;
	}

	return (
		<div
			className="calendar-popup"
			ref={ref}
		>
			<h2
				className="calendar-popup-title"
				style={{
					height: styleConfig.sizes[size].carouselItem.height,
					color: styleConfig.colors.primary.dark,
					fontSize: styleConfig.sizes[size].carouselItem.fontSize
				}}
			>
				{dateString}
			</h2>
			<Line color={styleConfig.colors.primary.dark}/>
			<TimeList values={time}/>
		</div>
	)
};

export default forwardRef(Popup);