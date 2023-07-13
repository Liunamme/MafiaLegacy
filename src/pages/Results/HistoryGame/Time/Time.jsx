// Импорты
import React from 'react';
import style from './Time.module.css';

//////////////////////////////////////////


const Time = ({ time }) => {

	// ФОРМАТ ОТОБРАЖЕНИЯ ВРЕМЕНИ
	const formatTime = (time) => {
		return time.toString().padStart(2, '0');
	};
	////////////////////////


	// Отрисовка компонентов
	return (
		<div className={style.time}>
			<div>{formatTime(Math.floor(time / 3600))}</div>:
			<div>{formatTime(Math.floor(time / 60) % 60)}</div>:
			<div>{formatTime(time % 60)}</div>
		</div>
	);
	//////////////////////////////////////////
};

export default Time;