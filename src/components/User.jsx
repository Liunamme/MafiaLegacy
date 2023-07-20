import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AutorizationContext, StoreContext } from '../context/context';

const User = () => {
	const navigate = useNavigate(); // Переадресатор страниц
	const { setIsAuth } = useContext(AutorizationContext); // Получение состояния авторизации
	const { setTheme } = useContext(StoreContext); // Получение состояния авторизации
	const handleClick = () => {
		localStorage.removeItem('Auth');
		localStorage.removeItem('User');
		localStorage.removeItem('defaultTheme');
		localStorage.removeItem('theme');
		setIsAuth(false)
		setTheme('')
		navigate('/login');
	} // Очистка данных аккаунта из localStorage и переход на страницу авторизации
	return (
		<span className='user' onClick={handleClick}>{localStorage.getItem(`User`)}</span>
	);
}

export default User;