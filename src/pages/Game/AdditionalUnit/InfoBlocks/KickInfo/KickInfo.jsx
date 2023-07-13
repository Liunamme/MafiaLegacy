// Импорты
import React from 'react';
import style from './KickInfo.module.css';
import InfoBlock from '../../../../../components/UI/InfoBlock/InfoBlock';
//////////////////////////////////////////


const KickInfo = ({ gameParametres }) => {
	// Состояния
	//////////////////////////////////////////

	// Отрисовка компонентов
	return (
		<div>
			<InfoBlock>
				<div className={style.kickInfo}>
					<h1>Подьем со стола за</h1>
					<span>● Метаинфу</span>
					<span>● Оскорбление ведущего/игроков</span>
					<span>● Спор с ведущим</span>
					{!gameParametres.fallsMax ? <span>● Выкрик вне своё время</span> : ''}
					{gameParametres.badWords && !gameParametres.fallsMax ? <span>● Мат</span> : ''}
					{gameParametres.fallsMax && <span>● {gameParametres.fallsMax} фолл</span>}
				</div>
			</InfoBlock>
		</div>
	);
	//////////////////////////////////////////
};

export default KickInfo;