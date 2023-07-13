// Импорты
import React, { useContext } from 'react';
import style from './PlayerKick.module.css';
import { StoreContext } from '../../../../../context/context';
/////////////////////////////////////////////////////

const PlayerKick = ({ item, playerKick }) => {
	const { theme } = useContext(StoreContext); // Получение состояний из глобального хранилища

	// Отрисовка компонентов
	return (
		<div className={style.playerKick}>
			<button
				className={` ${theme} ${item.kick ? `${style.btn} activeBtn` : `${style.btn} btn`}`}
				onClick={() => playerKick(item)}
			>
				x
			</button>
		</div>
	);
	// /////////////////////////////////////
};

export default PlayerKick;