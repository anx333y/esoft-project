import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUserFields } from "../types";

const signApi = createApi({
	reducerPath: "signApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000/api",
		credentials: 'include'
	}),
	endpoints: (build) => ({
		loginUser: build.mutation({
			query: (body: {email: string, password: string;}) => {
				return {
					url: '/login',
					method: 'POST',
					body
				}
			}
		}),
		registerUser: build.mutation({
			query: (body: IUserFields) => {
				return {
					url: '/register',
					method: 'POST',
					body
				}
			}
		}),
		logoutUser: build.mutation({
			query: (body) => {
				return {
					url: '/logout',
					method: 'POST',
					body
				}
			}
		}),
		checkAuthUser: build.mutation({
			query: () => {
				return {
					url: '/refresh',
					method: 'GET'
				}
			}
		}),
	})
});

export {signApi};
export const { useLoginUserMutation, useRegisterUserMutation, useLogoutUserMutation, useCheckAuthUserMutation } = signApi;