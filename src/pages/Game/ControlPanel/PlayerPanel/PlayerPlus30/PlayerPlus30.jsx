// Импорты
import React, { useContext } from 'react';
import style from './PlayerPlus30.module.css';
import { StoreContext } from '../../../../../context/context';
/////////////////////////////////////////////////////

const PlayerPlus30 = ({ item, playerClick }) => {
	const { theme } = useContext(StoreContext); // Получение состояний из глобального хранилища

	// Отрисовка компонентов
	return (
		<div className={style.playerPlus30}>
			<button
				className={` ${theme} ${item.plus30 ? `${style.btn} activeBtn` : `${style.btn} btn`}`}
				disabled={item.kick}
				onClick={() => playerClick(item, 'plus30')}
			>
				+30
			</button>
		</div>
	)

	// /////////////////////////////////////
};

export default PlayerPlus30;