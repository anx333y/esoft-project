import { GridEventListener, GridFilterModel, GridRowEditStopReasons, GridRowModesModel, GridSortModel } from "@mui/x-data-grid";
import { IQueryParams, IDataFromUserCalendarRow, IDate, IQueue } from "../types";
import { Dispatch } from "react";


const VISIBLE_CELLS_AMOUNT = 7 * 6;
const sundayWeekToMondayWeekDayMap: Record<number, number> = {
	0: 6,
	1: 0,
	2: 1,
	3: 2,
	4: 3,
	5: 4,
	6: 5,
};

export const getDaysAmountInAMonth = (year: number, month: number) => {
	const nextMonthDate = new Date(year, month + 1, 1);
	nextMonthDate.setMinutes(-1);
	return nextMonthDate.getDate();
};

const getDayOfTheWeek = (date: Date) => {
	const day = date.getDay();

	return sundayWeekToMondayWeekDayMap[day];
};

export const getCurrentMonthDays = (
	year: number,
	month: number,
	numberOfDays: number
) => {
	const dateCells: IDate[] = [];

	for (let i = 1; i <= numberOfDays; i++) {
		dateCells.push({
			year,
			month,
			date: i,
			type: 'current',
		});
	}

return dateCells;
};

export const getPreviousMonthDays = (year: number, month: number) => {
	const currentMonthFirstDay = new Date(year, month, 1);
	const prevMonthCellsAmount = getDayOfTheWeek(currentMonthFirstDay);

	const daysAmountInPrevMonth = getDaysAmountInAMonth(year, month - 1);

	const dateCells: IDate[] = [];

	const [cellYear, cellMonth] =
		month === 0 ? [year - 1, 11] : [year, month - 1];

	for (let i = prevMonthCellsAmount - 1; i >= 0; i--) {
		dateCells.push({
			year: cellYear,
			month: cellMonth,
			date: daysAmountInPrevMonth - i,
			type: 'prev',
		});
	}

	return dateCells;
};

export const getNextMonthDays = (year: number, month: number) => {
	const currentMonthFirstDay = new Date(year, month, 1);
	const prevMonthCellsAmount = getDayOfTheWeek(currentMonthFirstDay);

	const daysAmount = getDaysAmountInAMonth(year, month);

	const nextMonthDays =
		VISIBLE_CELLS_AMOUNT - daysAmount - prevMonthCellsAmount;

	const [cellYear, cellMonth] =
		month === 11 ? [year + 1, 0] : [year, month + 1];

	const dateCells: IDate[] = [];

	for (let i = 1; i <= nextMonthDays; i++) {
		dateCells.push({
			year: cellYear,
			month: cellMonth,
			date: i,
			type: 'next',
		});
	}

	return dateCells;
};

export const isDatesEqual = (firstDateObj: IDate, secondDateObj: IDate) => {
	const tempCheckedDate = new Date(firstDateObj.year, firstDateObj.month, firstDateObj.date);
	const tempFullDate = new Date(secondDateObj.year, secondDateObj.month, secondDateObj.date);

	return tempCheckedDate.toISOString() === tempFullDate.toISOString()
};

export const isDateLower = (firstDateObj: IDate, secondDateObj: IDate) => {
	const tempCheckedDate = new Date(firstDateObj.year, firstDateObj.month, firstDateObj.date);
	const tempFullDate = new Date(secondDateObj.year, secondDateObj.month, secondDateObj.date);

	return tempCheckedDate.toISOString() < tempFullDate.toISOString();
};

export const isInactive = (fullDate: IDate, startDate: IDate | null = null) => {
	if (startDate) {
		return isDateLower(fullDate, startDate) || fullDate.type && (fullDate.type === 'prev' || fullDate.type === 'next'); 
	}
	return fullDate.type && (fullDate.type === 'prev' || fullDate.type === 'next');
};

export const getChipThemeByDates = (checkedDate: IDate, fullDate: IDate) => {
	if (isInactive(fullDate)) {
		return 'inactive-chip';
	}

	if (isDatesEqual(checkedDate, fullDate)) {
		return 'dark-chip';
	}

	return 'light-chip';
};

export const getTimeStampFromDateObj = (dateObj: IDate) => {
	if (!dateObj.year) {
		return 0;
	}
	const tempDate = new Date(dateObj.year, dateObj.month, dateObj.date);
	return tempDate.getTime();
};

export const getISODate = (timeStamp: number) => {
	const date = new Date(timeStamp);
	const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
	return dateString;
};

export const isDateInData = (data: IQueue[] | null, dateObj: IDate) => {
	if (!data) {
		return;
	}
	const findedData = data.find((row: IQueue) => {
		const dateString = `${dateObj.year}-${String(dateObj.month + 1).padStart(2, "0")}-${String(dateObj.date).padStart(2, "0")}`;
		const rowDateString = row["queue_date"];
		return dateString === rowDateString;
	});

	return !findedData;
};

export const getPlusTime = (oldTime: string, plusNumber: number) => {
	const tempTime = new Date;
	const parsedOldTime = oldTime.split(":");
	tempTime.setHours(parseInt(parsedOldTime[0]));
	tempTime.setMinutes(parseInt(parsedOldTime[1]) + plusNumber);

	return `${String(tempTime.getHours()).padStart(2, "0")}:${String(tempTime.getMinutes()).padStart(2, "0")}`;
};

export const isUserTodayQueue = (data: IQueue[] | null, userId: string) => {
	if (!data || !Array.isArray(data)) {
		return false;
	}
	
	const isUser = data.findIndex((row: IQueue) => (
		row.user_id === userId
	));

	return isUser !== -1;
};

export const getDateWithTimezone = (date: string, time: string) => {
	const dateWithTimezone = new Date(date);
	const timeArr = time.split(':');
	dateWithTimezone.setHours(parseInt(timeArr[0]));
	dateWithTimezone.setMinutes(parseInt(timeArr[1]));

	return dateWithTimezone;
};

export const isDateInBetween = (date: Date, leftDate: Date, rightDate: Date) => {
	return leftDate.getTime() <= date.getTime() && date.getTime() <= rightDate.getTime();
};

export const isDateInCalendarValues = (date: Date, values: IDataFromUserCalendarRow[]) => {
	const findedDateIndex = values.findIndex((row) => isDateInBetween(date, new Date(row.start), new Date(row.end)));
	return findedDateIndex !== -1;
}

export const getToken = () => {
	const storage = localStorage.getItem("user");
	if (!storage) {
		return;
	}

	const token = JSON.parse(storage).token;

	if (!token) {
		return;
	}

	return token;
}

export const formatPeople = (number: number): string => {
	if (number % 10 === 1 && number % 100 !== 11) {
			return `${number} человек`;
	} else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
			return `${number} человека`;
	} else {
			return `${number} человек`;
	}
};

export function addQueryParams(baseUrl: string, params: IQueryParams) {
	let url = new URL("http://lol.kek/" + baseUrl);
	function appendParams(key: string, value: string | string[]) {
		if (Array.isArray(value)) {
				value.forEach(v => url.searchParams.append(key, v));
		} else {
				url.searchParams.append(key, value);
		}
	}

	if (params.quickSearchValue) {
		appendParams('quickSearchValue', String(params.quickSearchValue))
		return url.toString().replace("http://lol.kek/", "");
	}

	if (params.page && params.limit) {
		appendParams('page', String(params.page));
		appendParams('limit', String(params.limit));
	}

	if (params.sort && params.sortField) {
		appendParams('sort', params.sort);
		appendParams('sortField', params.sortField);
	}

	if (params.filterField && params.filterValue && params.filterValue != "-1") {
		appendParams('filterField', params.filterField);
		appendParams('filterValue', params.filterValue);
	}

	if (params.selectFields && Array.isArray(params.selectFields)) {
			params.selectFields.forEach(field => {
				url.searchParams.append('selectFields', field);
			});
	}
	return url.toString().replace("http://lol.kek/", "");
}

export function isValidDate(dateStr: string) {
	const datePattern = /^\d{4}-\d{2}-\d{2}$/;
	if (!datePattern.test(dateStr)) {
			return false;
	}

	const [year, month, day] = dateStr.split('-').map(Number);

	if (month < 1 || month > 12) {
			return false;
	}

	const daysInMonth = new Date(year, month, 0).getDate();
	if (day < 1 || day > daysInMonth) {
			return false;
	}

	return true;
}

export function isValidTime(timeStr: string) {
	const timePattern = /^(\d{2}):(\d{2}):(\d{2})$/;
	const match = timeStr.match(timePattern);

	if (!match) {
			return false;
	}

	const [hours, minutes, seconds] = timeStr.split(":").map(time => parseInt(time));

	if (hours < 0 || hours > 23) {
			return false;
	}

	if (minutes < 0 || minutes > 59) {
			return false;
	}

	if (seconds < 0 || seconds > 59) {
			return false;
	}

	return true;
}

export function getCommentForm(count: number) {
	const lastDigit = count % 10;
	const lastTwoDigits = count % 100;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
			return `${count} комментариев`;
	}
	if (lastDigit === 1) {
			return `${count} комментарий`;
	}
	if (lastDigit >= 2 && lastDigit <= 4) {
			return `${count} комментария`;
	}
	return `${count} комментариев`;
}

export const getFilteredByStatusQueueList = (data: IQueue[], isSuccess: boolean) => {
	const queue = {
		passedQueue: [] as IQueue[],
		bookedQueue: [] as IQueue[],
		missedQueue: [] as IQueue[],
		processQueue: [] as IQueue[]
	}
	if (!isSuccess || !data) {
		return queue;
	}
	data.forEach((row: IQueue) => {
		switch (row.status) {
			case 'passed':
				queue.passedQueue.push(row);
				break;
			case 'booked':
				queue.bookedQueue.push(row);
				break;
			case 'missed':
				queue.missedQueue.push(row);
				break;
			case 'process':
				queue.processQueue.push(row);
				break;
		}
	});
	return queue;
};

export const handleFilterChange = (setFilterOptions: any) => (filterModel: GridFilterModel) => {
	const filterInfo = filterModel.items[0] || null;
	if (filterInfo && filterInfo.field && filterInfo.value) {
		setFilterOptions({filterField: filterInfo.field, filterValue: filterInfo.value});
	} else {
		setFilterOptions({});
	}
}

export const handleSortModelChange = (setSortOptions: any) => (sortModel: GridSortModel) => {
	const sortInfo = sortModel[0] || null;
	if (sortInfo && sortInfo.field && sortInfo.sort) {
		setSortOptions({sortField: sortInfo.field, sort: sortInfo.sort});
	} else {
		setSortOptions({});
	}
};

export const handleRowModesModelChange = (setRowModesModel: Dispatch<GridRowModesModel>) => (newRowModesModel: GridRowModesModel) => {
	setRowModesModel(newRowModesModel);
};

export const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
	if (params.reason === GridRowEditStopReasons.rowFocusOut) {
		event.defaultMuiPrevented = true;
	}
};