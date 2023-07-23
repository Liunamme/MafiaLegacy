// Импорты
import React, { useEffect, useContext } from 'react';
import style from './ModalKick.module.css';
import MyModal from '../../UI/MyModal/MyModal';
import InfoBlock from '.././../UI/InfoBlock/InfoBlock'
import { StoreContext } from '../../../context/context';
//////////////////////////////////////////


const ModalKick = ({ visible, setVisible, gameParametres, setGameParametres, item }) => {
	const { bot } = useContext(StoreContext); // Получение состояний из глобального хранилища
	const playerKick = (item, cause) => {
		setGameParametres((prevParametres) => {
			const updatedParametres = { ...prevParametres };

			const itemResult = updatedParametres.kicked.some((playerItem) => playerItem.id === item.id);

			if (itemResult) {
				updatedParametres.kicked = updatedParametres.kicked.filter((playerItem) => playerItem.id !== item.id);
			} else {
				const { id, role, nickname } = item;
				const kickedPlayer = { id, nickname, role, time: parseInt(localStorage.getItem('timeGame')), cause: cause };
				updatedParametres.kicked = [...updatedParametres.kicked, kickedPlayer];
				const updatedPlayers = updatedParametres.players.map((player) => {
					if (player.id === item.id) {
						return {
							...player,
							kick: true,
						};
					}
					return player;
				});
				updatedParametres.players = updatedPlayers;
			}

			localStorage.setItem('gameParametres', JSON.stringify(updatedParametres));
			return updatedParametres;
		});

		setVisible(false);
	};

	useEffect(() => {
		if (gameParametres.fallsMax) {
			if (item.falls === gameParametres.fallsMax && !item.kick) {
				playerKick(item, 'По фоллам');
			}
		}
	}, [item.falls, item.id, item.nickname, item.kick]);


	// Отрисовка компонентов
	return (
		<MyModal visible={visible} setVisible={setVisible} modalInBlock={true}>
			<InfoBlock>
				<div className={style.modalKick}>
					<h1>{`Игрок ${bot ? `${item.id} ${item.nickname}` : item.id < 10 ? '0' + item.id : item.id}`}</h1>
					<div className={style.kickBtns}>
						<button className={style.btn} onClick={() => playerKick(item, 'Голосование')}>Голосование</button>
						<button className={style.btn} onClick={() => playerKick(item, 'Убит')}>Убит</button>
						<button className={style.btn} onClick={() => playerKick(item, 'Нарушение правил')}>Нарушение правил</button>
					</div>
				</div>
			</InfoBlock>
		</MyModal>
	);
};

export default ModalKick;