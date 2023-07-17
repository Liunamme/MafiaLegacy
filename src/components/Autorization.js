// Импорты
import React, { useState } from 'react';
import { AutorizationContext } from '../context/context';
import AppRouter from './AppRouter';
import { HashRouter as Router } from 'react-router-dom';

/////////////////////////////////////////////////////

const Autorization = () => {
	// Состояния
	const [isAuth, setIsAuth] = useState(false); // Состояние авторизации
	const dataUsers = [
		{ login: 'Liunamme', password: 'termik2015', defauiltTheme: 'personal2' },
		{ login: 'Diktatura', password: 'pass1', defauiltTheme: 'dark4' },
		{ login: 'SoulMary', password: 'pass2', defauiltTheme: 'light1' },
		{ login: 'Vey', password: 'pass3', defauiltTheme: 'dark4' },
		{ login: 'Rbz', password: 'pass4', defauiltTheme: 'personal2' },
		{ login: 'Commuraptor', password: 'pass5', defauiltTheme: 'light1' },
		{ login: 'Ingrand', password: 'pass6', defauiltTheme: 'dark5' },
		{ login: 'Lega', password: 'pass7', defauiltTheme: 'dark5' },
		{ login: 'Passiflora', password: 'pass8', defauiltTheme: 'dark5' },
		{ login: 'Crazy007', password: 'pass9', defauiltTheme: 'dark4' },
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