// Импорты
import React, { useState, useEffect, useContext } from 'react';
import style from './PlayerPanel.module.css';
import { StoreContext } from '../../../../context/context';
import ModalKick from '../../../../components/Modals/ModalKick/ModalKick';
import PlayerVote from './PlayerVote/PlayerVote';
import PlayerFalls from './PlayerFalls/PlayerFalls';
import PlayerPlus30 from './PlayerPlus30/PlayerPlus30';
import PlayerKick from './PlayerKick/PlayerKick';
/////////////////////////////////////////////////////

const PlayerPanel = () => {
	// Состояния
	const { gameParametres, setGameParametres, theme } = useContext(StoreContext); // Получение состояний из глобального хранилища
	const [modalKick, setModalKick] = useState(false) // Переключатель модального окна с киком
	const [selectedPlayer, setSelectedPlayer] = useState(null); // Хранение выбранного игрока для модального окна
	// /////////////////////////////////////////////////////////
	// Функционал
	const playerClick = (item, type, i = null) => {
		setGameParametres((prevParametres) => {
			const updatedPlayers = prevParametres.players.map((player) => {
				if (player.id === item.id) {
					let newFalls = player.falls;
					if (type === 'falls') {
						newFalls = player.falls === i ? (i > 1 ? i - 1 : null) : i;
					}
					return {
						...player,
						[type]: !player[type],
						falls: newFalls,
					};
				}
				return player;
			});
			const updatedParametres = {
				...prevParametres,
				players: updatedPlayers,
			};


			if (gameParametres.fallsMax) {
				if (type === 'falls') {
					updatedParametres.players.forEach((player) => {
						if (player.falls === gameParametres.fallsMax && !player.kick) {
							playerKick(player);
						}
					});
				}
			}


			if (type === 'vote') {
				const itemResult = updatedParametres['voted'].some((playerItem) => playerItem.id === item.id);

				if (itemResult) {
					updatedParametres['voted'] = updatedParametres['voted'].filter((playerItem) => playerItem.id !== item.id);
				} else {
					const { id } = item;
					updatedParametres['voted'] = [...updatedParametres['voted'], { id }];
				}
			}

			localStorage.setItem('gameParametres', JSON.stringify(updatedParametres));
			return updatedParametres;
		});
	};

	const playerKick = (item) => {
		setSelectedPlayer(item); // Устанавливаем выбранного игрока

		if (!gameParametres.fallsMax) { // ЕСЛИ ИГРА БЕЗ ФОЛЛОВ
			setModalKick(true); // Открываем модальное окно
		}
		setGameParametres((prevParametres) => {
			const updatedParametres = { ...prevParametres };
			if (item.kick === false && item.falls !== prevParametres.fallsMax) {
				setModalKick(true); // Открываем модальное окно
			} else {
				// Установка свойства kick игрока в false
				const updatedPlayers = updatedParametres.players.map((player) => {
					if (player.id === item.id) {
						return {
							...player,
							kick: false,
						};
					}
					return player;
				});
				updatedParametres.players = updatedPlayers;

				// Удаление игрока из массива kicked
				updatedParametres.kicked = updatedParametres.kicked.filter((playerItem) => playerItem.id !== item.id);

				localStorage.setItem('gameParametres', JSON.stringify(updatedParametres));
			}


			return updatedParametres;
		});

	};
	///////////////////////////////////////

	// Отрисовка компонентов
	return (
		<div className={`${style.playerPanel} ${theme}`}>
			{selectedPlayer && (
				<ModalKick
					visible={modalKick}
					setVisible={setModalKick}
					gameParametres={gameParametres}
					setGameParametres={setGameParametres}
					item={selectedPlayer} // Передайте выбранного игрока в ModalKick
				/>
			)}
			<div className={style.player}>
				<div className={style.playersVote}>
					{gameParametres.players.map((item, index) => (
						<div key={index} className={style.playerVote}>
							<PlayerVote item={item} playerClick={playerClick} />
						</div>
					))}
				</div>
				<div className={style.playersCharacteristics}>
					{gameParametres.players.map((item, index) => (
						<div key={index} className={style.playerCharacteristics}>
							{gameParametres.fallsMax === 4 || gameParametres.fallsMax === 5 ? (
								<PlayerFalls item={item} playerClick={playerClick} gameParametres={gameParametres} />
							) : null}
							{gameParametres.plus30 && (
								<PlayerPlus30 item={item} playerClick={playerClick} />
							)}
							<PlayerKick item={item} playerKick={playerKick} />
						</div>
					))}
				</div>

			</div>

		</div>
	);
	// /////////////////////////////////////
};

export default PlayerPanel;