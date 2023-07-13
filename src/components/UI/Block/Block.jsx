// Импорты
import React, { useContext } from 'react';
import { StoreContext } from '../../../context/context';
import style from './Block.module.css'
/////////////////////////////////////////////////////

const Block = ({ children, styles, className }) => {
	const { theme } = useContext(StoreContext); // Получение состояний из глобального хранилища
	// Отрисовка компонентов
	return (
		<div className={`${style.block} ${className} ${theme} themeBlock`} style={styles}>
			<div className={style.contentBlock}>
				{children}
			</div>
		</div>
	);
	// /////////////////////////////////////
}

export default Block;