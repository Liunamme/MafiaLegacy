import React, { useContext, useState } from 'react';
import style from './Main.module.css'
import { StoreContext, AppRouterContext } from '../../../context/context';
import Block from '../../../components/UI/Block/Block';
import Timer from '../../../components/Timer/Timer'
import KickInfo from '../../Game/AdditionalUnit/InfoBlocks/KickInfo/KickInfo';
import OtherInfo from '../../Game/AdditionalUnit/InfoBlocks/OtherInfo/OtherInfo';
import WinnerInfo from './WinnerInfo/WinnerInfo';
import ThemesBtn from '../../../components/Modals/ModalThemes/ThemesBtn/ThemesBtn';


const Main = () => {
	const { setGameParametres, setModalThemes, modalThemes } = useContext(StoreContext); // Получение состояний из глобального хранилища
	const { changePage } = useContext(AppRouterContext); // Получение состояний из AppRouter
	const [timer, setTimer] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const newGameClick = (link) => {
		setGameParametres((JSON.parse(localStorage.getItem('gameParametresDefault'))))
		localStorage.removeItem('gameParametres');
		localStorage.removeItem('timer'); // Удаление локального таймера из localStorage
		changePage(link)
	}
	const gameParametres = JSON.parse(localStorage.getItem('gameParametres'))
	const winner = gameParametres.winner

	return (
		<div className={style.main}>
			<Block className={style.mainBlock}>
				<div className={`${style.content} content`}>
					<div className={style.timePanel}>
						<Timer
							type="local"
							timer={timer}
							setTimer={setTimer}
							isRunning={isRunning}
							setIsRunning={setIsRunning}
							styleCustom={style}
						/>
					</div> {/* Таймер */}
					<div className={style.infoPanel}>
						<WinnerInfo winner={winner} /> {/* Блок с информацией о победителе*/}
						<h1>Правила на игру</h1>
						<KickInfo gameParametres={gameParametres} /> {/* Блок с информацией о киках */}
						<OtherInfo gameParametres={gameParametres} /> {/* Блок дополнительной информацией */}
					</div>
					<ThemesBtn /> {/* Кнопка темы открывающая модальное окно с темами */}
				</div>
				<button className={style.startGameBtn} onClick={() => newGameClick('/start')}>Новая игра</button>
			</Block>
		</div>
	);
}

export default Main;