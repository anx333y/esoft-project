import { createSlice } from "@reduxjs/toolkit";

const calendarPopupSlice = createSlice({
	name: 'calendarPopup',
	initialState: {
		dateTimeStamp: Date.now(),
		time: {
			hours: 0,
			minutes: 0
		},
	},
	reducers: {
		addPopupDate: (state, action) => {
			state.dateTimeStamp = action.payload;
		},
		addPopupTime: (state, action) => {
			const [hours, minutes] = action.payload.split(':');
			state.time = {
				hours: parseInt(hours),
				minutes: parseInt(minutes)
			}
		}
	}
});

export const {
	addPopupDate,
	addPopupTime
} = calendarPopupSlice.actions;

export default calendarPopupSlice.reducer;