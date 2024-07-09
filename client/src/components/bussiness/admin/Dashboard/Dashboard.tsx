import DashboardItem from "../DashboardItem/DashboardItem";
import "./Dashboard.css";
import styleConfig from "../../../../style.config";
import Title from "../../../ui/Title/Title";
import DashboardButton from "../../../ui/Admin/Dashboard/Button/Button";
import { useGetQueueQuery } from "../../../../http/adminApi";
import { getISODate } from "../../calendar/utils";
import { useMemo } from "react";

const Dashboard = () => {
	const todayISODate = useMemo(() => {
		return getISODate(+new Date());
	}, []);

	const { data, isSuccess } = useGetQueueQuery({
		filterField: "queue_date",
		filterValue: todayISODate,
		sortField: "queue_time",
		sort: "asc"
	})


	return (
		<div className="admin-dashboard">
			<DashboardItem>
				<Title
					variant="h4"
					sx={{
						color: styleConfig.colors.secondary?.light,
						fontWeight: 500,
						marginBottom: "16px"
					}}
				>
					Статистика
				</Title>
				<span>Сегодня ожидается: 500 человек</span>
				<span>Сегодня прошло: 2 человека</span>
			</DashboardItem>
			<DashboardItem>
				{
					isSuccess && (
						<div className="admin-dashboard-next-info">
							<span>Первый в очереди:</span>
							<span>{data[0] && data[0].full_name}</span>
						</div>
					)
				}
				<DashboardButton>Пригласить следующего</DashboardButton>
			</DashboardItem>
		</div>
	)
};

export default Dashboard;