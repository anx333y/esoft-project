import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { logout, setUser } from "../store/userSlice";

const getBaseQueryWithReauth = (
	baseQuery: ReturnType<typeof fetchBaseQuery>,
): BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
> => async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result.error && (result.error.status === 401 || result.error.status === 403)) {
		const refreshResult = await baseQuery({url: '/refresh', credentials: 'include'}, api, extraOptions);
		if (refreshResult.data && (refreshResult.data as { accessToken: string }).accessToken) {
			api.dispatch(setUser((refreshResult.data as { accessToken: string }).accessToken));
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(logout());
			await baseQuery('/logout', api, extraOptions)
		}
	}
	return result;
};


export default getBaseQueryWithReauth;