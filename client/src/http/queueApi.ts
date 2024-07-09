import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../helpers/utils";

const queueApi = createApi({
	reducerPath: "queueApi",
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
		getAllQueue: build.query({
			query: () => '/queue',
		}),
		changeQueueRow: build.mutation({
			query: (body: {id: string; content: {user_id: string, status: string};}) => {
				return {
					url: `/queue/${body.id}`,
					method: 'PUT',
					body: body.content
				}
			}
		}),
		getQueueByDate: build.query({
			query: (date: string) => `/queue/bydate/${date}`
		}),
	})
});

export {queueApi};
export const { useGetAllQueueQuery, useChangeQueueRowMutation, useGetQueueByDateQuery } = queueApi;