// Импорты
import React, { useContext } from 'react';
import style from './Start.module.css'
import { StoreContext } from '../../context/context';
import RandomBlock from './Random/RandomBlock';
import Parametres from './Parametres/Parametres';
import ModalThemes from '../../components/Modals/ModalThemes/ModalThemes';
import User from '../../components/User';
import Bot from './Bot/Bot';
/////////////////////////////////////////////////////

const Start = () => {
	const { gameParametres, modalThemes, setModalThemes, theme, setTheme } = useContext(StoreContext); // Получение состояний из глобального хранилища
	// Отрисовка компонентов
	return (
		<div className={`${style.start} page`}>
			<User />
			<ModalThemes visible={modalThemes} setVisible={setModalThemes} theme={theme} setTheme={setTheme} /> {/* Модалка с выбором темы */}
			{!gameParametres.bot ? <RandomBlock /> : <Bot />} {/* Рандомайзер / Бот */}
			<Parametres /> {/* Настройка параметров игры */}
		</div >
	);
	// /////////////////////////////////////
}

export default Start;