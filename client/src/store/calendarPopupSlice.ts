import { createSlice } from "@reduxjs/toolkit";
import { IQueue } from "../types";

const calendarPopupSlice = createSlice({
	name: 'calendarPopup',
	initialState: {
		dateTimeStamp: Date.now(),
		time: {
			hours: 0,
			minutes: 0
		},
		checkedRow: null as IQueue | null
	},
	reducers: {
		addPopupDate: (state, action) => {
			state.dateTimeStamp = action.payload;
		},
		addPopupTimeRow: (state, action) => {
			const [hours, minutes] = action.payload.time.split(':');
			state.time = {
				hours: parseInt(hours),
				minutes: parseInt(minutes)
			}
			state.checkedRow = action.payload.row;
		}
	},
});

export const {
	addPopupDate,
	addPopupTimeRow
} = calendarPopupSlice.actions;

export default calendarPopupSlice.reducer;