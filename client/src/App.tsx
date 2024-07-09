import './App.css';

import { ThemeProvider } from '@mui/material';
import appTheme from './themes/appTheme.ts';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout.tsx';
import QueuePage from './pages/QueuePage/QueuePage.tsx';
import CalendarPage from './pages/CalendarPage/CalendarPage.tsx';
import SignLayout from './layouts/SignLayout/SignLayout.tsx';
import SignPage from './pages/SignPage/SignPage.tsx';
import { useAppDispatch, useAppSelector } from './store/hook.ts';
import { useEffect } from 'react';
import { setUser } from './store/userSlice.ts';
import { useCheckAuthUserMutation } from './http/signApi.ts';
import { Toaster } from 'sonner';
import AdminPage from './pages/AdminPage/AdminPage.tsx';

const App = () => {
	const dispatch = useAppDispatch();
	const user = localStorage.getItem("user") || null;
	const [checkAuthUser, {data, isSuccess, isError}] = useCheckAuthUserMutation();
	const isAuth = useAppSelector(state => state.user.isAuth);

	useEffect(() => {
		if (user) {
			checkAuthUser();
		}
	}, [isAuth])

	useEffect(() => {
		if (isSuccess) {
			dispatch(setUser(data.accessToken))
		}
	}, [isSuccess]);

	return (
		<ThemeProvider theme={appTheme}>
			<BrowserRouter basename={import.meta.env.BASE_URL}>
				<Routes>
					<Route path='/' element={!!user && !isError ? <MainLayout /> : <Navigate to="/login" replace />}>
						<Route path='/' element={<QueuePage />} />
						<Route path='/calendar/' element={<CalendarPage />}/>
						<Route path='/admin' element={<AdminPage />} />
					</Route>
					<Route element={<SignLayout />}>
						<Route path='/login' element={<SignPage type="in" />}/>
						<Route path='/register' element={<SignPage type="up" />}/>
					</Route>
					<Route path='*' element={"<NotFoundPage />"} />
				</Routes>
				<Toaster
					position='top-right'
					expand={true}
					richColors
				/>
			</BrowserRouter>
		</ThemeProvider>
	)
};

export default App;
