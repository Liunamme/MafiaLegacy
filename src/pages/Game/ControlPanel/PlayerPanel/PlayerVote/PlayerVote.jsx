// Импорты
import React, { useContext } from 'react';
import style from './PlayerVote.module.css';
import { StoreContext } from '../../../../../context/context';
/////////////////////////////////////////////////////

const PlayerVote = ({ item, playerClick }) => {
	const { theme, bot } = useContext(StoreContext); // Получение состояний из глобального хранилища

	// Отрисовка компонентов
	return (
		<div className={style.playerVote}>
			<button
				className={` ${theme} ${item.vote ? `${style.btn} activeBtn ` : `${style.btn} btn`}`}
				disabled={item.kick}
				onClick={() => playerClick(item, 'vote')}
			>
				{bot ? `${item.id} ${item.nickname}` : item.id < 10 ? '0' + item.id : item.id}
			</button>
		</div>
	);
	// /////////////////////////////////////
};

export default PlayerVote;