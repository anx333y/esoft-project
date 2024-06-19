export type IDate = {
	date: number;
	month: number;
	year: number;
	type?: 'next' | 'prev' | 'current';
}


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
	// mutates the date object
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

	return tempCheckedDate.toDateString() === tempFullDate.toDateString()
};

export const isInactive = (fullDate: IDate) => {
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