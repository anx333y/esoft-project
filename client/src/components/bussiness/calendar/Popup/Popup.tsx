import './Popup.css';
import { shallowEqual } from 'react-redux';

import { ForwardRefRenderFunction, forwardRef, useEffect, useMemo, useState } from 'react';

import TimeList from './TimeList/TimeList';
import styleConfig from '../../../../style.config';
import { useAppDispatch, useAppSelector } from '../../../../store/hook';
import { getISODate, isUserTodayQueue } from '../utils';
import CalendarButton from '../../../ui/calendar/Button/CalendarButton';
import { IPopupProps, IQueue } from '../../../../types';
// import { fetchChangeQueueRow } from '../../../../store/asyncFunc';
import TimeGroupList from './TimeGroupList/TimeGroupList';
import { Collapse } from '@mui/material';
import { useChangeQueueRowMutation } from '../../../../http/queueApi';
import { updateCalendarData } from '../../../../store/calendarSlice';
import { addPopupTimeRow } from '../../../../store/calendarPopupSlice';
import { toast } from 'sonner';

const Popup: ForwardRefRenderFunction<HTMLDivElement, IPopupProps> = ({size = 'm'}, ref) => {
	const dispatch = useAppDispatch();
	const [
		changeQueueRow,
		{
			isSuccess: changeQueueIsSuccess,
			isError: changeQueueIsError,
			isLoading: changeQueueIsLoading
		}
	] = useChangeQueueRowMutation();

	const data = useAppSelector((state) => state.calendar.data) || [];
	const checkedRow = useAppSelector((state) => state.calendarPopup.checkedRow);
	const dateTimeStamp = useAppSelector((state) => state.calendarPopup.dateTimeStamp, shallowEqual);
	const userId = useAppSelector((state) => state.user.id);
	const [time, setTime] = useState<IQueue[] | null>(null);
	const [selectedTimeGroup, setSelectedTimeGroup] = useState<string | null>(null);
	const [savedTime, setSavedTime] = useState<any>({
		time: null,
		date: null
	});

	useEffect(() => {
		if (checkedRow) {
			const beautifulTime = checkedRow?.queue_time.slice(0, 5);
			const timestamp = Date.parse(checkedRow?.queue_date);
			const tempDate = new Date(timestamp);
			const beautifulDate = tempDate.toLocaleDateString();
			setSavedTime({
				time: beautifulTime,
				date: beautifulDate
			})
		}
	}, [checkedRow])

	useEffect(() => {
		if (!data) {
			// console.log("data нетю")
			return;
		}
		const tempTime = data.filter(row => {
			return row["queue_date"] === getISODate(dateTimeStamp);
		});
		if (!tempTime.length) {
			// console.log('емае нету темпТайм')
			return;
		}
		setTime(tempTime);
		// console.log('обновился временный список времени')
	}, [data, dateTimeStamp])

	const groupTime = useMemo(() => {
		if (!time) {
			return;
		}
		let groupTimeObj: {[keyof: string]: IQueue[]} = {};
		time?.forEach((row) => {
			const hours = row.queue_time.split(":")[0];
			if (!groupTimeObj[hours]) {
				groupTimeObj[hours] = [row];
			} else {
				groupTimeObj[hours].push(row)
			}
		})
		// console.log(groupTimeObj)
		return groupTimeObj;
	}, [time])

	const dateString = useMemo(() => {
		if(!dateTimeStamp) {
			return;
		}
		const date = new Date(dateTimeStamp);
		return date.toLocaleDateString();
	}, [dateTimeStamp]);

	const updateRow = async () => {
		if (!checkedRow || !userId) {
			return;
		}
		console.log('await')
		await changeQueueRow({id: checkedRow.id, content: {user_id: userId, status: "true"}});
		dispatch(updateCalendarData({...checkedRow, user_id: userId, status: true}));
		dispatch(addPopupTimeRow({time: "0:0", row: null}))
		console.log('dispatch')
	};

	const onClickButton = () => {
		updateRow();
	};

	useEffect(() => {
		if (changeQueueIsSuccess) {
			toast.success('Успешная запись', {
				description: `${savedTime.time} ${savedTime.date}`,
			})
		}
	}, [changeQueueIsSuccess])

	if (!dateString) {
		return;
	}
	console.log(userId)
	return (
		<div
			className="calendar-popup"
			ref={ref}
		>
			<h2
				className="calendar-popup-title"
				style={{
					minHeight: styleConfig.sizes[size].carouselItem.height,
					color: styleConfig.colors.primary.dark,
					fontSize: styleConfig.sizes[size].carouselItem.fontSize,
					borderBottom: `1px solid ${styleConfig.colors.primary.dark}`
				}}
			>
				{dateString}
			</h2>
			<div className="calendar-popup-main">
				{!!groupTime && <TimeGroupList values={Object.keys(groupTime)} state={selectedTimeGroup} onClickProp={(value: string) => setSelectedTimeGroup(value)} />}
				<Collapse in={!!selectedTimeGroup} sx={{width: "100%"}}>
					{!!groupTime && !!selectedTimeGroup && <TimeList values={groupTime[selectedTimeGroup]}/>}
				</Collapse>
			</div>
			<div className="calendar-popup-button">
				<CalendarButton
					onClickProp={onClickButton}
					disabled={isUserTodayQueue(time, userId) || !checkedRow}
					isLoading={changeQueueIsLoading}
				>
					Записаться
				</CalendarButton>
			</div>
			{
				changeQueueIsError &&
				<span>Ошибка, попробуйте позже</span>
			}
		</div>
	)
};

export default forwardRef(Popup);