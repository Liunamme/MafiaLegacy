// Импорты
import React from 'react';
import style from './WinnerInfo.module.css';
import InfoBlock from '../../../../components/UI/InfoBlock/InfoBlock';

//////////////////////////////////////////


const WinnerInfo = ({ winner }) => {
	// Состояния
	//////////////////////////////////////////

	// Отрисовка компонентов
	return (
		<div>
			<InfoBlock>
				<div className={style.winnerPanel}>
					<h1>Победитель</h1>
					<div className={style.winner}><span className='roleSpan'>{winner[0]}<span className='smile'>{winner[1]}</span></span></div>
				</div>
			</InfoBlock>
		</div>

	);
	//////////////////////////////////////////
};

export default WinnerInfo;