import './Carousel.css';
import styleConfig from '../../../../style.config';
import CarouselMui from 'react-material-ui-carousel';
import CarouselItem from './CarouselItem';
import { IPanel } from '../Calendar/Calendar';

type ICarouselProps = {
	panel: {
		panelMonthYear: IPanel,
		setPanelMonthYear: React.Dispatch<React.SetStateAction<IPanel>> 
	};
	size?: 's' | 'm' | 'l';
}

const sizes = {
	s: {
		width: '32px',
		height: '32px'
	},
	m: {
		width: '42px',
		height: '42px'
	},
	l: {
		width: '64px',
		height: '64px'
	},
};

const months = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь'
];

const Carousel = ({panel, size = 'm'}: ICarouselProps) => {
	const { month, year } = panel.panelMonthYear;

	console.log(month, year);
	const handleChange = (isNext: boolean) => {
		const tempDate = new Date(year, month, 1);
		tempDate.setMonth(isNext ? month + 1 : month - 1);

		panel.setPanelMonthYear({
			"year": tempDate.getFullYear(),
			"month": tempDate.getMonth()
		});
	};

	return (
		<div className="carousel">
			<CarouselMui
				navButtonsProps={{
						style: {
								backgroundColor: 'transparent',
								color: '#282D35',
								width: sizes[size].width,
								height: sizes[size].height,
								fontSize: styleConfig.sizes[size].chip.fontSize,
								borderRadius: "10px",
								margin: "0",
								top: "0"
						}
				}}
				navButtonsWrapperProps={{
						style: {
								height: sizes[size].height,
						}
				}}
				navButtonsAlwaysVisible={true}
				autoPlay={false}
				duration={0}
				indicators={false}
				height={sizes[size].height}
				className='carousel-mui'
				next={() => handleChange(true)}
				prev={() => handleChange(false)}
				index={month}
			>
				{months.map(item => (
					<CarouselItem
						key={String(item)}
						size={size}
					>
						{`${item}, ${year}`}
					</CarouselItem>
				))}
			</CarouselMui>
		</div>
	)
};

export default Carousel;