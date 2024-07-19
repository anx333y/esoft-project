import "./QueueCard.css";
import styleConfig from "../../../../style.config";

import { IQueueCardProps } from "../../../../types";
import { getPlusTime } from "../../../../helpers/utils";

const QueueCard = ({title = '', time = '', index = 0, forLoading = false}: IQueueCardProps) => {
	if (forLoading) {
		<div className="queue-card"></div>
	}

	return (
		<div
			className="queue-card"
			style={{
				backgroundColor: styleConfig.colors.secondary?.dark,
				color: styleConfig.colors.secondary?.light
			}}
		>
			<span
					className="queue-card-text number"
					style={{
						backgroundColor: styleConfig.colors.secondary?.succes,
						color: styleConfig.colors.primary.light,
					}}
				>
					{index + 1}
			</span>
			<div className="queue-card-main">
				<span className="queue-card-title">{title}</span>
				<span
					className="queue-card-text"
					style={{
						backgroundColor: styleConfig.colors.secondary?.light,
						color: styleConfig.colors.secondary?.dark
					}}
				>
					{`${getPlusTime(time, 0)}-${getPlusTime(time, 3)}`}
				</span>
			</div>
		</div>
	)
};

export default QueueCard;