// Импорты
import React, { useState, useEffect, useContext } from 'react';
import style from './Bot.module.css';
import Block from '../../../components/UI/Block/Block';
import { StoreContext } from '../../../context/context';
/////////////////////////////////////////////////////

const Bot = () => {
	const { gameParametres, setGameParametres, player, roles } = useContext(StoreContext);

	const [draftTextareaValue, setDraftTextareaValue] = useState('');
	const [initialBotInfo, setInitialBotInfo] = useState('');
	const [processedBotInfo, setProcessedBotInfo] = useState([]);
	const [isDataSent, setIsDataSent] = useState(false);

	const handleTextareaChange = (event) => {
		setDraftTextareaValue(event.target.value);
		setIsDataSent(false);
	};

	const handleSendData = () => {
		setInitialBotInfo(draftTextareaValue);
	};

	const processInitialBotInfo = (info) => {
		const regex = /"(\d+)"\s+"([^"]+)"\s+"([^"]+)"\s*$/gm;
		const matches = info.match(regex);
		if (matches) {
			const processedData = matches.map((match) => {
				const [id, nickname, roleWithEmoji] = match.split('"').filter((item) => item.trim() !== '');
				const roleWithoutEmoji = roleWithEmoji.replace(/🔴|👹|⚫️|🕵️‍|🕵️|🤠|💉|💖|🔪|🚓/g, '').trim();
				const roleReplaced = roleWithoutEmoji.replace('Мирный житель', 'Мирный').replace('Дон Мафии', 'Дон');

				// Найти объект роли из состояния 'roles' на основе обработанного имени роли
				const roleObject = Object.values(roles).find((role) => role.name === roleReplaced);

				// Получить смайлик, соответствующий объекту роли, или пустую строку, если роль не найдена
				const roleEmoji = roleObject ? roleObject.smile : '';

				// Добавить смайлик к никнейму
				const roleWithEmojiEnd = `${roleReplaced} ${roleEmoji}`;

				// Вернуть обновленный объект данных
				return { id, nickname: nickname, role: roleWithEmojiEnd };
			});
			setProcessedBotInfo(processedData);
			setIsDataSent(true);
			setDraftTextareaValue('');
			setGameParametres((prevState) => ({
				...prevState,
				valuePlayers: processedData.length
			}));
			fillPlayersInfo(processedData);
		}
	};

	const fillPlayersInfo = (data) => {
		setGameParametres((prevState) => ({
			...prevState,
			players: data.map((bot) => ({
				...player,
				id: bot.id,
				nickname: bot.nickname,
				role: bot.role
			}))
		}));
	};

	useEffect(() => {
		if (initialBotInfo) {
			processInitialBotInfo(initialBotInfo);
		}
	}, [initialBotInfo]);

	useEffect(() => {
		localStorage.setItem('valuePlayers', String(gameParametres.players.length)); // Сохранение кол-ва игроков в localStorage
	}, [gameParametres.players]);


	// Управление Кол-ва игроков и Ролей
	useEffect(() => {
		setGameParametres(prevParams => ({
			...prevParams,
			roles: roles
		}));
		if (processedBotInfo.length !== 0 && processedBotInfo) {
			const valuePlayers = processedBotInfo.length || '#';
			setGameParametres(prevParams => ({
				...prevParams,
				valuePlayers: Number(valuePlayers),
				roles: { // Обновление roles в gameParametres.roles
					...prevParams.roles, // Сохраняем все остальные свойства ролей
					civilian: {
						...prevParams.roles.civilian,
						value: valuePlayers >= 9 && valuePlayers <= 11 ? 6 : valuePlayers >= 12 && valuePlayers <= 15 ? 5 : null,
					},
					mafia: {
						...prevParams.roles.mafia,
						value: valuePlayers === 9 ? 1 : valuePlayers === 10 || valuePlayers === 11 ? 2 : valuePlayers >= 12 && valuePlayers <= 14 ? 3 : valuePlayers >= 15 ? 4 : null,
					},
					don: {
						...prevParams.roles.don,
						value: valuePlayers >= 9 ? 1 : null,
					},
					commissar: {
						...prevParams.roles.commissar,
						value: valuePlayers >= 9 ? 1 : null,
					},
					doctor: {
						...prevParams.roles.doctor,
						value: valuePlayers >= 11 ? 1 : null,
					},
					mistress: {
						...prevParams.roles.mistress,
						value: valuePlayers >= 12 ? 1 : null,
					},
					maniac: {
						...prevParams.roles.maniac,
						value: valuePlayers >= 13 ? 1 : null,
					},
					werewolf: {
						...prevParams.roles.werewolf,
						value: valuePlayers === 14 ? 1 : null,
					},
					sergeant: {
						...prevParams.roles.sergeant,
						value: valuePlayers >= 15 ? 1 : null,
					},
				},
			}));
			localStorage.setItem('valuePlayers', String(valuePlayers)); // Сохранение кол-ва игроков в localStorage
		}



	}, [processedBotInfo]); // Установка/Обновление кол-ва игроков и тип ролей на игру (какие роли будут в игре)

	return (
		<div className={style.bot}>
			<Block className={style.botBlock}>
				<div className={style.content}>
					<textarea
						placeholder={isDataSent ? 'Данные отправлены' : 'Вставьте данные из бота...'}
						value={draftTextareaValue}
						onChange={handleTextareaChange}
					/>
				</div>
				<button onClick={handleSendData}>Отправить данные</button>
			</Block>
		</div>
	);
};

export default Bot;