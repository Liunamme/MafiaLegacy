// Импорты
import React, { useState, useContext } from 'react';
import style from './Switch2ON.module.css';
import { StoreContext } from '../../../../context/context';
import InfoBlock from '../../InfoBlock/InfoBlock';
/////////////////////////////////////////////////////

const Switch2ON = ({ value, state, changeState }) => {
	// Состояния
	const [Switch2ON, setSwitch2ON] = useState(state)
	const { theme } = useContext(StoreContext); // Получение состояний из глобального хранилища
	// /////////////////////////////////////////////////////////
	const stateArr = {
		allTrue: true,
	}
	// Функционал
	const handleClick = () => {
		// Переключаем между value[0] и value[1]
		const newValue = Switch2ON === value[0] ? value[1] : value[0];
		setSwitch2ON(newValue);
		changeState(newValue);
	};
	///////////////////////////////////////
	// Отрисовка компонентов
	return (
		<div
			className={`${style.switch2ON} ${theme} ${Switch2ON === value[0] ? 'switchON1' : Switch2ON === value[1] ? 'switchON2' : ''
				}`}
			onClick={handleClick}
		>
			<InfoBlock classes={stateArr}>
				<div className={`${style.circle} ${theme} switchCircle`}>
					{Switch2ON}
				</div>
			</InfoBlock>
		</div>
	);
	// /////////////////////////////////////
}

export default Switch2ON;