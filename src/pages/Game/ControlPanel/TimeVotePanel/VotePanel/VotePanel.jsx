// Импорты
import React, { useContext } from 'react';
import style from './VotePanel.module.css';
import { StoreContext } from '../../../../../context/context';
import { motion, AnimatePresence } from 'framer-motion';
import InfoBlock from '../../../../../components/UI/InfoBlock/InfoBlock';
/////////////////////////////////////////////////////

const VotePanel = () => {
	// Состояния
	const { gameParametres, setGameParametres, theme } = useContext(StoreContext); // Получение состояний из глобального хранилища
	// /////////////////////////////////////////////////////////

	// Функционал

	const voteClear = () => {
		setGameParametres(prevRoles => {
			const updatedParametres = {
				...prevRoles,
				voted: [], // Очищаем voted до пустого массива
				players: prevRoles.players.map(player => ({
					...player,
					vote: false // Устанавливаем vote в false для каждого игрока
				}))
			};

			localStorage.setItem('gameParametres', JSON.stringify(updatedParametres));

			return updatedParametres;
		});
	};

	///////////////////////////////////////
	// Отрисовка компонентов
	return (
		<div className={style.votePanel}>
			<div className={style.panel}>
				<InfoBlock>
					<h1>Выставлены</h1>
					<div className={style.voted}>
						<AnimatePresence>
							{gameParametres.voted &&
								gameParametres.voted.map(item => (
									<motion.div
										key={item.id}
										initial={{ opacity: 0, y: '100%' }}
										animate={{ opacity: 1, y: '0%' }}
										exit={{ opacity: 0, y: '100%' }}
										transition={{ duration: 0.5 }}
										className={`${style.circle} ${theme} voteCircle`}
									>
										{`${item.id < 10 ? '0' + item.id : item.id}`}
									</motion.div>
								))}
						</AnimatePresence>
					</div>
					<button className='absoluteBtn' onClick={voteClear}>Очистить</button>
				</InfoBlock>
			</div>
		</div>
	);
	// /////////////////////////////////////
}

export default VotePanel;