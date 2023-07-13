// Импорты
import React from 'react';
import style from './ControlPanel.module.css';
import Block from '../../../components/UI/Block/Block';
import PlayerPanel from './PlayerPanel/PlayerPanel';
import TimeVotePanel from './TimeVotePanel/TimeVotePanel';
/////////////////////////////////////////////////////

const ControlPanel = () => {

	// Отрисовка компонентов
	return (
		<div className={style.controlPanel}>
			<Block // Компонент для стилизации повернутого блока, в styles нужно указать доп стили
				className={style.timeVoteBlock}
			>
				<TimeVotePanel />
			</Block>
			<Block // Компонент для стилизации повернутого блока, в styles нужно указать доп стили
				className={style.playerPanelBlock}
			>
				<PlayerPanel />
			</Block>
		</div>
	);
	// /////////////////////////////////////
}

export default ControlPanel;