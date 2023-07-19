// Импорты
import React, { useState } from 'react';
import { AutorizationContext } from '../context/context';
import AppRouter from './AppRouter';
import { HashRouter as Router } from 'react-router-dom';

/////////////////////////////////////////////////////

const Autorization = () => {
	// Состояния
	const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem('Auth')) || false); // Состояние авторизации
	const dataUsers = [
		{ login: 'Demo', password: 'Demo', defaultTheme: 'dark1' },
		{ login: 'Liunamme', password: 'termik2015', defaultTheme: 'personal2' },
		{ login: 'Diktatura', password: 'pass1', defaultTheme: 'dark4' },
		{ login: 'SoulMary', password: 'pass2', defaultTheme: 'light1' },
		{ login: 'VEY', password: 'blooda0mee', defaultTheme: 'dark4' },
		{ login: 'Rbz', password: 'pass4', defaultTheme: 'personal2' },
		{ login: 'Commuraptor', password: 'pAss.SwordArtOnline', defaultTheme: 'light1' },
		{ login: 'Ingrand', password: 'pass6', defaultTheme: 'dark5' },
		{ login: 'Lega', password: 'pass7', defaultTheme: 'dark5' },
		{ login: 'Passiflora', password: 'pass8', defaultTheme: 'dark5' },
		{ login: 'Crazy007', password: 'pass9', defaultTheme: 'dark4' },
	] // База пользователей
	// /////////////////////
	// Отрисовка компонентов
	return (
		<AutorizationContext.Provider // Передача состояний авторизации по всем компонентам
			value={{
				isAuth, setIsAuth,
				dataUsers,
			}} // в value нужно добавлять состояния, которые ме хотим передать другим компонентам (для чистаемости: 1 строчка - 1 состояние и функция для управления им)
		>
			<Router>
				<AppRouter />
			</Router>
		</AutorizationContext.Provider>
	);
	// /////////////////////
}

export default Autorization;