// Импорты
import React, { useEffect, useContext } from 'react';
import style from './ValuePlayers.module.css';
import { StoreContext } from '../../../../context/context';
import InfoBlock from '../../../../components/UI/InfoBlock/InfoBlock';
/////////////////////////////////////////////////////

const ValuePlayers = ({ valuePlayers, setValuePlayers }) => {
	// Состояния
	const { roles, setRoles, setGameParametres, setIsGameRolesChanged, setDefaultRoles, theme } = useContext(StoreContext); // Получение состояний из глобального хранилища
	// /////////////////////////////////////////////////////////

	// Функционал

	const stateArr = {
		OFF: valuePlayers === '#',
	} // Передача состояния селекта, для стилей дисплея

	// Управление Кол-ва игроков и Ролей
	useEffect(() => {

		setGameParametres(prevParams => ({
			...prevParams,
			valuePlayers: Number(valuePlayers),
		})) // Установка/Обновление кол-ва игроков


		setRoles(prevRoles => ({
			...prevRoles,
			civilian: {
				...prevRoles.civilian,
				value: valuePlayers >= 9 && valuePlayers <= 11
					? 6
					: valuePlayers >= 12 && valuePlayers <= 14
						? 5
						: valuePlayers === 15
							? 4
							: null
			}, // Условия кол-ва игроков для кол-ва роли Мирный
			mafia: {
				...prevRoles.mafia,
				value:
					valuePlayers === 9
						? 1
						: valuePlayers === 10 || valuePlayers === 11
							? 2
							: valuePlayers >= 12 && valuePlayers <= 14
								? 3
								: valuePlayers >= 15
									? 4
									: null
			}, // Условия кол-ва игроков для кол-ва роли Мафия
			don: {
				...prevRoles.don,
				value: valuePlayers >= 9 ? 1 : null
			}, // Условия кол-ва игроков для кол-ва роли Дон
			commissar: {
				...prevRoles.commissar,
				value: valuePlayers >= 9 ? 1 : null
			}, // Условия кол-ва игроков для кол-ва роли Комиссар
			doctor: {
				...prevRoles.doctor,
				value: valuePlayers >= 11 ? 1 : null
			}, // Условия кол-ва игроков для кол-ва роли Доктор
			mistress: {
				...prevRoles.mistress,
				value: valuePlayers >= 12 ? 1 : null
			}, // Условия кол-ва игроков для кол-ва роли Любовница
			maniac: {
				...prevRoles.maniac,
				value: valuePlayers >= 13 ? 1 : null
			}, // Условия кол-ва игроков для кол-ва роли Маньяк
			werewolf: {
				...prevRoles.werewolf,
				value: valuePlayers >= 14 ? 1 : null
			}, // Условия кол-ва игроков для кол-ва роли Оборотень
			sergeant: {
				...prevRoles.sergeant,
				value: valuePlayers >= 15 ? 1 : null
			}, // Условия кол-ва игроков для кол-ва роли Сержант
		})); // Установка/Обновление кол-ва и тип ролей на игру
		localStorage.setItem('valuePlayers', String(valuePlayers)); // Сохранение кол-ва игроков в localStorage
	}, [valuePlayers]); // Установка/Обновление кол-ва игроков и тип ролей на игру (какие роли будут в игре)

	useEffect(() => {
		const rolesArray = []; // Локальный массив ролей

		// Добавление дефолтных ролей
		if (roles.civilian.value) {
			rolesArray.push(...Array(roles.civilian.value).fill([roles.civilian.name, roles.civilian.smile].join(' ')));
		} // Мирный
		if (roles.mafia.value) {
			rolesArray.push(...Array(roles.mafia.value).fill([roles.mafia.name, roles.mafia.smile].join(' ')));
		} // Мафия
		if (roles.don.value) {
			rolesArray.push(...Array(roles.don.value).fill([roles.don.name, roles.don.smile].join(' ')));
		} // Дон
		if (roles.commissar.value) {
			rolesArray.push(...Array(roles.commissar.value).fill([roles.commissar.name, roles.commissar.smile].join(' ')));
		} // Комиссар
		if (roles.doctor.value) {
			rolesArray.push(...Array(roles.doctor.value).fill([roles.doctor.name, roles.doctor.smile].join(' ')));
		} // Доктор
		if (roles.mistress.value) {
			rolesArray.push(...Array(roles.mistress.value).fill([roles.mistress.name, roles.mistress.smile].join(' ')));
		} // Любовница
		if (roles.maniac.value) {
			rolesArray.push(...Array(roles.maniac.value).fill([roles.maniac.name, roles.maniac.smile].join(' ')));
		} // Маньяк
		if (roles.werewolf.value) {
			rolesArray.push(...Array(roles.werewolf.value).fill([roles.werewolf.name, roles.werewolf.smile].join(' ')));
		} // Оборотень
		if (roles.sergeant.value) {
			rolesArray.push(...Array(roles.sergeant.value).fill([roles.sergeant.name, roles.sergeant.smile].join(' ')));
		} // Сержант
		// ///////////////////////////////

		setDefaultRoles(
			rolesArray.map((role, index) => ({
				id: `${index + 1}`,
				role: role,
			}))) // Установка/Обновление дефолтных ролей
		setGameParametres((prevParams) => ({
			...prevParams,
			roles: roles,
		})); // добавление roles в gameParametres.roles
	}, [valuePlayers, roles]); // Установка/Обновление дефолтных ролей (прямое добавление ролей в массив) / Добавление roles в gameParametres.roles

	const handleSelectChange = (event) => {
		const selectedValue = event.target.value;
		setValuePlayers(parseInt(selectedValue));
		setIsGameRolesChanged(true);
	}; // Установка/Изменение кол-ва игроков в gameParametres через select "players"

	// /////////////////////////////////


	console.log();

	// Отрисовка компонентов
	return (
		<div className='parametr'>
			<div>КОЛ-ВО ИГРОКОВ:</div>
			<div className={`${style.selectBlock} ${theme} selectBlock ${valuePlayers !== '#' ? 'selectBlockON' : ''}`}>
				<InfoBlock classes={stateArr}>
					<select
						name="players"
						value={valuePlayers}
						onChange={handleSelectChange}
					>
						<option value='#' disabled>#</option>
						<option value={9}>9</option>
						<option value={10}>10</option>
						<option value={11}>11</option>
						<option value={12}>12</option>
						<option value={13}>13</option>
						<option value={14}>14</option>
						<option value={15}>15</option>
					</select>
				</InfoBlock>
			</div>
		</div> // Кол-во игроков
	);
	// /////////////////////////////////////
}

export default ValuePlayers;