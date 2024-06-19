import './ChipList.css';
import styleConfig from '../../../../style.config';

import Chip from "../Chip/Chip";

import { useMemo } from 'react';
import { getDaysAmountInAMonth, getCurrentMonthDays, getNextMonthDays, getPreviousMonthDays } from '../utils';
import { IPanel } from '../Calendar/Calendar';

type IChipListProps = {
	size?: 's' | 'm' | 'l';
	chipsData: IPanel;
	popupElem: HTMLDivElement;
};

const ChipList = ({ chipsData, size = "m", popupElem }: IChipListProps) => {
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
						size={size}
						popupElem={popupElem}
					/>
				))
			}
		</div>
	)
}

export default ChipList;