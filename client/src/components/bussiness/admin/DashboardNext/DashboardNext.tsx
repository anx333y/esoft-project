import "./DashboardNext.css";

import DashboardButton from "../../../ui/Admin/Dashboard/Button/Button";

import { IDashboardNextProps } from "../../../../types";

const DashboardNext = ({bookedQueue, handleClickNext}: IDashboardNextProps) => {
	return (
		<div className="admin-dashboard-next">
			<div className="admin-dashboard-next-info">
			{
				!!bookedQueue.length ? (
					<>
						<span>Первый в очереди:</span>
						<span>{bookedQueue[0].full_name}</span>
						<span>Время {bookedQueue[0].queue_time}</span>
					</>
				) : <span>Очередь пуста</span>
			}
		</div>
			<DashboardButton
				onClick={handleClickNext}
				disabled={!bookedQueue.length}
			>
				Пригласить следующего
			</DashboardButton>
		</div>
	)
};

export default DashboardNext;