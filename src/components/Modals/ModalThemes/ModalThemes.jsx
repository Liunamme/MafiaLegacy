// Импорты
import React, { useState, useEffect, useContext } from 'react';
import style from './ModalThemes.module.css';
import MyModal from '../../UI/MyModal/MyModal';
import InfoBlock from '../../UI/InfoBlock/InfoBlock';
import { AutorizationContext, StoreContext } from '../../../context/context';
import Switch2 from '../../UI/CustomSwitch/Switch2/Switch2';
//////////////////////////////////////////


const ModalThemes = ({ visible, setVisible, theme, setTheme }) => {
	const { offEffects, setOffEffects } = useContext(StoreContext); // Состояние авторизации
	const { isAuth, dataUsers } = useContext(AutorizationContext); // Состояние авторизации
	const [defaultTheme, setDefaultTheme] = useState(null) // Состояние дефолтной темы
	const themes = [
		{ value: `${defaultTheme}`, name: 'По умолчанию' },
		{ value: 'dark1', name: 'Dark green v1' },
		{ value: 'dark2', name: 'Dark green v2' },
		{ value: 'dark3', name: 'Dark white' },
		{ value: 'dark4', name: 'Dark red' },
		{ value: 'dark5', name: 'Dark noire' },
		{ value: 'light1', name: 'Light SoulMary' },
		{ value: 'light2', name: 'Light black' },
		{ value: 'personal1', name: 'Fallout 3 by RBZ' },
		{ value: 'personal2', name: 'Fallout NV by RBZ' },
	] // Сюда добавлять новые темы. value - название в Themes.css; name - название в select.

	const thisUser = localStorage.getItem('User')
	const user = dataUsers.find(item => item.login === thisUser);

	useEffect(() => {
		if (user.login === thisUser) {
			localStorage.setItem('defaultTheme', user.defaultTheme);
		} else {
			console.log('Пользователь не найден');
		}
	}, []) // Установка дефолтной темы пользователя

	useEffect(() => {
		localStorage.setItem('offEfects', offEffects);
	}, [offEffects]) // Установка дефолтной темы пользователя


	useEffect(() => {
		setDefaultTheme(localStorage.getItem('defaultTheme'))
		setTheme(localStorage.getItem('theme'));
	}, [isAuth]) // Первоначальная установка дефолтной темы пользователя


	const handleThemeChange = (event) => {
		const selectedTheme = event.target.value;
		setTheme(selectedTheme);
		localStorage.setItem('theme', selectedTheme);
	}; // устанавливает текущую тему и сохраняет её в localStorage

	return (
		<MyModal visible={visible} setVisible={setVisible}>
			<InfoBlock>
				<div className={style.modalThemes}>
					<div className={style.changeTheme}>
						<div>Тема:</div>
						<select value={theme} onChange={handleThemeChange}>
							{/* СДЕЛАТЬ МАССИВ ИЗ ОБЬЕКТОВ 'value, name и передавать сюда через map' */}
							{themes.map((item, index) => (
								<option key={index} value={item.value}>{item.name}</option>
							))}
						</select>
					</div>
					<div className={style.noEffects}>
						<div>No Effects:</div><div className={style.switch}><Switch2 state={offEffects} changeState={setOffEffects} /></div>
					</div>

				</div>
			</InfoBlock>
		</MyModal>
	);
};

export default ModalThemes;