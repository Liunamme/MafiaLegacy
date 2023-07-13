// Импорты
import React from 'react';
import style from './CustomLogin.module.css';
import Login from './Login';
/////////////////////////////////////////////////////

const CustomLogin = () => {
	// Отрисовка компонентов
	return (
		<div className={style.login}>
			<video src="https://i.imgur.com/50L3hwC.mp4" className={style.video} autoPlay muted loop></video> {/* Видеофон */}
			<div className={style.glass}></div> {/* Затемнение заднего фона */}
			<h1 className={style.h1}>Mafia's Legacy</h1> {/* Заголовок с названием игры */}
			<h2 className={style.h2}>Developed by Liunamme</h2> {/* Заголовок с автором приложения */}
			<h3 className={style.h3}>Нужен доступ к приложению? Пиши в DISCORD: <a href="https://discordapp.com/users/312291477864841216/" target='_blank'>@liunamme</a></h3> {/* Заголовок с информацией по доступу к приложению */}
			<Login /> {/* Компонент авторизации (поле пароль и кнопка войти) */}
		</div>
	);
	// /////////////////////////////////////
}

export default CustomLogin;