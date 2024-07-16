import DashboardItem from "../../../ui/Admin/Dashboard/DashboardItem/DashboardItem";
import "./Dashboard.css";
import styleConfig from "../../../../style.config";
import Title from "../../../ui/Title/Title";
import { useChangeQueueRowMutation, useGetQueueQuery } from "../../../../http/mainApi";
import { getISODate } from "../../calendar/utils";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { IQueue } from "../../../../types";
import { formatPeople } from "../../../../helpers/utils";
import DashboardNext from "../DashboardNext/DashboardNext";
import DashboardVisitorPanel from "../DashboardVisitorPanel/DashboardVisitorPanel";
import QueueTimer from "../../queue/Queue/QueueTimer";
import ExplicitText from "../../../ui/Admin/Dashboard/ExplicitText/ExplicitText";

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
		const queue = {
			passedQueue: [] as IQueue[],
			bookedQueue: [] as IQueue[],
			missedQueue: [] as IQueue[],
			processQueue: [] as IQueue[]
		}
		if (!isSuccess || !data) {
			return queue;
		}
		data.forEach((row: IQueue) => {
			switch (row.status) {
				case 'passed':
					queue.passedQueue.push(row);
					break;
				case 'booked':
					queue.bookedQueue.push(row);
					break;
				case 'missed':
					queue.missedQueue.push(row);
					break;
				case 'process':
					queue.processQueue.push(row);
					break;
			}
		});
		return queue;
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
				description: `Ошибка ${isError ? 'получения данных, попробуйте перезагрузить страницу' : 'призыва следующего, попробуйте ещё раз'}`,
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
			<Title variant="h2">
				<QueueTimer />
			</Title>
			<DashboardItem>
				<Title
					variant="h4"
					sx={{
						color: styleConfig.colors.secondary?.light,
						fontWeight: 500,
						marginBottom: "8px"
					}}
				>
					Статистика
				</Title>
				<div className="admin-dashboard-stats">
					<div className="admin-dashboard-stats-item">
						Сегодня ожидается:
						<ExplicitText
							bgColor={styleConfig.colors.success.main}
							color="#fff"
						>
							{formatPeople(bookedQueue.length)}
						</ExplicitText>
					</div>
					<div className="admin-dashboard-stats-item">
						Сегодня пришло:
						<ExplicitText>
							{formatPeople(passedQueue.length)}
						</ExplicitText>
					</div>
				</div>
			</DashboardItem>
			<DashboardItem>
				<Title
					variant="h4"
					sx={{
						color: styleConfig.colors.secondary?.light,
						fontWeight: 500,
						marginBottom: "8px"
					}}
				>
					Вызов следующего
				</Title>
				<DashboardNext bookedQueue={bookedQueue} handleClickNext={handleClickNext}/>
			</DashboardItem>
			<DashboardItem>
				<Title
					variant="h4"
					sx={{
						color: styleConfig.colors.secondary?.light,
						fontWeight: 500,
						marginBottom: "16px"
					}}
				>
					Панель управления зашедшим
				</Title>
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