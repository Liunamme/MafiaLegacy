// Импорты
import React, { useState, useContext } from 'react';
import style from './Switch3.module.css';
import { StoreContext } from '../../../../context/context';
import InfoBlock from '../../InfoBlock/InfoBlock';
/////////////////////////////////////////////////////

const Switch3 = ({ value, state, changeState }) => {
	// Состояния
	const [switch3, setSwitch3] = useState(state)
	const { theme } = useContext(StoreContext); // Получение состояний из глобального хранилища
	// /////////////////////////////////////////////////////////
	const stateArr = {
		allTrue: true,
		OFF: !switch3 ? true : false,
	}
	// Функционал
	const handleClick = (newValue) => {
		setSwitch3(newValue);
		changeState(newValue);
	}; // Переключение между положениеями 1 0 2
	///////////////////////////////////////
	// Отрисовка компонентов
	return (
		<div
			className={`${style.switch3} ${theme} ${switch3 === value[0] ? 'switchON1' : switch3 === value[2] ? 'switchON2' : 'switchOFF1'}`} // Оболочка переключателя
		>
			<InfoBlock classes={stateArr}>
				<div className={`${style.circle} ${theme} switchCircle`}>
					{switch3}
				</div>
			</InfoBlock>
			<div style={{ position: 'absolute', display: 'flex', width: '100%', height: '100%' }}>
				<div className={style.switch3Val} onClick={() => handleClick(value[0])}></div> {/* Невидимый div для переключения на включенное состояние слева */}
				<div className={style.switch3Val} onClick={() => handleClick(value[1])}></div> {/* Невидимый div для переключения на выключенное состояние посередине */}
				<div className={style.switch3Val} onClick={() => handleClick(value[2])}></div> {/* Невидимый div для переключения на включенное состояние справа */}
			</div>

		</div>
	);
	// /////////////////////////////////////
}

export default Switch3;