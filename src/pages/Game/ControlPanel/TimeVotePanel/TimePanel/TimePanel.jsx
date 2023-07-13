import React, { useState, useEffect } from 'react';
import style from './TimePanel.module.css';
import Timer from '../../../../../components/Timer/Timer';
import sound from '../../../../../media/sound/timerSignal.mp3'

const TimePanel = () => {
	const [timer, setTimer] = useState(0);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		if ([25, 55, 85].includes(timer) && isRunning === true) {
			const audioPlayer = new Audio(sound);
			audioPlayer.volume = 1;
			audioPlayer.play();

		}
	}, [timer]); // звук уведомления за 5 секунд до 00:30, 01:00, 01:30

	return (
		<div className={style.timePanel}>
			<Timer
				type="local"
				timer={timer}
				setTimer={setTimer}
				isRunning={isRunning}
				setIsRunning={setIsRunning}
			/>
		</div>
	);
};

export default TimePanel;