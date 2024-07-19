import "./Dashboard.css";
import styleConfig from "../../../../style.config";

import { useEffect, useMemo } from "react";

import DashboardItem from "../../../ui/Admin/Dashboard/DashboardItem/DashboardItem";
import Text from "../../../ui/Text/Text";
import { toast } from "sonner";
import DashboardNext from "../DashboardNext/DashboardNext";
import DashboardVisitorPanel from "../DashboardVisitorPanel/DashboardVisitorPanel";
import QueueTimer from "../../queue/Queue/QueueTimer";
import ExplicitText from "../../../ui/Admin/Dashboard/ExplicitText/ExplicitText";

import { formatPeople, getFilteredByStatusQueueList } from "../../../../helpers/utils";
import { getISODate } from "../../../../helpers/utils";

import { useChangeQueueRowMutation, useGetQueueQuery } from "../../../../http/mainApi";

const Dashboard = () => {
	const todayISODate = useMemo(() => {
		return getISODate(+new Date());
	}, []);

	const { data, isSuccess, isError, refetch } = useGetQueueQuery({
		filterField: "queue_date",
		filterValue: todayISODate,
		sortField: "queue_time",
		sort: "asc"
	});

	const [
		changeQueueRow,
		{
			isSuccess: changeQueueRowIsSuccess,
			isError: changeQueueRowIsError
		}
	] = useChangeQueueRowMutation();

	const {passedQueue, bookedQueue, missedQueue, processQueue} = useMemo(() => {
		return getFilteredByStatusQueueList(data, isSuccess);
	}, [data, isSuccess])

	const handleClickNext = () => {
		if (!bookedQueue.length || !bookedQueue[0].id) {
			return;
		}
		changeQueueRow({id: bookedQueue[0].id, content: {status: 'process'}});
		refetch();
	};

	const handleMissedClick = () => {
		if (!processQueue.length || !processQueue[0].id) {
			return;
		}
		changeQueueRow({id: processQueue[0].id, content: {status: 'missed'}});
		refetch();
	};

	const handlePassedClick = () => {
		if (!processQueue.length || !processQueue[0].id) {
			return;
		}
		changeQueueRow({id: processQueue[0].id, content: {status: 'passed'}});
		refetch();
	};

	useEffect(() => {
		if (changeQueueRowIsError || isError) {
			toast.error('Ошибка!', {
				description: `Ошибка ${
					isError
						? 'получения данных, попробуйте перезагрузить страницу'
						: 'призыва следующего, попробуйте ещё раз'
					}`,
			});
		}
	}, [changeQueueRowIsError, isError])

	useEffect(() => {
		if (changeQueueRowIsSuccess) {
			toast.success('Успех!', {
				description: `Следующий человек успешно приглашён`,
			});
		}
	}, [changeQueueRowIsSuccess])

	return (
		<div className="admin-dashboard">
			<Text font="h2" sx={{width: "100%"}}>
				<QueueTimer />
			</Text>
			<DashboardItem>
				<Text
					font="h4"
					sx={{
						color: styleConfig.colors.secondary?.light,
						fontWeight: 500,
						marginBottom: "8px"
					}}
				>
					Статистика
				</Text>
				<div className="admin-dashboard-stats">
					<div className="admin-dashboard-stats-item">
						<span>Сегодня ожидается:</span>
						<ExplicitText
							bgColor={styleConfig.colors.success.main}
							color="#fff"
						>
							{formatPeople(bookedQueue.length)}
						</ExplicitText>
					</div>
					<div className="admin-dashboard-stats-item">
						<span>Сегодня пришло:</span>
						<ExplicitText>
							{formatPeople(passedQueue.length)}
						</ExplicitText>
					</div>
				</div>
			</DashboardItem>
			<DashboardItem>
				<Text
					font="h4"
					sx={{
						color: styleConfig.colors.secondary?.light,
						fontWeight: 500,
						marginBottom: "8px"
					}}
				>
					Вызов следующего
				</Text>
				<DashboardNext bookedQueue={bookedQueue} handleClickNext={handleClickNext}/>
			</DashboardItem>
			<DashboardItem>
				<Text
					font="h4"
					sx={{
						color: styleConfig.colors.secondary?.light,
						fontWeight: 500,
						marginBottom: "16px"
					}}
				>
					Панель управления зашедшим
				</Text>
				{
					!!processQueue && (
						<DashboardVisitorPanel
							row={processQueue[0]}
							handleMissedClick={handleMissedClick}
							handlePassedClick={handlePassedClick}
						/>
					)
				}
			</DashboardItem>
		</div>
	)
};

export default Dashboard;