import './Line.css';

type ILineProps = {
	height?: string;
	autoWidth?: boolean;
	width?: string;
	color?: string;
}

const Line = ({height = '1', autoWidth = true, width = '355', color = '#000'}: ILineProps) => {
	return (
		<div className="calendar-line">
			<svg className={autoWidth ? 'autosize' : ''} width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http:/\/www.w3.org/2000/svg">
				<line x1="0.5" y1="0.5" x2={parseFloat(width) - 0.5} y2="0.5" stroke={color} strokeWidth={height} strokeLinecap="round"/>
			</svg>
		</div>
	)
};

export default Line;