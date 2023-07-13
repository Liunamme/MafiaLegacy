// Импорты
import React, { useState, useEffect, useContext } from 'react';
import style from './Switch2.module.css';
import { StoreContext } from '../../../../context/context';
import InfoBlock from '../../InfoBlock/InfoBlock';
/////////////////////////////////////////////////////

const Switch2 = ({ state, changeState }) => {

	// Состояния
	const [switch2, setSwitch2] = useState(state); // Состояние переключателя (true/false)
	const { theme } = useContext(StoreContext); // Получение состояний из глобального хранилища
	// /////////////////////////////////////////////////////////

	// Функционал
	useEffect(() => {
		changeState(switch2);
	}, [switch2, changeState]); // Изменение состояния переданного параметра на состояние данного переключателя

	const handleClick = () => {
		setSwitch2(prevState => !prevState);
	}; // изменение состояния на противоположное при клике переключатель 
	///////////////////////////////////////
	const stateArr = {
		allTrue: true,
		OFF: !switch2,
	}
	// Отрисовка компонентов
	return (
		<div
			className={`${style.switch2} ${theme} switch2 ${switch2 ? 'switchON' : 'switchOFF'}`} // Оболочка переключателя
			onClick={handleClick}
		>
			<InfoBlock classes={stateArr}>
				<div
					className={`${style.circle} ${theme} switchCircle`} // Кружок переключателя
				></div>
			</InfoBlock>
		</div>

	);
	// /////////////////////////////////////
};

export default Switch2;