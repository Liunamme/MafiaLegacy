// Импорты
import React, { useState, useEffect, useContext } from 'react';
import style from './Random.module.css';
import Random from './Random';
import Block from '../../../components/UI/Block/Block';
import { StoreContext } from '../../../context/context';
/////////////////////////////////////////////////////

const RandomBlock = () => {
	// Состояния
	const { gameParametres, setGameParametres, isGameRolesChanged, defaultRoles, player, theme } = useContext(StoreContext); // Получение состояний из глобального хранилища
	const [randomSwitch, setRandomSwitch] = useState(true); // Переключение между рандомом ролей и слотов
	const [roleData, setRoleData] = useState(JSON.parse(localStorage.getItem('roleData')) || []); // Состояние ролей
	const [slotData, setSlotData] = useState(JSON.parse(localStorage.getItem('slotData')) || []) // Состояние слотов
	// /////////////////////////////////////////////////////////

	// Функционал
	const getInitialSlotData = (players) => {
		const initialSlots = [];
		for (let i = 1; i <= players; i++) {
			initialSlots.push({ id: i, slot: i });
		}
		return initialSlots;
	}; // Создание дефолтного массива слотов под кол-во игроков

	const handleRoleClick = (newData) => {
		setRoleData(newData);
		const newPlayers = newData.map((role) => ({
			...player,
			id: role.id,
			role: role.role,
		})); // создание массива игроков на игру

		setGameParametres((prevParametres) => ({
			...prevParametres,
			players: newPlayers,
		})); // передача игроков и ролей в gameParametres

		localStorage.setItem('roleData', JSON.stringify(newData)); // сохранение актуальных(будь они зарандомленные или нет) ролей в localStorage
	}; // Добавление актуальных(будь они зарандомленные или нет) ролей и игроков (с уже указанными ролями в них) в параметры игры (gameParametres),

	const handleSlotClick = (newData) => {
		setSlotData(newData);
		localStorage.setItem('slotData', JSON.stringify(newData));
	}; // Добавление актуальных(будь они зарандомленные или нет) слотов в состояние slotData

	useEffect(() => {
		if (isGameRolesChanged) {
			setRoleData(defaultRoles); // установка дефолтных ролей
			setSlotData(getInitialSlotData(gameParametres.valuePlayers)); // установка дефолтных слотов
			localStorage.setItem('roleData', JSON.stringify(defaultRoles)); // сохранение дефолтных ролей в localStorage
		}
	}, [defaultRoles, isGameRolesChanged]); // Добавление дефолтных ролей/слотов в состояния roleData/slotData только при изменении кол-ва игроков (защита от добавление дефолтных состояний при загрузке страницы (они перебивают те что сохранены в localStorage))

	useEffect(() => {
		localStorage.setItem('roleData', JSON.stringify(roleData));
		localStorage.setItem('slotData', JSON.stringify(slotData));
	}, [roleData, slotData]); // Добавление ролей в параметры игры (gameParametres.roles). И запись состояний ролей и слотов в localStorage

	useEffect(() => {
		const newPlayers = roleData.map((role) => ({
			...player,
			id: role.id,
			role: role.role,
		}));

		setGameParametres((prevParametres) => ({
			...prevParametres,
			players: newPlayers,
		}));
	}, [roleData]); // Добавление игроков в параметры игры (gameParametres.players).
	///////////////////////////////////////

	// Отрисовка компонентов
	return (
		<div className={style.random}>
			<Block // Компонент для стилизации повернутого блока, в styles нужно указать доп стили
				className={style.randomBlock}
			>
				<input // Переключатель между рандомами
					type="button"
					value={randomSwitch ? 'Рандом ролей' : 'Рандом слотов'}
					onClick={() => setRandomSwitch((prevState) => !prevState)}
					className={`${style.mainBtn} ${theme} btn`}
				/>
				<div className={style.randomPlayers}> {/* Рандомайзер */}
					{randomSwitch ? (
						<Random data={roleData} handleClick={handleRoleClick} randomSwitch={randomSwitch} type={'role'} text="Роли" /> // Рандомайзер ролей
					) : (
						<Random data={slotData} handleClick={handleSlotClick} randomSwitch={randomSwitch} type={'slot'} text="Слоты" /> // Рандомайзер слотов
					)}
				</div>
			</Block>
		</div>
	);
	// /////////////////////////////////////
};

export default RandomBlock;