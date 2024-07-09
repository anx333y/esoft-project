import './Calendar.css';
import Carousel from "../Carousel/Carousel";
import ChipList from "../ChipList/ChipList";
import { createContext, useEffect, useRef, useState } from 'react';
import Popup from '../Popup/Popup';

import { useAppDispatch, useAppSelector } from '../../../../store/hook';
import { IDate, ICalendarProps, ICheckedDateContext, IPanel } from '../../../../types';
import { useGetAllQueueQuery } from '../../../../http/queueApi';
import { setCalendarData } from '../../../../store/calendarSlice';
import { Skeleton } from '@mui/material';
import { accessErrorAnalyzer } from '../../../../store/userSlice';

export const CheckedDateContext = createContext<ICheckedDateContext>({
	checkedDate: {
		date: 0,
		month: 0,
		year: 0
	},
	setCheckedDate: () => {}
});

const Calendar = ({fullDate, size = 'm'}: ICalendarProps) => {
	const dispatch = useAppDispatch();

	const {data, isSuccess, isLoading, isError, error} = useGetAllQueueQuery(null);
	const storeDate = useAppSelector((state) => state.calendar.data);


	const [checkedDate, setCheckedDate] = useState<IDate>(fullDate);
	const [panelMonthYear, setPanelMonthYear] = useState<IPanel>({
		"year": fullDate.year,
		"month": fullDate.month
	});

	const popupRef = useRef<HTMLDivElement>(null!);

	useEffect(() => {
		if (isSuccess) {
			dispatch(setCalendarData(data));
		}
	}, [data])

	useEffect(() => {
		if (isError) {
			dispatch(accessErrorAnalyzer(error));
		}
	}, [isError])

	if (isLoading || !storeDate) {
		return (
			<Skeleton
				variant='rectangular'
				width="100%"
				height="400px"
				component={"div"}
				animation="wave"
				sx={{
					borderRadius: "10px"
				}}
			/>
		)
	}

	if (isError) {
		return (
			<span>Ошибка получения данных</span>
		)
	}

	return (
		<CheckedDateContext.Provider value={{checkedDate, setCheckedDate}}>
			<div
				className="calendar"
			>
				<div className="calendar-main">
					<Carousel panel={{panelMonthYear, setPanelMonthYear}} size={size}/>
					{
						isSuccess && <ChipList size={size} chipsData={panelMonthYear} startDate={fullDate} popupElem={popupRef.current} />
					}
				</div>
				<Popup ref={popupRef} size={size} />
			</div>
		</CheckedDateContext.Provider>
	);
};

export default Calendar;