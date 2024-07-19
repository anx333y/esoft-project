import "./QueueList.css";

import QueueCard from "../QueueCard/QueueCard";
import Skeleton from "../../../ui/Skeleton/Skeleton";

import { IQueue, IQueueListProps, IUserFields } from "../../../../types";



const QueueList = ({list = null}: IQueueListProps) => {

	if (!list) {
		const loadingList = [0, 0, 0, 0, 0, 0, 0, 0];
		return (
			<div className="queue-list">
				{
					loadingList.map((_, index) => (
					<Skeleton
						key={index}
						variant="rectangular"
						animation="wave"
						component="div"
						sx={{
							borderRadius: "10px",
							width: "calc(25% - 3* 8px / 4)",
							height: "80px"
						}}
					/>
					))}
			</div>
		)
	}

	return (
		<div className="queue-list">
			{
				list.map((row: IQueue & IUserFields, index: number) => (
					<QueueCard
						key={row.queue_date + row.queue_time}
						title={row.full_name ? String(row.full_name): "Неизвестный пользователь"}
						index={index}
						time={row.queue_time}
					/>
				))
			}
		</div>
	)
};

export default QueueList;