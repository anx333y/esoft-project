import './Carousel.css';
import styleConfig from '../../../../style.config';
import CarouselMui from 'react-material-ui-carousel';

import CarouselItem from './CarouselItem';

import { ICarouselProps } from '../../../../types';
import { months } from '../../../../helpers/constants';

const Carousel = ({panel, size = 'm'}: ICarouselProps) => {
	const { month, year } = panel.panelMonthYear;

	const handleChange = (isNext: boolean) => {
		const tempDate = new Date(year, month, 1);
		tempDate.setMonth(isNext ? month + 1 : month - 1);

		panel.setPanelMonthYear({
			"year": tempDate.getFullYear(),
			"month": tempDate.getMonth()
		});
	};

	return (
		<div
			className="carousel"
			style={{
				borderBottom: `1px solid ${styleConfig.colors.primary.dark}`
			}}
		>
			<CarouselMui
				navButtonsProps={{
						style: {
								backgroundColor: 'transparent',
								color: '#282D35',
								width: styleConfig.sizes[size].carouselItem.width,
								height: styleConfig.sizes[size].carouselItem.height,
								fontSize: styleConfig.sizes[size].chip.fontSize,
								borderRadius: "10px",
								margin: "0",
								top: "0"
						}
				}}
				navButtonsWrapperProps={{
						style: {
								height: styleConfig.sizes[size].carouselItem.height
						}
				}}
				navButtonsAlwaysVisible={true}
				autoPlay={false}
				duration={0}
				indicators={false}
				height={styleConfig.sizes[size].carouselItem.height}
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