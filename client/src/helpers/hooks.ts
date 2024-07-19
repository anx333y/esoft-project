import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { logout, setUser } from "../store/userSlice";
import { useCheckAuthUserMutation, useLogoutUserMutation } from "../http/signApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";

export function useRouteMatch(patterns: readonly string[]) {
	const { pathname } = useLocation();

	for (let i = 0; i < patterns.length; i += 1) {
		const pattern = patterns[i];
		const possibleMatch = matchPath(pattern, pathname);
		if (possibleMatch !== null) {
			return possibleMatch;
		}
	}

	return null;
}

export const useLogout = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [
		logoutUser,
		{
			isSuccess: logoutUserIsSuccess,
			isError: logoutUserIsError
		}
	] = useLogoutUserMutation();

	useEffect(() => {
		if (logoutUserIsSuccess) {
			toast.success('Успех!', {
				description: 'Вы успешно вышли из аккаунта'
			})
		}
	}, [logoutUserIsSuccess]);

	useEffect(() => {
		if (logoutUserIsError) {
			toast.error('Ошибка!', {
				description: 'Ошибка выхода из аккаунта, попробуйте перезагрузить страницу и попробовать снова'
			})
		}
	}, [logoutUserIsError])

	const handleLogout = () => {
		dispatch(logout());
		logoutUser({});
		navigate('/login');
	};

	return handleLogout;
};

export function useActualToken(key: string) {
	const getLocalStorageValue = (key: string) => {
		{
			try {
				return window.localStorage.getItem(key);
			} catch (error) {
				return null;
			}
		}
	};

	const userId = useAppSelector(state => state.user.id);
	const [storedValue, setStoredValue] = useState(() => getLocalStorageValue(key));

	useEffect(() => {
		setStoredValue(getLocalStorageValue(key));
	}, [userId])


	return storedValue;
}

export const useReauth = () => {
	const dispatch = useDispatch();
	const [
		checkAuthUser,
		{
			isError
		}
	] = useCheckAuthUserMutation();

	const logout = useLogout();

	useEffect(() => {
		if (isError) {
			toast.error('Ошибка!', {
				description: 'Ошибка обновления токена, попробуйте перезагрузить страницу'
			})
		}
	}, [isError])

	const refreshToken = async () => {
		const result = await checkAuthUser({});
		const token = result.data.accessToken;
		if (token) {
			dispatch(setUser((token)));
		} else {
			logout();
		}
	};

	return refreshToken;
};