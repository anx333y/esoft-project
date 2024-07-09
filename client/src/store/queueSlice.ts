import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IQueue, IQueueInitialState } from "../types";

const queueSlice = createSlice({
	name: "queue",
	initialState: {
		data: null,
	} as IQueueInitialState,
	reducers: {
		setData: (state, action: PayloadAction<IQueue[]>) => {
			const data = action.payload;
			if (!(data && Array.isArray(data))) {
				return;
			}
			state.data = data;
		},
	},
});

export const {setData} = queueSlice.actions;
export default queueSlice.reducer;