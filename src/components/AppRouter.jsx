// Импорты
import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router/routes';
import { StoreContext, AppRouterContext, AutorizationContext } from '../context/context';
/////////////////////////////////////////////////////

const AppRouter = () => {
	// Состояния
	const { setPageNow } = useContext(StoreContext); // Получение состояний из глобального хранилища
	const { isAuth, setIsAuth } = useContext(AutorizationContext); // Получение состояния авторизации
	/////////////////////////////////////////////////////

	// Функционал
	const navigate = useNavigate();
	useEffect(() => {
		const auth = JSON.parse(localStorage.getItem('Auth'));
		const storedPageNow = localStorage.getItem('pageNow') ? localStorage.getItem('pageNow') : '/start';
		if (auth) {
			setIsAuth(true);
			if (storedPageNow === '/start') {
				setPageNow('/start');
				navigate('/start');
			} else if (storedPageNow === '/game') {
				setPageNow('/game');
				navigate('/game');
			} else if (storedPageNow === '/results') {
				setPageNow('/results');
				navigate('/results');
			}
		} else {
			navigate('/login');
		}
	}, [navigate, isAuth]); // Переадресовывает на нужную страницу, и на другие попасть невозможно

	const changePage = (link) => {
		localStorage.setItem('pageNow', link);
		setPageNow(link);
		navigate(link);
	}; // Функция для изменения текущей страницы
	/////////////////////////////////////////////////////

	// Отрисовка компонентов
	return (
		<AppRouterContext.Provider // useContex для передачи состояний отсюда по всем компонентам
			value={{
				changePage // Изменение страницы
			}} // в value нужно добавлять состояния, которые ме хотим передать другим компонентам (для чистаемости: 1 строчка - 1 состояние и функция для управления им)
		>
			<Routes>
				{isAuth ? (
					<>
						{privateRoutes.map(route => ( // Чтобы добавить новую страницу, которая не доступна без аунтефикации -  добавь её в routes.js privateRoutes
							<Route
								path={route.path}
								element={route.element}
								exact={route.exact}
								key={route.path}
							/>
						))}
					</>
				) : (
					<>
						{publicRoutes.map(route => ( // Чтобы добавить новую страницу, которая доступна без аунтефикации -  добавь её в routes.js publicRoutes
							<Route
								path={route.path}
								element={route.element}
								exact={route.exact}
								key={route.path}
							/>
						))}
					</>
				)}
			</Routes>
		</AppRouterContext.Provider>

	);
	// /////////////////////////////////////
}

export default AppRouter;