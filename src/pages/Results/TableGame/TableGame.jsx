import React from 'react';
import style from './TableGame.module.css'
import Block from '../../../components/UI/Block/Block';
import InfoBlock from '../../../components/UI/InfoBlock/InfoBlock';
import Table from '../../../components/Table/Table'

const TableGame = () => {
	const gameParametres = JSON.parse(localStorage.getItem('gameParametres'))
	const date = gameParametres.date

	const tableData = {
		thead: {
			id: { className: 'idPlayer', content: '#' },
			role: { className: 'rolePlayer', content: 'Роль' },
			falls: { className: 'style.fallsPlayer', content: 'Фолы' },
			...(gameParametres.plus30
				? { plus30: { className: 'style.plus30Player', content: '+30' } }
				: {}),
			state: { className: 'style.statePlayer', content: 'Состояние' },
		},
		tbody: gameParametres.players.map((item, index) => ({
			id: {
				content: item.id < 10 ? `0${item.id}` : item.id,
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
			falls: { content: `${item.falls ? item.falls : '0'}` },
			...(gameParametres.plus30
				? { plus30: { content: gameParametres.plus30 ? `${item.plus30 ? '+' : '-'}` : '' } }
				: {}),
			state: {
				content: gameParametres.kicked.some((player) => player.id === item.id)
					? gameParametres.kicked.find((player) => player.id === item.id).cause
					: 'Жив',
			},
		})),
	};

	return (
		<div className={style.tableGame}>
			<Block className={style.tableGameBlock}>
				<div className={`${style.content} content`}>
					<div className='overflowContainer'>
						<InfoBlock>
							<h1>Информация по игрокам:</h1>
							<Table data={tableData} />
						</InfoBlock>
					</div>
					<div className={style.dateInfo}>
						<div>Дата игры:</div>
						<InfoBlock>
							<div>{date}</div>
						</InfoBlock>
					</div>
				</div>
			</Block>
		</div>
	);
}

export default TableGame;