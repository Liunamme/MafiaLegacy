// Импорты
import React, { useContext, useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router/routes';
import { StoreContext, AppRouterContext } from '../context/context';
/////////////////////////////////////////////////////

const AppRouter = () => {
	// Состояния
	const { password, setPageNow } = useContext(StoreContext); // Получение состояний из глобального хранилища
	const [isAuth, setIsAuth] = useState(null); // Состояние для того, чтобы переадресовывать на /login, если оно не совпадает с password
	/////////////////////////////////////////////////////

	// Функционал
	const navigate = useNavigate();
	useEffect(() => {
		const auth = localStorage.getItem('password');
		const storedPageNow = localStorage.getItem('pageNow');
		if (auth === password) {
			setIsAuth(password);
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
	}, [navigate, password]); // Переадресовывает на нужную страницу, и на другие попасть невозможно

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
				{isAuth === password ? (
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