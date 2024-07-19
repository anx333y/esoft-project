import './App.css';

import { useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

import MainLayout from './layouts/MainLayout/MainLayout.tsx';
import QueuePage from './pages/QueuePage/QueuePage.tsx';
import CalendarPage from './pages/CalendarPage/CalendarPage.tsx';
import SignLayout from './layouts/SignLayout/SignLayout.tsx';
import SignPage from './pages/SignPage/SignPage.tsx';
import AdminPage from './pages/AdminPage/AdminPage.tsx';
import ActivateUserPage from './pages/ActivateUserPage/ActivateUserPage.tsx';
import NewsPage from './pages/NewsPage/NewsPage.tsx';
import OneNewsPage from './pages/OneNewsPage/OneNewsPage.tsx';

import { useAppDispatch, useAppSelector } from './store/hook.ts';
import { useActualToken } from './helpers/hooks.ts';

import { setUser } from './store/userSlice.ts';

const App = () => {
	const dispatch = useAppDispatch();
	const user = useActualToken('user');
	const userId = useAppSelector(state => state.user.id);
	const userIsActivated = useAppSelector(state => state.user.is_activated);
	const userRole = useAppSelector(state => state.user.role);

	useEffect(() => {
		if (user) {
			dispatch(setUser(JSON.parse(user).token));
		}
	}, [user]);

	if (user && JSON.parse(user).token && !userId) {
		return (
			<div className="app-centered">
				<CircularProgress color="secondary" />
			</div>
		)
	}

	return (
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<Routes>
				<Route path='/' element={
						!!user && userIsActivated
								? <MainLayout />
								: <Navigate to="/activate-user" replace />
					}
				>
					<Route path='/' element={<QueuePage />} />
					<Route path='/calendar' element={<CalendarPage />}/>
					<Route path='/admin' element={
						userRole === 'admin'
							? <AdminPage />
							: <Navigate to="/" replace />
						} />
					<Route path='/news' element={<NewsPage />} />
					<Route path='/news/:newsId' element={<OneNewsPage />} />
				</Route>
				<Route element={<SignLayout />}>
					<Route path='/login' element={<SignPage type="in" />}/>
					<Route path='/register' element={<SignPage type="up" />}/>
					<Route path='/activate-user' element={<ActivateUserPage />} />
				</Route>
				<Route path='*' element={"<NotFoundPage />"} />
			</Routes>
			<Toaster
				position='top-right'
				expand={true}
				richColors
			/>
		</BrowserRouter>
	)
};

export default App;
