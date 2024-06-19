import './Calendar.css';
import styleConfig from '../../../../style.config';
import Carousel from "../Carousel/Carousel";
import ChipList from "../ChipList/ChipList";
import Line from '../Line/Line';
import { createContext, useEffect, useRef, useState } from 'react';
import { IDate } from '../utils';
import Popup from '../Popup/Popup';

import store from '../../../../store/store';
import { Provider } from 'react-redux';

type ICalendarProps = {
	date: number;
	month: number;
	year: number;
	size?: 's' | 'm' | 'l';
}

type ICheckedDateContext = {
	checkedDate: IDate;
	setCheckedDate: React.Dispatch<React.SetStateAction<IDate>> 
};

export type IPanel = {
	month: number;
	year: number;
}

export const CheckedDateContext = createContext<ICheckedDateContext>({
	checkedDate: {
		date: 0,
		month: 0,
		year: 0
	},
	setCheckedDate: () => {}
});

const Calendar = ({date, month, year, size = 'm'}: ICalendarProps) => {
	const [checkedDate, setCheckedDate] = useState<IDate>({year, month, date});
	const [panelMonthYear, setPanelMonthYear] = useState<IPanel>({
		year,
		month
	});

	const popupRef = useRef<HTMLDivElement>(null!);
	const [isPopupMount, setIsPopupMount] = useState(false);

	useEffect(() => {
		if (popupRef.current) {
			setIsPopupMount(true);
		}
	}, [popupRef.current])

	return (
		<Provider store={store}>
			<CheckedDateContext.Provider value={{checkedDate, setCheckedDate}}>
				<div
					className="calendar"
				>
					<div className="calendar-main">
						<Carousel panel={{panelMonthYear, setPanelMonthYear}} size={size}/>
						<Line
							width={styleConfig.sizes[size].line.width}
							height={styleConfig.sizes[size].line.height}
							color={styleConfig.colors.primary.dark}
						/>
						{
							isPopupMount && <ChipList size={size} chipsData={panelMonthYear} popupElem={popupRef.current} />
						}
					</div>
					<Popup ref={popupRef} size={size} />
				</div>
			</CheckedDateContext.Provider>
		</Provider>
	);
};

export default Calendar;