// Импорты
import React from 'react';
import style from './ModalWinner.module.css';
import MyModal from '../../UI/MyModal/MyModal';
import InfoBlock from '../../UI/InfoBlock/InfoBlock';
//////////////////////////////////////////


const ModalWinner = ({ visible, setVisible, gameParametres, setGameParametres, timer, changePage }) => {

	// Получение и форматирование текущей даты и времени
	const currentDate = new Date();
	const day = String(currentDate.getDate()).padStart(2, '0');
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	const year = currentDate.getFullYear();
	const hours = String(currentDate.getHours()).padStart(2, '0');
	const minutes = String(currentDate.getMinutes()).padStart(2, '0');
	const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
	/////////////////////////////////

	const winnerClick = (winner) => {
		const updatedGameParametres = {
			...gameParametres,
			winner: winner,
			time: timer,
			date: formattedDate,
		}; // Обновленные параметры игры

		setGameParametres(updatedGameParametres); // Обновление gameParametres

		localStorage.setItem('startGame', JSON.stringify(false)); // Окончание игры
		localStorage.removeItem('timer'); // Удаление локального таймера из localStorage
		localStorage.removeItem('timeGame'); // Удаление глобального таймера из localStorage
		localStorage.setItem('gameParametres', JSON.stringify(updatedGameParametres)); // Сохранение прошедшей игры

		changePage('/results'); // Переход на Results
	}; // Кнопка выброра победителя

	// Отрисовка компонентов
	return (
		<MyModal visible={visible} setVisible={setVisible}>
			<InfoBlock>
				<div className={style.modalWinner}>
					<h1>Выберите победителя:</h1>
					<div className={style.winnerBtns}>
						<button className={style.btn} onClick={() => winnerClick(['Красные', '🔴'])}><span className='roleSpan'>Красные<span className='smile'>🔴</span></span></button>
						<button className={style.btn} onClick={() => winnerClick(['Черные', '⚫️'])}><span className='roleSpan'>Черные <span className='smile'>⚫️</span></span></button>
						{gameParametres.roles.maniac && gameParametres.roles.maniac.value && <button className={style.btn} onClick={() => winnerClick(['Маньяк', '🔪'])}><span className='roleSpan'>Маньяк <span className='smile'>🔪</span></span></button>}

					</div>
				</div>
			</InfoBlock>
		</MyModal>
	);
	//////////////////////////////////////////
};

export default ModalWinner;