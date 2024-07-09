import { useEffect, useMemo } from "react";
import { useGetQueueByDateQuery } from "../../../../http/queueApi";
import { IQueue, IUserFields } from "../../../../types";
import Title from "../../../ui/Title/Title";
import QueueList from "../QueueList/QueueList";
import "./Queue.css";
import QueueTimer from "./QueueTimer";
import { getISODate } from "../../calendar/utils";
import { Skeleton } from "@mui/material";
import { toast } from "sonner";
import { useAppDispatch } from "../../../../store/hook";
import { accessErrorAnalyzer } from "../../../../store/userSlice";

const Queue = () => {
	const dispatch = useAppDispatch();

	const todayISODate = useMemo(() => {
		return getISODate(+new Date());
	}, [])

	const {
		data,
		isLoading,
		isError,
		error
	 } = useGetQueueByDateQuery(todayISODate);

	const visibleList = useMemo(() => {
		return data?.filter((row: IQueue & IUserFields) => row.status === true) || [];
	}, [data])

	useEffect(() => {
		if (isError) {
			toast.error('Ошибка получения данных');
			dispatch(accessErrorAnalyzer(error));
		}
	}, [isError])

	if (isLoading || !Array.isArray(visibleList)) {
		return (
			<>
				<div className="queue">
					<Skeleton 
						sx={{
							alignSelf: "center",
							borderRadius: "10px",
							width: "40%",
							height: "40px"
						}}
					/>
					<QueueList />
				</div>
			</>
		);
	}

	if (!visibleList.length) {
		return (
			<div className="queue-null">
				<Title variant="h2">
					Ещё никто не записался :)
				</Title>
			</div>
		)
	}

	return (
		<div className="queue">
			<Title variant="h2">
				<QueueTimer />
			</Title>
			<QueueList list={visibleList} />
		</div>
	)
};

export default Queue;