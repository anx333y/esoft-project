import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { IUserFields } from "../types";

type IJwtObject = JwtPayload & IUserFields;

const userSlice = createSlice({
	name: "user",
	initialState: {
		"id": "",
		"full_name": "",
		"email": "",
		"role": "",
		"is_activated": false
	},
	reducers: {
		setUserByToken: (state, action: PayloadAction<string>) => {
			const token = action.payload || null;
			if (!token) {
				throw new Error ("Токена не существует или его срок действия истёк");
			}
			const userData = jwtDecode<IJwtObject>(token);
			state["id"] = userData["id"] || "";
			state["full_name"] = userData["full_name"] || "";
			state["email"] = userData["email"] || "";
			state["role"] = userData["role"] || "";
			state["is_activated"] = userData["is_activated"] || false;
		},
		setUser: (state, action: PayloadAction<string>) => {
			const token = action.payload || null;
			if (!token) {
				return;
			}
			localStorage.setItem("user", JSON.stringify({
				token
			}));

			const userData = jwtDecode<IJwtObject>(token);
			state["id"] = userData["id"] || "";
			state["full_name"] = userData["full_name"] || "";
			state["email"] = userData["email"] || "";
			state["role"] = userData["role"] || "";
			state["is_activated"] = userData["is_activated"] || false;
		},
		logout: (state) => {
			localStorage.clear();
			state["id"] = "";
			state["full_name"] = "";
			state["email"] = "";
			state["role"] = "";
			state["is_activated"] = false;
		},
		// accessErrorAnalyzer: (state, action) => {
		// 	if (action.payload.status && (action.payload.status === "403" || action.payload.status === "401")) {
		// 		state.isAuth = false;
		// 	}
		// }
	}
});

export const { setUser, setUserByToken, logout} = userSlice.actions;

export default userSlice.reducer;