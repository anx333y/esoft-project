import "./Queue.css";
import { useEffect, useMemo } from "react";

import Text from "../../../ui/Text/Text";
import QueueList from "../QueueList/QueueList";
import QueueTimer from "./QueueTimer";
import Skeleton from "../../../ui/Skeleton/Skeleton";

import { toast } from "sonner";

import { useGetQueueQuery } from "../../../../http/mainApi";

import { getISODate } from "../../../../helpers/utils";
import { IQueue, IUserFields } from "../../../../types";

const Queue = () => {

	const todayISODate = useMemo(() => {
		return getISODate(+new Date());
	}, [])

	const {
		data,
		isLoading,
		isError
	 } = useGetQueueQuery({
		filterField: ['queue_date', 'status'],
		filterValue: [todayISODate, 'booked']
	 });

	const visibleList = useMemo(() => {
		return data?.filter((row: IQueue & IUserFields) => row.status === 'booked') || [];
	}, [data])

	useEffect(() => {
		if (isError) {
			toast.error('Ошибка получения данных, попробуйте перезагрузить странциу');
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
				<Text font="h2">
					Ещё никто не записался :)
				</Text>
			</div>
		)
	}

	return (
		<div className="queue">
			<Text font="h2">
				<QueueTimer />
			</Text>
			<QueueList list={visibleList} />
		</div>
	)
};

export default Queue;