// Импорты
import React, { useContext } from 'react';
import { StoreContext } from '../../../context/context';
import style from './InfoBlock.module.css';
//////////////////////////////////////////


const InfoBlock = ({ children, classes }) => {
	const { theme } = useContext(StoreContext); // Получение состояний из глобального хранилища

	const rootClassMainDiv = [
		style.mainDiv,
		theme,
		'mainDiv',
		classes && classes.allTrue ? style.width100 : '',
		classes && classes.OFF ? style.lightOFF : '',
		theme === 'dark4off' ? style.lightOFF : '',
	].join(' ');

	const rootClassNoise = [
		style.noise,
		theme === 'dark4off' ? style.displayNone : '',
		classes && classes.OFF ? style.displayNone : '',
	].join(' ');

	const rootinfoBlock = [
		style.infoBlock,
		theme,
		'infoBlock',
		classes && classes.allTrue ? style.borderRadius25 : '',
		classes && classes.OFF ? `${style.infoBlockOFF} selectOFF` : '',
	].join(' ');

	// Отрисовка компонентов
	return (
		<div className={rootClassMainDiv}>
			<div className={style.display}>
				<div className={rootClassNoise}></div>
				<div className={rootinfoBlock}>
					{children}
				</div>
			</div>
		</div>

	);
	//////////////////////////////////////////
};

export default InfoBlock;