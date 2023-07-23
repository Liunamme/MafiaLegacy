// Импорты
import React, { useState, useContext, useEffect } from 'react';
import style from './Parametres.module.css';
import Block from '../../../components/UI/Block/Block';
import { StoreContext, AppRouterContext, AutorizationContext } from '../../../context/context';
import ValuePlayers from './ValuePlayers/ValuePlayers';
import SwitchParametres from './SwitchParametres/SwitchParametres';
import ThemesBtn from '../../../components/Modals/ModalThemes/ThemesBtn/ThemesBtn';
/////////////////////////////////////////////////////

const Parametres = () => {
	// Состояния
	const { gameParametres, theme, startGame, bot } = useContext(StoreContext); // Получение состояний из глобального хранилища
	const { isAuth } = useContext(AutorizationContext); // Получение состояний из авторизации
	const { changePage } = useContext(AppRouterContext); // Получение состояний из AppRouter
	const [valuePlayers, setValuePlayers] = useState(parseInt(localStorage.getItem('valuePlayers')) || gameParametres.valuePlayers || '#'); // Состояние кол-ва игроков
	// /////////////////////////////////////////////////////////
	// Функционал

	const startGameClick = (link) => {
		if (gameParametres.valuePlayers || valuePlayers !== '#') {
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

	// Функционал
	useEffect(() => {
		if (startGame === false && isAuth) {
			localStorage.setItem('gameParametresDefault', JSON.stringify(gameParametres));
		}
	}, [isAuth]) // Сохранение дефолтного шаблона gameParametres, для начала новой игры без перезагрузки страницы (чтобы данные обнулялись полностью и подтягивались новые параметры без перезагрузки в случае обновления)
	///////////////////////////////////////

	useEffect(() => {
		if (bot) {
			setValuePlayers('#')
		}
	}, [bot])



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
						<SwitchParametres />
						{!bot && <ValuePlayers valuePlayers={valuePlayers} setValuePlayers={setValuePlayers} />}
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