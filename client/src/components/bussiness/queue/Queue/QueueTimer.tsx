import { useEffect, useState } from "react";

const QueueTimer = () => {
	const [today, setToday] = useState(new Date);

	useEffect(() => {
		const timerID = setInterval(() => {
			setToday(new Date());
		}, 1000);

		return () => {
			clearInterval(timerID);
		};
	}, [])
	return (
		<>
			{today.toLocaleString()}
		</>
	)
};

export default QueueTimer;