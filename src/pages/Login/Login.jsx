// Импорты
import React, { useContext, useState } from 'react';
import style from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/context';
/////////////////////////////////////////////////////

const Login = () => {
	// Состояния
	const { password, setPassword } = useContext(StoreContext); // Получение состояния пароля из глобального хранилища
	const [enteredPassword, setEnteredPassword] = useState(''); // Состояние введенного пароля
	const [isWrongPassword, setIsWrongPassword] = useState(false); // Состояние неправильно введеного пароля
	const navigate = useNavigate(); // Переадресатор страниц
	// /////////////////////////////////////////////////////////

	// Функционал
	const handleChange = event => {
		setEnteredPassword(event.target.value);
		setIsWrongPassword(false);
	}; // Отслеживание введеного пароля, и фиксирование его состояния. А также сброс надписи 'Неверный пароль'

	const login = event => {
		event.preventDefault(); // Отмена перезагрузки страницы при отправке формы
		if (enteredPassword === password) {
			setPassword(password);
			localStorage.setItem('password', password);
			localStorage.setItem('pageNow', '/start');
			navigate('/');
		} else {
			setIsWrongPassword(true);
			setEnteredPassword('');
		}
	}; // Функция аунтефикации
	///////////////////////////////////////

	// Отрисовка компонентов
	return (
		<div className={style.Login}>
			<div className={style.password}>
				<form onSubmit={login}>
					<input
						type="password"
						placeholder={isWrongPassword ? 'Неверный пароль' : 'Введите пароль'}
						className={style.inputPass}
						value={enteredPassword}
						onChange={handleChange}
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