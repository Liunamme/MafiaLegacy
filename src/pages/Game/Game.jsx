// Импорты
import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './Game.module.css'
import { StoreContext } from '../../context/context';
import ControlPanel from './ControlPanel/ControlPanel';
import AdditionalUnit from './AdditionalUnit/AdditionalUnit';
import ModalThemes from '../../components/Modals/ModalThemes/ModalThemes';
import VaultBoy from '../../media/img/ico/vaultBoy.png';
import sound from '../../media/sound/falloutJazz.mp3'
/////////////////////////////////////////////////////

const Game = () => {
	// Состояния
	const { setGameParametres, startGame, modalThemes, setModalThemes, theme, setTheme } = useContext(StoreContext); // Получение состояний из глобального хранилища
	const [music, setMusic] = useState(false)
	const [musicPosition, setMusicPosition] = useState(0); // Добавляем состояние для хранения позиции воспроизведения музыки
	// /////////////////////////////////////////////////////////

	const audioPlayerRef = useRef(null);

	// Функционал
	useEffect(() => {
		if (startGame) {
			setGameParametres(JSON.parse(localStorage.getItem('gameParametres')))
		}
	}, []) // Установка gameParametres (параметров игры) на текущую игру

	const handleMusicToggle = () => {
		setMusic(!music);
	};

	useEffect(() => {
		const audioPlayer = audioPlayerRef.current;

		audioPlayer.volume = 0.05;

		if (music) {
			audioPlayer.currentTime = musicPosition;
			audioPlayer.play();
		} else {
			audioPlayer.pause();
			setMusicPosition(audioPlayer.currentTime);
		}
	}, [music]);
	// /////////////////////////////////////////////////////////

	// Отрисовка компонентов
	return (
		<div className={`${style.game} page`}>
			<span className='logoTheme'>
				{(theme === 'personal1' || theme === 'personal2') ? (
					<>
						<span>Pip-Boy 3000</span> <img src={VaultBoy} onClick={handleMusicToggle} />
					</>
				) : ''}
			</span>
			<ModalThemes visible={modalThemes} setVisible={setModalThemes} theme={theme} setTheme={setTheme} /> {/* Модалка с выбором темы */}
			<ControlPanel /> {/* Панель управления */}
			<AdditionalUnit /> {/* Дополнительный блок */}
			<audio ref={audioPlayerRef} src={sound} />
		</div>
	);
	// /////////////////////////////////////////////////////////
}

export default Game;