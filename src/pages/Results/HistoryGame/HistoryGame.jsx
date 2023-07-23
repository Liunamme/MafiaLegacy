import React, { useContext } from 'react';
import style from './HistoryGame.module.css'
import Block from '../../../components/UI/Block/Block';
import Time from './Time/Time';
import InfoBlock from '../../../components/UI/InfoBlock/InfoBlock';
import Table from '../../../components/Table/Table';
import { StoreContext } from '../../../context/context';

const HistoryGame = () => {
	const gameParametres = JSON.parse(localStorage.getItem('gameParametres'))
	const time = gameParametres.time
	const { bot } = useContext(StoreContext); // Получение состояний из глобального хранилища

	const tableData = {
		thead: {
			id: { className: 'idPlayer', content: bot ? 'Игрок' : '#' },
			role: { className: 'rolePlayer', content: 'Роль' },
			time: { className: 'timePlayer', content: 'Время' },
			cause: { className: 'style.causePlayer', content: 'Причина' },
		},
		tbody: gameParametres.kicked.map((item, index) => ({
			id: {
				content: bot ? `${item.id} ${item.nickname}` : item.id < 10 ? '0' + item.id : item.id,
			},
			role: {
				content: (
					<span key={index} className="roleSpan">
						{item.role.split(' ').map((part, index) => (
							index === 1 ? (
								<span key={index} className="smile">{part}</span>
							) : (
								part
							)
						))}
					</span>
				),
			},
			time: {
				content: <Time time={item.time} />
			},
			cause: {
				content: item.cause
			},
		})),
	};

	return (
		<div className={style.historyGame}>
			<Block className={style.historyGameBlock}>
				<div className={`${style.content} content`}>
					<div className='overflowContainer'>
						<InfoBlock>
							<h1>История игры:</h1>
							<Table data={tableData} />
						</InfoBlock>
					</div>

					<div className={style.timeInfo}>
						<div>Время игры:</div>
						<InfoBlock>
							<Time time={time} />
						</InfoBlock>
					</div>
				</div>
			</Block>
		</div>
	);
}

export default HistoryGame;