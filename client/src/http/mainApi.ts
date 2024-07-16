import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addQueryParams, getToken } from "../helpers/utils";
import { IQueryParams, IQueue, IUserCalendar, IUserFields } from "../types";
import getBaseQueryWithReauth from "./reauth";
// import { useNavigate } from "react-router-dom";
// import { refreshToken, signApi } from "./signApi";

// const navigate = useNavigate();

const mainApi = createApi({
	reducerPath: "mainApi",
	tagTypes: ["Queue", "Users", "UserCalendarData"],
	baseQuery: getBaseQueryWithReauth(fetchBaseQuery({
		baseUrl: "http://localhost:3000/api",
		prepareHeaders: (headers) => {
			const token = getToken();
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	})),
	
	endpoints: (build) => ({
		getUsers: build.query({
			query: (params: IQueryParams) => addQueryParams("/users", params),
			providesTags: (result) => {
				let tempResult = result.rows ? result.rows : result;
				return tempResult
				? [
						...tempResult.map(({ id }: {id: string}) => ({ type: 'Users' as const, id })),
						{ type: 'Users', id: 'LIST' },
					]
				: [{ type: 'Users', id: 'LIST' }]
			}
		}),
		changeUser: build.mutation({
			query: (body: {id: string, content: IUserFields}) => {
				return {
					url: `/users/${body.id}`,
					method: 'PUT',
					body: {
						full_name: body.content.full_name,
						email: body.content.email,
						role: body.content.role,
						is_activated: body.content.is_activated
					}
				}
			},
			invalidatesTags: [{ type: 'Users', id: 'LIST' }],
		}),
		deleteUser: build.mutation({
			query: (id: string) => {
				return {
					url: `/users/${id}`,
					method: 'DELETE'
				}
			},
			invalidatesTags: [{ type: 'Users', id: 'LIST' }],
		}),
		getQueue: build.query({
			query: (params: IQueryParams) => addQueryParams("/queue", params),
			providesTags: (result) => {
				let tempResult = result.rows ? result.rows : result;
				return tempResult
				? [
						...tempResult.map(({ id }: {id: string}) => ({ type: 'Queue' as const, id })),
						{ type: 'Queue', id: 'LIST' },
					]
				: [{ type: 'Queue', id: 'LIST' }]
			}
		}),
		changeQueueRow: build.mutation({
			query: (body: {id: string, content: {user_id?: string | number, status?: string}}) => {
				return {
					url: `/queue/${body.id}`,
					method: 'PUT',
					body: {
						...body.content,
						user_id: body.content.user_id == -1 ? null : body.content.user_id,
					}
				}
			},
			invalidatesTags: [{ type: 'Queue', id: 'LIST' }],
		}),
		deleteQueueRow: build.mutation({
			query: (id: string) => {
				return {
					url: `/queue/${id}`,
					method: 'DELETE'
				}
			},
			invalidatesTags: [{ type: 'Queue', id: 'LIST' }],
		}),
		addQueueRow: build.mutation({
			query: (body: IQueue) => {
				return {
					url: '/queue',
					method: 'POST',
					body: {
						queue_date: body.queue_date,
						queue_time: body.queue_time,
						user_id: body.user_id,
						status: body.status
					}
				}
			},
			invalidatesTags: [{ type: 'Queue', id: 'LIST' }],
		}),
		addUserCalendar: build.mutation({
			query: (body: IUserCalendar) => {
				return {
					url: '/user-calendar',
					method: 'POST',
					body: {
						user_id: body.user_id,
						link: body.link
					}
				}
			},
			invalidatesTags: [{ type: 'UserCalendarData', id: 'LIST' }],
		}),
		deleteUserCalendar: build.mutation({
			query: (body: IUserCalendar) => {
				return {
					url: `/user-calendar/${body.user_id}`,
					method: 'DELETE'
				}
			},
			invalidatesTags: [{ type: 'UserCalendarData', id: 'LIST' }],
		}),
		getDataFromUserCalendar: build.query({
			query: (body: IUserCalendar) => {
				return `/user-calendar/${body.user_id}`;
			},
			providesTags: (result) => {
				let tempResult = result ? result.rows : null;
				return tempResult
				? [
						...tempResult.map(({ start, end }: {start: string, end: string}) => ({ type: 'UserCalendarData' as const, id: start + end })),
						{ type: 'UserCalendarData', id: 'LIST' },
					]
				: [{ type: 'UserCalendarData', id: 'LIST' }]
			}
		}),
		validateUserCalendarLink: build.mutation({
			query: (body: IUserCalendar) => {
				return {
					url: '/user-calendar/validate',
					method: 'POST',
					body: {
						link: body.link
					}
				}
			}
		}),
	}),
});

export {mainApi};
export const {
	useGetUsersQuery,
	useGetQueueQuery,
	useChangeQueueRowMutation,
	useDeleteQueueRowMutation,
	useAddQueueRowMutation,
	useChangeUserMutation,
	useDeleteUserMutation,
	useAddUserCalendarMutation,
	useDeleteUserCalendarMutation,
	useGetDataFromUserCalendarQuery,
	useValidateUserCalendarLinkMutation
} = mainApi;