// Импорты
import React, { useContext } from 'react';
import style from './PlayerFalls.module.css';
import { StoreContext } from '../../../../../context/context';
/////////////////////////////////////////////////////

const PlayerFalls = ({ item, playerClick, gameParametres }) => {
	const { theme } = useContext(StoreContext); // Получение состояний из глобального хранилища
	// Отрисовка компонентов
	return (
		<div className={style.playerFalls}>
			{Array.from({ length: gameParametres.fallsMax }, (_, i) => i + 1).map((num) => (
				<button
					key={num}
					className={`${style.btn} ${theme} ${item.falls >= num ? `activeBtn` : 'btn'}`}
					disabled={item.kick}
					onClick={() => playerClick(item, 'falls', num)}
				>
					{num}
				</button>
			))}
		</div>
	);
	// /////////////////////////////////////
};

export default PlayerFalls;