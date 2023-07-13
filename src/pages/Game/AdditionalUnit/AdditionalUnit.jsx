// Импорты
import React, { useState, useContext } from 'react';
import style from './AdditionalUnit.module.css';
import Block from '../../../components/UI/Block/Block';
import { StoreContext, AppRouterContext } from '../../../context/context';
import Timer from '../../../components/Timer/Timer';
import ModalRoles from '../../../components/Modals/ModalRoles/ModalRoles';
import ModalWinner from '../../../components/Modals/ModalWinner/ModalWinner';
import KickInfo from './InfoBlocks/KickInfo/KickInfo';
import OtherInfo from './InfoBlocks/OtherInfo/OtherInfo';
import RolesInfo from './InfoBlocks/RolesInfo/RolesInfo';
import ThemesBtn from '../../../components/Modals/ModalThemes/ThemesBtn/ThemesBtn';
//////////////////////////////////////////


const AdditionalUnit = () => {
	// Состояния
	const { changePage } = useContext(AppRouterContext); // Получение состояний из AppRouter
	const { gameParametres, setGameParametres, setModalThemes, theme } = useContext(StoreContext); // Получение состояний из глобального хранилища
	const [timer, setTimer] = useState(0); // Состояние времени таймера
	const [isRunning, setIsRunning] = useState(false); // Состояние запущенного таймера
	const [modalRoles, setModalRoles] = useState(false) // Модальное окно с Ролями
	const [modalWinner, setModalWinner] = useState(false) // Модальное окно с Выбором победителя
	//////////////////////////////////////////

	// Функционал

	const endGameClick = () => {
		setModalWinner(true)

	}; // Кнопка завершить игру

	//////////////////////////////////////////

	// Отрисовка компонентов
	return (
		<div className={style.additionalUnit}>

			<ModalWinner
				visible={modalWinner}
				setVisible={setModalWinner}
				gameParametres={gameParametres}
				setGameParametres={setGameParametres}
				endGameClick={endGameClick}
				timer={timer}
				changePage={changePage}
			/> {/* Модалка с Выбором победителя*/}

			<ModalRoles
				visible={modalRoles}
				setVisible={setModalRoles}
				gameParametres={gameParametres}
			/> {/* Модалка с описанием ролей*/}

			<Block className={style.additionalUnitBlock}>
				<div className={` ${style.content} content`}>
					<div className={style.timePanel}>
						Время игры:<Timer type="global" timer={timer} setTimer={setTimer} isRunning={isRunning} setIsRunning={setIsRunning} />
					</div> {/* Таймер игры */}
					<div className={style.infoPanel}>
						<KickInfo gameParametres={gameParametres} /> {/* Блок с информацией о киках */}
						<OtherInfo gameParametres={gameParametres} /> {/* Блок дополнительной информацией */}
						<RolesInfo gameParametres={gameParametres} setModalRoles={setModalRoles} /> {/* Блок с ролями на игре */}
					</div>
					<ThemesBtn /> {/* Кнопка темы открывающая модальное окно с темами */}
				</div>
				<button onClick={endGameClick} className={`${style.endGameBtn} ${theme} optionBtn`}>Завершить игру</button> {/* Кнопка завершение игры и выбора победителя */}
			</Block>
		</div>
	);
	//////////////////////////////////////////
};

export default AdditionalUnit;