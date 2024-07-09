import Calendar from "../../components/bussiness/calendar/Calendar/Calendar";
import "./CalendarPage.css";

const currentDate = new Date();
const currentStrDate = {
	date: currentDate.getDate(),
	month: currentDate.getMonth(),
	year: currentDate.getFullYear()
};

const CalendarPage = () => {
	return (
		<div className="calendar-page">
			<Calendar fullDate={currentStrDate} />
		</div>
	)
};

export default CalendarPage;