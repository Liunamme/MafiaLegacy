// Импорты
import React, { useEffect } from 'react';
import style from './ModalKick.module.css';
import MyModal from '../../UI/MyModal/MyModal';
import InfoBlock from '.././../UI/InfoBlock/InfoBlock'
//////////////////////////////////////////


const ModalKick = ({ visible, setVisible, gameParametres, setGameParametres, item }) => {

	const playerKick = (item, cause) => {
		setGameParametres((prevParametres) => {
			const updatedParametres = { ...prevParametres };

			const itemResult = updatedParametres.kicked.some((playerItem) => playerItem.id === item.id);

			if (itemResult) {
				updatedParametres.kicked = updatedParametres.kicked.filter((playerItem) => playerItem.id !== item.id);
			} else {
				const { id, role } = item;
				const kickedPlayer = { id, role, time: parseInt(localStorage.getItem('timeGame')), cause: cause };
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
	}, [item.falls, item.id, item.kick]);


	// Отрисовка компонентов
	return (
		<MyModal visible={visible} setVisible={setVisible} modalInBlock={true}>
			<InfoBlock>
				<div className={style.modalKick}>
					<h1>{`Игрок ${item.id < 10 ? `0${item.id}` : item.id}`}</h1>
					<div className={style.kickBtns}>
						<button className={style.btn} onClick={() => playerKick(item, 'Голосование')}>Голосование</button>
						<button className={style.btn} onClick={() => playerKick(item, 'Убит')}>Убит</button>
					</div>
				</div>
			</InfoBlock>
		</MyModal>
	);
};

export default ModalKick;