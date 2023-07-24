// Импорты
import React, { useContext } from 'react';
import style from './RolesInfo.module.css';
import InfoBlock from '../../../../../components/UI/InfoBlock/InfoBlock';
import { StoreContext } from '../../../../../context/context';
import vaultBoyGreen from '../../../../../media/img/ico/vaultboyGreen.svg'
import vaultBoyOrange from '../../../../../media/img/ico/vaultboyOrange.svg'
//////////////////////////////////////////


const RolesInfo = ({ gameParametres, setModalRoles }) => {
	const { theme } = useContext(StoreContext); // Получение состояний из глобального хранилища
	// Отрисовка компонентов
	return (
		<div>
			<InfoBlock>
				<div className={style.rolesInfo}>
					{theme === 'personal1' ? <img src={vaultBoyGreen} className='vaultBoy' /> : ''}
					{theme === 'personal2' ? <img src={vaultBoyOrange} className='vaultBoy' /> : ''}
					<h1>Роли на столе:</h1>
					{Object.keys(gameParametres.roles).map((key, index) => {
						const item = gameParametres.roles[key];
						return (
							item.value && (
								<div key={index} className={style.role}>
									<span>x{item.value}</span>
									<span className='roleSpan'>{item.name}<span className='smile'>{item.smile}</span></span>
								</div>
							)
						);
					})}
					<button className={`absoluteBtn ${style.absoluteBtn}`} onClick={() => setModalRoles(prev => !prev)}>Описание</button> {/* Кнопка модалки с ролями */}
				</div>
			</InfoBlock>
		</div>

	);
	//////////////////////////////////////////
};

export default RolesInfo;