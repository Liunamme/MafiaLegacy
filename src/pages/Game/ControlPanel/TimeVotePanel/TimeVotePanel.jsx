// Импорты
import React from 'react';
import style from './TimeVotePanel.module.css';
import VotePanel from './VotePanel/VotePanel';
import TimePanel from './TimePanel/TimePanel';
/////////////////////////////////////////////////////

const TimeVotePanel = () => {
	// Отрисовка компонентов
	return (
		<div className={style.timeVotePanel}>
			<TimePanel />
			<VotePanel />
		</div>
	);
	// /////////////////////////////////////
}

export default TimeVotePanel;