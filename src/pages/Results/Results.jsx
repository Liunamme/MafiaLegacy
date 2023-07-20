import React, { useContext } from 'react';
import style from './Results.module.css'
import { StoreContext } from '../../context/context';
import HistoryGame from './HistoryGame/HistoryGame';
import Main from './Main/Main';
import TableGame from './TableGame/TableGame';
import ModalThemes from '../../components/Modals/ModalThemes/ModalThemes';
import User from '../../components/User';

const Results = () => {
	const { modalThemes, setModalThemes, theme, setTheme } = useContext(StoreContext); // Получение состояний из глобального хранилища
	return (
		<div className={`${style.results} page`}>
			<User />
			<ModalThemes visible={modalThemes} setVisible={setModalThemes} theme={theme} setTheme={setTheme} /> {/* Модалка с выбором темы */}
			<Main />
			<HistoryGame />
			<TableGame />
		</div>
	);
}

export default Results;