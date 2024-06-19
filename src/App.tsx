import './App.css';

import { ThemeProvider } from '@mui/material';
import appTheme from './themes/appTheme.ts';
import Calendar from './components/bussiness/calendar/Calendar/Calendar.tsx';

const currentDate = new Date();
const currentStrDate = {
	date: currentDate.getDate(),
	month: currentDate.getMonth(),
	year: currentDate.getFullYear()
};

const App = () => {
	return (
		<ThemeProvider theme={appTheme}>
			<Calendar
				date={currentStrDate.date}
				month={currentStrDate.month}
				year={currentStrDate.year}
				size='m'
			/>
		</ThemeProvider>
	)
};

export default App;
