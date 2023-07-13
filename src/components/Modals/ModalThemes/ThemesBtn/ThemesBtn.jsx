import React, { useContext } from 'react';
import style from './ThemesBtn.module.css';
import { StoreContext } from '../../../../context/context';

const ThemesBtn = () => {
	const { setModalThemes } = useContext(StoreContext); // Получение состояний из глобального хранилища
	return (

		<div className={style.themeBtn}>
			<button onClick={() => setModalThemes(prev => !prev)}>
				Тема
			</button>
		</div>
	);
}

export default ThemesBtn;