// Импорты
import React, { useState, useEffect, useContext } from 'react';
import Switch2 from '../../../../components/UI/CustomSwitch/Switch2/Switch2';
import { StoreContext } from '../../../../context/context';
import Switch2ON from '../../../../components/UI/CustomSwitch/Switch2ON/Switch2ON';
/////////////////////////////////////////////////////

const SwitchParametres = ({ setValuePlayers }) => {
	// Состояния
	const { setGameParametres, bot, setBot } = useContext(StoreContext); // Получение состояний из глобального хранилища
	const [fallsMax, setFallsMax] = useState(parseInt(localStorage.getItem('fallsMax')) || 4); // Состояние указанного максимального кол-ва фоллов
	const [plus30, setPlus30] = useState(JSON.parse(localStorage.getItem('plus30')) || false); // Состояние будет ли использоваться plus30
	const [badWords, setBadWords] = useState(JSON.parse(localStorage.getItem('badWords')) || false); // Состояние запрещена ли ненормативная лексика
	// /////////////////////////////////////////////////////////
	// Функционал

	// Управление fallsMax plus30 badWords
	useEffect(() => {
		// Обновление состояния gameParametres fallsMax plus30 badWords
		setGameParametres((prevParams) => ({
			...prevParams,
			bot: bot,
			fallsMax: fallsMax,
			plus30: plus30,
			badWords: badWords,
		}));
		// сохранение в localStorage
		localStorage.setItem('bot', bot);
		localStorage.setItem('fallsMax', fallsMax);
		localStorage.setItem('plus30', plus30);
		localStorage.setItem('badWords', badWords);
		// ///////////////////////////////////////
	}, [bot, fallsMax, plus30, badWords]); // Управление состоянием fallsMax plus30 badWords (всё что на переключателях Switch)

	useEffect(() => {
		setGameParametres((prevParams) => ({
			...prevParams,
			valuePlayers: null,
		}));
		// ///////////////////////////////////////
	}, [bot]);
	/////////////////////////
	//////////////////////////////////

	// Отрисовка компонентов
	return (
		<>
			<div className='parametr'>
				<div>ИГРА С БОТОМ:</div>
				<Switch2 state={bot} changeState={setBot} />
			</div> {/* Кол-во фолов */}
			<div className='parametr'>
				<div>КОЛ-ВО ФОЛОВ:</div>
				<Switch2ON value={[4, 5]} state={fallsMax} changeState={setFallsMax} />
			</div> {/* Кол-во фолов */}
			<div className='parametr'>
				<div>+30 СЕКУНД:</div>
				<Switch2 state={plus30} changeState={setPlus30} />
			</div> {/* +30 секунд */}
			<div className='parametr'>
				<div>ЗАПРЕТ НА МАТ:</div>
				<Switch2 state={badWords} changeState={setBadWords} />
			</div> {/* Фолл за мат */}
		</> // Сюда можно добавлять новые параметры
	);
	// /////////////////////////////////////
}

export default SwitchParametres;