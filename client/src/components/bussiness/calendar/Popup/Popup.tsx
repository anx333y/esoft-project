import './Popup.css';
import styleConfig from '../../../../style.config';
import { Collapse, IconButton } from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';

import { useEffect, useMemo, useState } from 'react';
import { shallowEqual } from 'react-redux';

import TimeList from './TimeList/TimeList';
import Button from '../../../ui/Button/Button';
import UserCalendarDialog from './UserCalendarDialog/UserCalendarDialog';

import { toast } from 'sonner';

import { updateCalendarData } from '../../../../store/calendarSlice';
import { addPopupTimeRow } from '../../../../store/calendarPopupSlice';
import { useChangeQueueRowMutation, useGetDataFromUserCalendarQuery } from '../../../../http/mainApi';

import TimeGroupList from './TimeGroupList/TimeGroupList';
import { useAppDispatch, useAppSelector } from '../../../../store/hook';
import { IPopupProps, IQueue } from '../../../../types';
import { getISODate, isUserTodayQueue } from '../../../../helpers/utils';


const Popup = ({size = 'm'}: IPopupProps) => {
	const dispatch = useAppDispatch();

	const data = useAppSelector((state) => state.calendar.data) || [];
	const checkedRow = useAppSelector((state) => state.calendarPopup.checkedRow);
	const dateTimeStamp = useAppSelector((state) => state.calendarPopup.dateTimeStamp, shallowEqual);
	const userId = useAppSelector((state) => state.user.id);

	const [selectedTimeGroup, setSelectedTimeGroup] = useState<string | null>(null);
	const [savedTime, setSavedTime] = useState<any>({
		time: null,
		date: null
	});
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [
		changeQueueRow,
		{
			isSuccess: changeQueueIsSuccess,
			isError: changeQueueIsError,
			isLoading: changeQueueIsLoading
		}
	] = useChangeQueueRowMutation();

	const {
		data: dataFromUserCalendar,
		isSuccess: dataFromUserCalendarIsSuccess,
		isError: dataFromUserCalendarIsError,
		error: dataFromUserCalendarError
	} = useGetDataFromUserCalendarQuery({user_id: userId});

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
	}, [checkedRow]);

	const time = useMemo(() => {
		if (!data) {
			return null;
		}
		
		const tempTime = data.filter(row => {
			return row["queue_date"] === getISODate(dateTimeStamp);
		});

		if (!tempTime.length) {
			return null;
		}

		return tempTime;
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
				groupTimeObj[hours].push(row);
			}
		})

		return groupTimeObj;
	}, [time])

	const dateString = useMemo(() => {
		if(!dateTimeStamp) {
			return;
		}
		const date = new Date(dateTimeStamp);
		dispatch(addPopupTimeRow({time: "0:0", row: null}));
		return date.toLocaleDateString();
	}, [dateTimeStamp]);

	const updateRow = () => {
		if (!checkedRow || !checkedRow.id || !userId) {
			return;
		}
		changeQueueRow({id: checkedRow.id, content: {user_id: userId, status: "booked"}});
		dispatch(updateCalendarData({...checkedRow, user_id: userId, status: "booked"}));
		dispatch(addPopupTimeRow({time: "0:0", row: null}))
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
	}, [changeQueueIsSuccess]);

	useEffect(() => {
		if (dataFromUserCalendarIsError) {
			if ((dataFromUserCalendarError as {status: number}).status === 404) {
				return;
			}
			toast.error('Ошибка!', {
				description: `Ошибка загрузки пользовательского календаря, попробуйте перезагрузить страницу`,
			});
		}
	}, [dataFromUserCalendarIsError])

	if (!dateString) {
		return;
	}

	return (
		<>
		<div
			className="calendar-popup"
		>
			<h2
				className="calendar-popup-title"
				style={{
					minHeight: styleConfig.sizes[size].carouselItem.height,
					color: styleConfig.colors.secondary.dark,
					fontSize: styleConfig.sizes[size].carouselItem.fontSize,
					borderBottom: `1px solid ${styleConfig.colors.primary.dark}`
				}}
			>
				{dateString}
			</h2>
			<div className="calendar-popup-main">
				{!!groupTime &&
					<TimeGroupList
						values={Object.keys(groupTime)}
						state={selectedTimeGroup}
						onClickProp={
							(value: string) => setSelectedTimeGroup(value)
						}
					/>
				}
				<Collapse in={!!selectedTimeGroup} sx={{width: "100%"}}>
					{!!groupTime && !!selectedTimeGroup &&
						<TimeList
							values={groupTime[selectedTimeGroup]}
							calendarValues={
								dataFromUserCalendarIsSuccess
									? dataFromUserCalendar.rows
									: []
							}
						/>
					}
				</Collapse>
			</div>
			<div className="calendar-popup-button">
				<Button
					onClickProp={onClickButton}
					disabled={isUserTodayQueue(time, userId) || !checkedRow}
					isLoading={changeQueueIsLoading}
				>
					Записаться
				</Button>
			</div>
			{
				changeQueueIsError &&
				<span>Ошибка, попробуйте позже</span>
			}
		</div>
		<div className="user-calendar-button">
			<IconButton onClick={() => setIsDialogOpen(true)}>
				<CalendarMonth
					color={
						dataFromUserCalendarIsSuccess
							? "success"
							: "secondary"
					}
					fontSize='inherit'
				/>
			</IconButton>
		</div>
		<UserCalendarDialog
			open={isDialogOpen}
			setOpen={setIsDialogOpen}
			link={
				dataFromUserCalendarIsSuccess
					? dataFromUserCalendar["ical_link"]
					: null
			}
			userId={userId} />
		</>
	)
};

export default Popup;