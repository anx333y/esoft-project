// import { createSlice } from "@reduxjs/toolkit";
// import { IQueueInitialState } from "../types";
// import { fetchChangeQueueRow, fetchQueue } from "./asyncFunc";

// const calendarSlice = createSlice({
// 	name: "calendar",
// 	initialState: {
// 		loading: false,
// 		data: null,
// 		error: null,
// 	} as IQueueInitialState,
// 	reducers: {

// 	},
// 	extraReducers: (builder) => {
// 		builder
// 			.addCase(fetchQueue.pending, (state) => {
// 				state.loading = true;
// 				state.error = null;
// 			})
// 			.addCase(fetchQueue.fulfilled, (state, action) => {
// 				state.loading = false;
// 				state.data = action.payload;
// 				console.log(state.data)
// 			})
// 			.addCase(fetchQueue.rejected, (state, action) => {
// 				state.loading = false;
// 				if (action.error && action.error.message) {
// 					state.error = action.error.message;
// 				}
// 			})
// 			.addCase(fetchChangeQueueRow.pending, (state) => {
// 				state.loading = true;
// 				state.error = null;
// 			})
// 			.addCase(fetchChangeQueueRow.fulfilled, (state, action) => {
// 				state.loading = false;
// 				if (!state.data) {
// 					return;
// 				}
// 				const actionRow = action.payload[0];
// 				const index = state.data?.findIndex(row => row.id === actionRow.id);
// 				if (index === -1) {
// 					return;
// 				}
// 				const updatedData = [...state.data];
// 				updatedData[index] = {...actionRow};
				
// 				state.data = updatedData;
// 			})
// 			.addCase(fetchChangeQueueRow.rejected, (state, action) => {
// 				state.loading = false;
// 				if (action.error && action.error.message) {
// 					state.error = action.error.message;
// 				}
// 			})
// 	} 
// });

// export default calendarSlice.reducer;

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
			
			console.log('actionRow:', action.payload)
			if (!action.payload) {
				return;
			}
			const actionRow = action.payload;
			console.log('actionRow:', action.payload)
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