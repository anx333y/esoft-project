import './ChipList.css';
import styleConfig from '../../../../style.config';

import { useMemo } from 'react';

import Chip from "../Chip/Chip";

import { IChipListProps } from '../../../../types';
import { getCurrentMonthDays, getDaysAmountInAMonth, getNextMonthDays, getPreviousMonthDays } from '../../../../helpers/utils';

const ChipList = ({ chipsData, startDate, size = "m", setIsPopupOpen }: IChipListProps) => {
	const [panelMonth, panelYear] = useMemo(() => ([
		chipsData.month,
		chipsData.year
	]), [chipsData])


	const dateCells = useMemo(() => {
		const countOfCurrentMonthDays = getDaysAmountInAMonth(panelYear, panelMonth);

		const currentMonthDays = getCurrentMonthDays(panelYear, panelMonth, countOfCurrentMonthDays);
		const prevMonthDays = getPreviousMonthDays(panelYear, panelMonth);
		const nextMonthDays = getNextMonthDays(panelYear, panelMonth);

		return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
	}, [chipsData])

	return (
		<div
			className={"calendar-chiplist"}
			style={styleConfig.sizes[size].chiplist}
		>
			{
				dateCells.map(item => (
					<Chip
						key={`${item.year}${item.month}${item.date}`}
						fullDate={item}
						startDate={startDate}
						size={size}
						setIsPopupOpen={setIsPopupOpen}
					/>
				))
			}
		</div>
	)
}

export default ChipList;