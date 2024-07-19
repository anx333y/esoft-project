import './CarouselItem.css';
import styleConfig from '../../../../style.config';

import { ICarouselItemProps } from '../../../../types';

const CarouselItem = ({children, size = 'm'}: ICarouselItemProps) => {


	return (
		<div
			className="carousel-item"
			style={
				{
					...styleConfig.sizes[size].carouselItem,
					color: styleConfig.colors.secondary.dark,
				}
			}
		>
			{children}
		</div>
	);
};

export default CarouselItem;