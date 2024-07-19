import './Calendar.css';
import Skeleton from '../../../ui/Skeleton/Skeleton';

import { createContext, useEffect, useState } from 'react';

import Carousel from "../Carousel/Carousel";
import ChipList from "../ChipList/ChipList";
import Popup from '../Popup/Popup';

import { toast } from 'sonner';

import { useAppDispatch, useAppSelector } from '../../../../store/hook';
import { IDate, ICalendarProps, ICheckedDateContext, IPanel } from '../../../../types';

import { setCalendarData } from '../../../../store/calendarSlice';
import { useGetQueueQuery } from '../../../../http/mainApi';

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

	const {data, isSuccess, isLoading, isError} = useGetQueueQuery({});
	const storeDate = useAppSelector((state) => state.calendar.data);


	const [checkedDate, setCheckedDate] = useState<IDate>(fullDate);
	const [panelMonthYear, setPanelMonthYear] = useState<IPanel>({
		"year": fullDate.year,
		"month": fullDate.month
	});
	const [isPopupOpen, setIsPopupOpen] = useState(true);

	useEffect(() => {
		if (isSuccess) {
			dispatch(setCalendarData(data));
		}
	}, [data])

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
		toast.error('Ошибка!', {
			description: 'Ошибка получения данных, попробуйте перезагрузить страницу'
		})
		return;
	}

	return (
		<CheckedDateContext.Provider value={{checkedDate, setCheckedDate}}>
			<div
				className="calendar"
			>
				<div className="calendar-main">
					<Carousel panel={{panelMonthYear, setPanelMonthYear}} size={size}/>
					{
						isSuccess &&
							<ChipList
								size={size}
								chipsData={panelMonthYear}
								startDate={fullDate}
								setIsPopupOpen={setIsPopupOpen}
							/>
					}
				</div>
				{isPopupOpen && <Popup size={size} />}
			</div>
		</CheckedDateContext.Provider>
	);
};

export default Calendar;