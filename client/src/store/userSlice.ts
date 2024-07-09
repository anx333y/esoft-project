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
		"isAuth": false
	},
	reducers: {
		setUserByToken: (state, action: PayloadAction<string>) => {
			const token = action.payload || null;
			if (!token) {
				throw new Error ("Токена не существует или его срок действия истёк");
			}
			const userData = jwtDecode<IJwtObject>(token);
			console.log(userData)
			state["id"] = userData["id"] || "";
			state["full_name"] = userData["full_name"] || "";
			state["email"] = userData["email"] || "";
			state["role"] = userData["role"] || "";
			state.isAuth = true;
		},
		setUser: (state, action: PayloadAction<string>) => {
			const token = action.payload || null;
			if (!token) {
				console.log('net tokena')
				return;
			}
			localStorage.setItem("user", JSON.stringify({
				token
			}));

			const userData = jwtDecode<IJwtObject>(token);
			console.log(userData)
			state["id"] = userData["id"] || "";
			state["full_name"] = userData["full_name"] || "";
			state["email"] = userData["email"] || "";
			state["role"] = userData["role"] || "";
			state.isAuth = true;
		},
		logout: (state) => {
			localStorage.clear();
			state["id"] = "";
			state["full_name"] = "";
			state["email"] = "";
			state["role"] = "";
			state.isAuth = false;
		},
		accessErrorAnalyzer: (state, action) => {
			if (action.payload.status && (action.payload.status === "403" || action.payload.status === "401")) {
				state.isAuth = false;
			}
		}
	}
});

export const { setUser, setUserByToken, logout, accessErrorAnalyzer} = userSlice.actions;

export default userSlice.reducer;