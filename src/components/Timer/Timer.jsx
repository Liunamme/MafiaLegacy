// ИМПОРТЫ
import React, { useEffect, useContext } from 'react';
import style from './Timer.module.css';
import { StoreContext } from '../../context/context';
import InfoBlock from '../../components/UI/InfoBlock/InfoBlock'
/////////////////////////////////////////

const Timer = ({ timer, setTimer, isRunning, setIsRunning, type }) => {
	const { theme } = useContext(StoreContext); // Получение состояний из глобального хранилища
	// ФУНКЦИОНАЛ

	useEffect(() => {
		const storedTime = (type === 'global' && localStorage.getItem('timeGame')) || (type === 'local' && localStorage.getItem('timer'));

		if (storedTime) {
			setTimer(parseInt(storedTime, 10));
		}
	}, [type]);


	useEffect(() => {
		localStorage.setItem((type === 'global' && 'timeGame') || (type === 'local' && 'timer'), timer.toString());
	}, [timer, type]);


	useEffect(() => {
		let intervalId;
		if ((type === 'global' && JSON.parse(localStorage.getItem('startGame'))) || (type === 'local' && isRunning)) {
			intervalId = setInterval(() => {
				setTimer((prevTimer) => prevTimer + 1);
			}, 1000);
		}

		return () => {
			clearInterval(intervalId);
		};
	}, [timer, isRunning, type]);

	// КНОПКИ

	// PLAY/PAUSE
	const toggleTimer = () => {
		setIsRunning((prevIsRunning) => !prevIsRunning);
	};
	////////////////

	// RESET
	const resetTimer = () => {
		setTimer(0);
		setIsRunning(false);
		localStorage.removeItem('timer');
	};
	////////////////

	/////////////////////////////////

	// ФОРМАТ ОТОБРАЖЕНИЯ ВРЕМЕНИ
	const formatTime = (time) => {
		return time.toString().padStart(2, '0');
	};

	const hours = Math.floor(timer / 3600);
	const minutes = Math.floor(timer / 60) % 60;
	const seconds = timer % 60;
	////////////////////////

	/////////////////////////////////////////

	// ОТРИСОВКА КОМПОНЕНТОВ
	return (
		<div>
			<div>
				<InfoBlock cN={type === 'local' && style.InfoBlockL || type === 'global' && style.InfoBlockG}>
					<div className={(type === 'global' && style.timeG) || (type === 'local' && style.timeL)}>

						{type === 'global' ? <span>{formatTime(hours)}</span> : null}
						{type === 'global' ? <span className={style.colon}>:</span> : null}
						<span>{formatTime(minutes)}</span>
						<span className={style.colon}>:</span>
						<span>{formatTime(seconds)}</span>
					</div>
				</InfoBlock>
			</div>

			{type === 'local' && (
				<div className={style.buttons}>
					<div className={isRunning ? `${style.pause} ${style.btn} ${theme} pause` : `${style.play} ${style.btn} ${theme} play`} onClick={toggleTimer}></div>
					<div className={`${style.reset} ${style.btn} ${theme} reset`} onClick={resetTimer}></div>
				</div>
			)}
		</div>
	);
	/////////////////////////////////////////
};

export default Timer;