// Импорты
import React, { useState, useContext } from 'react';
import style from './Parametres.module.css';
import Block from '../../../components/UI/Block/Block';
import { StoreContext, AppRouterContext } from '../../../context/context';
import ValuePlayers from './ValuePlayers/ValuePlayers';
import SwitchParametres from './SwitchParametres/SwitchParametres';
import ThemesBtn from '../../../components/Modals/ModalThemes/ThemesBtn/ThemesBtn';
/////////////////////////////////////////////////////

const Parametres = () => {
	// Состояния
	const { gameParametres, theme } = useContext(StoreContext); // Получение состояний из глобального хранилища
	const { changePage } = useContext(AppRouterContext); // Получение состояний из AppRouter
	const [valuePlayers, setValuePlayers] = useState(parseInt(localStorage.getItem('valuePlayers')) || '#'); // Состояние кол-ва игроков
	// /////////////////////////////////////////////////////////
	// Функционал

	const startGameClick = (link) => {
		if (valuePlayers !== '#') {
			localStorage.setItem('startGame', JSON.stringify(true)); // Сохранение параметров игры в localStorage
			localStorage.setItem('gameParametres', JSON.stringify(gameParametres)); // Сохранение параметров игры в localStorage
			localStorage.removeItem('valuePlayers');
			localStorage.removeItem('roleData');
			localStorage.removeItem('slotData');
			localStorage.removeItem('fallsMax');
			localStorage.removeItem('plus30');
			localStorage.removeItem('badWords');
			changePage(link) // переадресовывает на другую страницу и на любые другие нельзя будет перейти
		}
		else {
			console.log('Вы не можете начать игру не выбрал кол-во игроков!'); // в дальнейшем заменить на кастомный alert
		}
	} // Запуск игры и условия для запуска, сохранение итоговых настроек игры, и очистка localStorage от старых значений, чтобы при перезапуске был выбор с самого начала

	///////////////////////////////////////

	// Отрисовка компонентов
	return (
		<div className={style.parametres}>
			<Block className={style.parametresBlock} > {/* Компонент для стилизации повернутого блока, в styles нужно указать доп стили */}
				<input
					type="button"
					value='Настройка игры'
					className={`${style.header} ${theme} noActiveBtn`}
				/> {/* Header в виде input чтобы выглядеть  так-же как и в рандоманзере, + потенциал для дальнейших обновлений (например на стадии идеи 'Настройка ролей' для добавления кастомных ролей)*/}
				<div className='content'>
					<div className={style.parametresSection}>
						<ValuePlayers valuePlayers={valuePlayers} setValuePlayers={setValuePlayers} />
						<SwitchParametres />
					</div> {/* Сюда можно добавлять новые параметры */}
					<ThemesBtn /> {/* Кнопка темы открывающая модальное окно с темами */}
				</div>
				<button onClick={() => startGameClick('/game')} className={style.startGameBtn}>Начать игру</button>
			</Block>
		</div>
	);
	// /////////////////////////////////////
}

export default Parametres;