import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../helpers/utils";
import { IQueue, IUserFields } from "../types";

type IQueryParams = {
	page?: number;
	limit?: number;
	filterField?: string;
	filterValue?: string | number;
	sortField?: string;
	sort?: string;
	selectFields?: string[];
}

function addQueryParams(baseUrl: string, params: IQueryParams) {
	let url = new URL("http://lol.kek/" + baseUrl);
	console.log(params)
	if (params.page && params.limit) {
			url.searchParams.append('page', String(params.page));
			url.searchParams.append('limit', String(params.limit));
	}

	if (params.sort && params.sortField) {
		url.searchParams.append('sort', String(params.sort));
		url.searchParams.append('sortField', String(params.sortField));
	}

	if (params.filterField && params.filterValue && params.filterValue != -1) {
		url.searchParams.append('filterField', String(params.filterField));
		url.searchParams.append('filterValue', String(params.filterValue));
	}

	if (params.selectFields && Array.isArray(params.selectFields)) {
			params.selectFields.forEach(field => {
				url.searchParams.append('selectFields', field);
			});
	}

	return url.toString().replace("http://lol.kek/", "");
}

const adminApi = createApi({
	reducerPath: "adminApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000/api",
		prepareHeaders: (headers) => {
			const token = getToken();
			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	
	endpoints: (build) => ({
		getUsers: build.query({
			query: (params: IQueryParams) => addQueryParams("/users", params)
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
			}
		}),
		deleteUser: build.mutation({
			query: (id: string) => {
				return {
					url: `/users/${id}`,
					method: 'DELETE'
				}
			}
		}),
		getQueue: build.query({
			query: (params: IQueryParams) => addQueryParams("/queue", params)
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
			}
		}),
		deleteQueueRow: build.mutation({
			query: (id: string) => {
				return {
					url: `/queue/${id}`,
					method: 'DELETE'
				}
			}
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
			}
		})
	})
});

export {adminApi};
export const {
	useGetUsersQuery,
	useGetQueueQuery,
	useChangeQueueRowMutation,
	useDeleteQueueRowMutation,
	useAddQueueRowMutation,
	useChangeUserMutation,
	useDeleteUserMutation
} = adminApi;