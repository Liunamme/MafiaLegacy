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
		{ login: 'Demo', password: 'Demo', defaultTheme: 'dark5' },
		{ login: 'Liunamme', password: 'termik2015', defaultTheme: 'dark5' },
		{ login: 'Diktatura', password: 'pass1', defaultTheme: 'dark4' },
		{ login: 'SoulMary', password: 'pass2', defaultTheme: 'light1' },
		{ login: 'VEY', password: 'blooda0mee', defaultTheme: 'dark4' },
		{ login: 'Rbz', password: 'pass4', defaultTheme: 'personal2' },
		{ login: 'Commuraptor', password: 'pAss.SwordArtOnline', defaultTheme: 'light1' },
		{ login: 'Ingrand', password: 'pass6', defaultTheme: 'dark5' },
		{ login: 'Lega', password: 'pass7', defaultTheme: 'dark5' },
		{ login: 'Passiflora', password: 'pass8', defaultTheme: 'dark5' },
		{ login: 'Crazy007', password: 'pass9', defaultTheme: 'dark4' },
		{ login: 'Cenny7', password: 'pass10', defaultTheme: 'dark5' },
		{ login: 'DK46111', password: 'pass46111', defaultTheme: 'dark5' },
		{ login: 'yayfeminism', password: 'yayfeminism', defaultTheme: 'dark5' },
		{ login: 'upmazalumpa', password: 'upmazalumpa', defaultTheme: 'dark5' },
		{ login: 'toriavenom', password: 'toriavenom', defaultTheme: 'dark5' },
		{ login: 'viktor', password: 'viktor', defaultTheme: 'dark5' },
		{ login: 'prostf1k', password: 'prostf1k', defaultTheme: 'dark5' },
		{ login: 'Dantes', password: 'Dantes', defaultTheme: 'dark5' },
		{ login: 'Koneko', password: 'Koneko', defaultTheme: 'dark5' },
		{ login: 'ARTNK', password: 'ARTNK', defaultTheme: 'dark5' },
		{ login: 'ssskam', password: 'ssskam', defaultTheme: 'dark5' },
		{ login: 'Wanderreror', password: 'Wanderreror', defaultTheme: 'dark5' },
		{ login: 'Kami', password: 'Kami', defaultTheme: 'dark5' },
		{ login: 'Lerochka', password: 'Lerochka', defaultTheme: 'dark5' },
		{ login: 'banilord', password: 'banilord', defaultTheme: 'dark5' },
		{ login: 'byk', password: 'byk', defaultTheme: 'dark5' },
		{ login: 'jast91n', password: 'jast91n', defaultTheme: 'dark5' },
		{ login: 'aafly', password: 'aafly', defaultTheme: 'dark5' },
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