// Импорты
import React, { useContext, useState } from 'react';
import style from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { AutorizationContext } from '../../context/context';
/////////////////////////////////////////////////////

const Login = () => {
	// Состояния
	const { dataUsers } = useContext(AutorizationContext); // Получение состояния пароля из глобального хранилища
	const [enteredLogin, setEnteredLogin] = useState(''); // Состояние значения поля для ввода логина
	const [isWrongLogin, setIsWrongLogin] = useState(false); // Состояние неправильно введеного логина
	const [enteredPassword, setEnteredPassword] = useState(''); // Состояние значения поля для ввода пароля
	const [isWrongPassword, setIsWrongPassword] = useState(false); // Состояние неправильно введеного пароля
	const navigate = useNavigate(); // Переадресатор страниц
	// /////////////////////////////////////////////////////////
	// Функционал
	const handleChangeLogin = event => {
		setEnteredLogin(event.target.value);
		setIsWrongLogin(false);
	}; // Отслеживание введеного логина, и фиксирование его состояния. А также сброс надписи 'Неверный логин'
	const handleChangePassword = event => {
		setEnteredPassword(event.target.value);
		setIsWrongPassword(false);
	}; // Отслеживание введеного пароля, и фиксирование его состояния. А также сброс надписи 'Неверный пароль'

	const Autorization = event => {
		event.preventDefault(); // Отмена перезагрузки страницы при отправке формы

		const user = dataUsers.find(
			item => item.login === enteredLogin && item.password === enteredPassword
		); // Поиск пользователя с введенным логином и паролем
		const login = dataUsers.find(
			item => item.login === enteredLogin
		); // Поиск пользователя с введенным логином
		const password = dataUsers.find(
			item => item.password === enteredPassword
		); // Поиск пользователя с введенным паролем

		if (user) {
			// Если логин с паролем верные
			localStorage.setItem('Auth', 'true');
			localStorage.setItem('User', user.login);
			localStorage.setItem('defaultTheme', user.defaultTheme);
			localStorage.setItem('theme', user.defaultTheme);
			navigate('/');
		} else { // Если логин верный, а пароль нет
			if (login) {
				setEnteredLogin('');
				setIsWrongPassword(true);
				setEnteredPassword('');
			}
			else { // Если логин и пароль неверные
				setIsWrongLogin(true);
				setIsWrongPassword(true);
				setEnteredLogin('');
				setEnteredPassword('');
			} // Вдальнейшем заменить это просто на кастомный alert 'Неверный логин или пароль'
		}
	}; // Функция аунтефикации
	///////////////////////////////////////

	// Отрисовка компонентов
	return (
		<div className={style.Login}>
			<div className={style.password}>
				<form onSubmit={Autorization}>
					<input
						type="text"
						placeholder={isWrongLogin ? 'Неверный логин' : 'Введите Логин'}
						className={style.inputPass}
						value={enteredLogin}
						onChange={handleChangeLogin}
						autoComplete="new-password"
					/>
					<input
						type="password"
						placeholder={isWrongPassword ? 'Неверный пароль' : 'Введите пароль'}
						className={style.inputPass}
						value={enteredPassword}
						onChange={handleChangePassword}
						autoComplete="new-password"
					/>
					<button className={style.btn}>Войти</button>
				</form>
			</div>
		</div>
	);
	// /////////////////////////////////////
}

export default Login;