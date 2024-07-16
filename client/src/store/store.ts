import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "./calendarSlice";
import calendarPopupSlice from "./calendarPopupSlice";
import queueSlice from "./queueSlice";
import userSlice from "./userSlice";
import { signApi } from "../http/signApi";
import { mainApi } from "../http/mainApi";

const store = configureStore({
	reducer: {
		calendar: calendarSlice,
		calendarPopup: calendarPopupSlice,
		queue: queueSlice,
		user: userSlice,
		[signApi.reducerPath]: signApi.reducer,
		[mainApi.reducerPath]: mainApi.reducer
	},
	middleware: (gDM) => gDM().concat(signApi.middleware, mainApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;