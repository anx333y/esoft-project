import { configureStore } from "@reduxjs/toolkit";
import calendarPopupSlice from "./calendarPopupSlice";

const store = configureStore({
	reducer: {
		calendarPopup: calendarPopupSlice,
	}
});

export default store;

export type RootState = ReturnType<typeof store.getState>;