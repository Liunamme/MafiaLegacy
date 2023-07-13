// Импорты
import React, { useContext } from 'react';
import style from './Start.module.css'
import { StoreContext } from '../../context/context';
import RandomBlock from './Random/RandomBlock';
import Parametres from './Parametres/Parametres';
import ModalThemes from '../../components/Modals/ModalThemes/ModalThemes';
/////////////////////////////////////////////////////

const Start = () => {
	const { modalThemes, setModalThemes, theme, setTheme } = useContext(StoreContext); // Получение состояний из глобального хранилища
	// Отрисовка компонентов
	return (
		<div className={`${style.start} page`}>
			<ModalThemes visible={modalThemes} setVisible={setModalThemes} theme={theme} setTheme={setTheme} /> {/* Модалка с выбором темы */}
			<RandomBlock /> {/* Рандомайзер */}
			<Parametres /> {/* Настройка параметров игры */}
		</div >
	);
	// /////////////////////////////////////
}

export default Start;