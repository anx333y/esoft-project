import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addQueryParams, getToken } from "../helpers/utils";
import { INews, IQueryParams, IQueue, IUserCalendar, IUserFields } from "../types";
import getBaseQueryWithReauth from "./reauth";

const mainApi = createApi({
	reducerPath: "mainApi",
	tagTypes: ["Queue", "Users", "UserCalendarData", "NewsComments", "News"],
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
			query: (body: {id: string, content: Partial<IQueue>}) => {
				return {
					url: `/queue/${body.id}`,
					method: 'PUT',
					body: {
						...body.content,
						user_id: Number(body.content.user_id) === -1 ? null : body.content.user_id,
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
		addQueueArray: build.mutation({
			query: (body: IQueue) => {
				return {
					url: '/queue-array',
					method: 'POST',
					body
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
		getAllNews: build.query({
			query: (params: IQueryParams) => addQueryParams('/news', params),
			providesTags: (result) => {
				let tempResult = result.rows ? result.rows : result;
				return tempResult
				? [
						...tempResult.map(({ id }: {id: string}) => ({ type: 'News' as const, id })),
						{ type: 'News', id: 'LIST' },
					]
				: [{ type: 'News', id: 'LIST' }]
			}
		}),
		addNews: build.mutation({
			query: (body: INews) => {
				return {
					url: '/news',
					method: 'POST',
					body
				}
			},
			invalidatesTags: [{ type: 'News', id: 'LIST' }],
		}),
		changeNewsRow: build.mutation({
			query: (body: {id: string, content: INews}) => {
				return {
					url: `/news/${body.id}`,
					method: 'PUT',
					body: {
						...body.content,
					}
				}
			},
			invalidatesTags: [{ type: 'News', id: 'LIST' }],
		}),
		deleteNewsRow: build.mutation({
			query: (id: string) => {
				return {
					url: `/news/${id}`,
					method: 'DELETE'
				}
			},
			invalidatesTags: [{ type: 'News', id: 'LIST' }],
		}),
		getNewsById: build.query({
			query: (id: string) => `/news/${id}`
		}),
		getNewsComments: build.query({
			query: (params: IQueryParams) => addQueryParams('/news-comments', params),
			providesTags: (result) => {
				let tempResult = result.rows ? result.rows : result;
				return tempResult
				? [
						...tempResult.map(({ id }: {id: string}) => ({ type: 'NewsComments' as const, id })),
						{ type: 'NewsComments', id: 'LIST' },
					]
				: [{ type: 'NewsComments', id: 'LIST' }]
			}
		}),
		getNewsCommentsByNewsId: build.query({
			query: (id: string) => `/news-comments/news/${id}`,
			providesTags: (result) => {
				let tempResult = result.rows ? result.rows : result;
				return tempResult
				? [
						...tempResult.map(({ id }: {id: string}) => ({ type: 'NewsComments' as const, id })),
						{ type: 'NewsComments', id: 'LIST' },
					]
				: [{ type: 'NewsComments', id: 'LIST' }]
			}
		}),
		addNewsComment: build.mutation({
			query: (body) => {
				return {
					url: '/news-comments',
					method: 'POST',
					body
				}
			},
			invalidatesTags: [
				{ type: 'NewsComments', id: 'LIST' },
				{ type: 'News', id: 'LIST'}
			],
		}),
		deleteNewsComment: build.mutation({
			query: (id: string) => {
				return {
					url: `/news-comments/${id}`,
					method: 'DELETE'
				}
			},
			invalidatesTags: [{ type: 'NewsComments', id: 'LIST' }],
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
	useAddQueueArrayMutation,
	useChangeUserMutation,
	useDeleteUserMutation,
	useAddUserCalendarMutation,
	useDeleteUserCalendarMutation,
	useGetDataFromUserCalendarQuery,
	useValidateUserCalendarLinkMutation,
	useGetAllNewsQuery,
	useGetNewsByIdQuery,
	useGetNewsCommentsByNewsIdQuery,
	useAddNewsCommentMutation,
	useChangeNewsRowMutation,
	useDeleteNewsRowMutation,
	useAddNewsMutation,
	useGetNewsCommentsQuery,
	useDeleteNewsCommentMutation
} = mainApi;