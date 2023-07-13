// Импорты
import React, { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../../context/context';
import style from './Random.module.css';
/////////////////////////////////////////////////////

const Random = ({ data, handleClick, randomSwitch, type, text }) => { // data - массив данных для рандома; handleClick - callback для изменения состояния глобального массива данных на зарандомленный список данных; randomSwitch - состояние переключателя рандомов, для того чтобы если 1й рандом переключится на 2й - данные одного не могли замениться на донные другого; type - key того что нужно рандомизировать в data; text - текст который должен передать данные о том что рандомится;
	// Состояния
	const [firstRef, setFirstRef] = useState(null); // Состояние для хранения ссылки на первый выбранный элемент в списке данных
	const { roles, theme } = useContext(StoreContext); // Получение состояний из глобального хранилища
	// /////////////////////////////////////////////////////////

	// Функционал
	const handleItemClick = (item, index) => {
		if (!firstRef) {
			setFirstRef({ item, index });
			console.log(`Выбран первый элемент ${item.role || item.slot}`);
		} else {
			const { item: firstItem, index: firstIndex } = firstRef;
			const newData = data.map((el, idx) => {
				if (idx === index) {
					return { ...el, role: firstItem.role, slot: firstItem.slot };
				} else if (idx === firstIndex) {
					return { ...el, role: item.role, slot: item.slot };
				} else {
					return el;
				}
			});

			handleClick(newData);
			console.log(`Выбран второй элемент ${item.role || item.slot}`);
			console.log(`${firstItem.role || firstItem.slot} заменен на ${item.role || item.slot}`);

			setFirstRef(null);
		}
	}; // Обработчик клика по элементу списка данных. Выполняет замену между двумя элементами.
	const handleRandomClick = () => {
		setFirstRef(null);
		const newData = [...data];

		for (let i = newData.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const tempItem = newData[i][type];
			newData[i] = { ...newData[i], [type]: newData[j][type] };
			newData[j] = { ...newData[j], [type]: tempItem };
		}

		handleClick(newData);
		if (data.length !== 0) {
			console.log(`${text} перемешаны`);
		}

	}; // Обработчик клика по кнопке 'Рандом'. Рандомит элементы списка данных

	const copyToClipboard = () => {
		const all = []; // Все роли/слоты
		const blackRoles = []; // Черные активки
		const redRoles = []; // Красные активки
		data.forEach(item => {
			all.push(`${item.id < 10 ? '0' + item.id : item.id} ${item[type] < 10 ? '0' + item[type] : item[type]}`); // Добавление всех ролей/слотов в массив all
			if (type === 'role') {
				if (item.role.includes(roles.mafia.name)) {
					blackRoles.push(`${item.id < 10 ? '0' + item.id : item.id} ${item.role}`);
				} // Добавление Мафии в массив blackRoles
			}
		});
		if (type === 'role') {
			const donRole = data.find(item => item.role.includes(roles.don.name));
			if (donRole) {
				blackRoles.push(`${donRole.id < 10 ? '0' + donRole.id : donRole.id} ${donRole.role}`);
			} // Добавление Дона в массив blackRoles

			const werewolfRole = data.find(item => item.role.includes(roles.werewolf.name));
			if (werewolfRole) {
				blackRoles.push(`${werewolfRole.id < 10 ? '0' + werewolfRole.id : werewolfRole.id} ${werewolfRole.role}`);
			} // Добавление Оборотня в массив blackRoles

			const maniacRole = data.find(item => item.role.includes(roles.maniac.name));
			if (maniacRole) {
				blackRoles.push(`${maniacRole.id < 10 ? '0' + maniacRole.id : maniacRole.id} ${maniacRole.role}`);
			} // Добавление Маньяка в массив blackRoles

			data.forEach(item => {
				if (
					item.role.includes(roles.mistress.name) ||
					item.role.includes(roles.sergeant.name) ||
					item.role.includes(roles.commissar.name) ||
					item.role.includes(roles.doctor.name)
				) {
					redRoles.push(`${item.id < 10 ? '0' + item.id : item.id} ${item.role}`);
				}
			}); // Добавление красных активок в массив redRoles
		}

		// Формат копируемого текста:
		const formattedData = `${type === 'role' ? 'Все роли:' : 'Слоты:'}\n${all.join('\n')}${type === 'role' ? '\n\nЧерные активки ⚫️:\n' + blackRoles.join('\n') + '\n\nКрасные активки 🔴:\n' + redRoles.join('\n') : ''}`;

		navigator.clipboard.writeText(formattedData); // Копирование текста в буфер обмена
		console.log('Данные скопированы в буфер обмена');
	}; // Обработчик клика по кнопке 'Скопировать'. копирует отформатированные данные в буфер обмена.


	useEffect(() => {
		setFirstRef(null)
	}, [randomSwitch]) // Сброс первого выбранного элемента в списке данных (чтобы случайно нельзя было заменить данные из одного рандомайзера на данные другого рандомайзера)
	///////////////////////////////////////

	// Отрисовка компонентов
	return (
		<>
			<div className={style.players}>
				{data.map((item, index) => (
					<div key={index} className={style.player}>
						<span className={`${theme} noBtn`}>{item.id < 10 ? '0' + item.id : item.id}</span>
						<span className={`${style.playerBtn} ${firstRef && firstRef.index === index ? 'activeBtn' : ''} ${theme} btn`} onClick={() => handleItemClick(item, index)}>
							{`${item[type] < 10 ? '0' + item[type] : item[type]}`}
						</span>
					</div>
				))}
			</div>
			<div className={style.btns}>
				<button onClick={() => copyToClipboard('role')}>Скопировать</button>
				<button onClick={handleRandomClick}>Рандом</button>
			</div>
		</>
	);
	// /////////////////////////////////////
};

export default Random;
