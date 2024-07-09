import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "./calendarSlice";
import calendarPopupSlice from "./calendarPopupSlice";
import queueSlice from "./queueSlice";
import userSlice from "./userSlice";
import { signApi } from "../http/signApi";
import { queueApi } from "../http/queueApi";
import { adminApi } from "../http/adminApi";

const store = configureStore({
	reducer: {
		calendar: calendarSlice,
		calendarPopup: calendarPopupSlice,
		queue: queueSlice,
		user: userSlice,
		[signApi.reducerPath]: signApi.reducer,
		[queueApi.reducerPath]: queueApi.reducer,
		[adminApi.reducerPath]: adminApi.reducer
	},
	middleware: (gDM) => gDM().concat(signApi.middleware, queueApi.middleware, adminApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;