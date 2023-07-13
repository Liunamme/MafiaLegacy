// Импорты
import React from 'react';
import style from './ModalRoles.module.css';
import MyModal from '../../UI/MyModal/MyModal';
import InfoBlock from '../../UI/InfoBlock/InfoBlock';
//////////////////////////////////////////


const ModalRoles = ({ visible, setVisible, gameParametres }) => {

	// Отрисовка компонентов
	return (
		<MyModal visible={visible} setVisible={setVisible}>
			<InfoBlock>
				<div className={style.modalRoles}>
					{Object.keys(gameParametres.roles).map((key, index) => {
						const item = gameParametres.roles[key];
						return (
							item.value && (
								<span key={index} className={style.role}>
									<span>{item.name}  </span>
									<span className='smile'>{item.smile}  </span>
									<span>- {item.description}</span>
								</span>
							)
						);
					})}
				</div>
			</InfoBlock>
		</MyModal>
	);
	//////////////////////////////////////////
};

export default ModalRoles;