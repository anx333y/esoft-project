import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IQueue, IQueueInitialState, IUserFields } from "../types";

const calendarSlice = createSlice({
	name: "calendar",
	initialState: {
		data: null,
		dataByDate: null
	} as IQueueInitialState,
	reducers: {
		setCalendarData: (state, action: PayloadAction<IQueue[]>) => {
			const data = action.payload;
			if (!(data && Array.isArray(data))) {
				return;
			}
			state.data = data;
		},
		setCalendarDataByDate: (state, action: PayloadAction<(IQueue & IUserFields)[]>) => {
			const data = action.payload;
			if (!(data && Array.isArray(data))) {
				return;
			}
			state.dataByDate = data;
		},
		updateCalendarData: (state, action) => {
			if (!state.data) {
				return;
			}
			
			if (!action.payload) {
				return;
			}
			const actionRow = action.payload;
			const index = state.data?.findIndex(row => row.id === actionRow.id);
			if (!index || index === -1) {
				return;
			}
			const updatedData = [...state.data];
			updatedData[index] = {...state.data[index], ...actionRow};
			
			state.data = updatedData;
		}
	},
});

export const {setCalendarData, updateCalendarData} = calendarSlice.actions;
export default calendarSlice.reducer;