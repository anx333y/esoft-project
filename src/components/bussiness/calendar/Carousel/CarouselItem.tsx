import './CarouselItem.css';
import styleConfig from '../../../../style.config';

type ICarouselItemProps = {
	children: string;
	size?: 's'| 'm' | 'l';
}

const CarouselItem = ({children, size = 'm'}: ICarouselItemProps) => {


	return (
		<div
			className="carousel-item"
			style={
				{
					...styleConfig.sizes[size].carouselItem,
					color: styleConfig.colors.primary.dark,
				}
			}
		>
			{children}
		</div>
	);
};

export default CarouselItem;