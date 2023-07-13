import React, { useContext } from 'react';
import style from './MyModal.module.css'
import { StoreContext } from '../../../context/context';

const MyModal = ({ children, visible, setVisible, modalInBlock }) => {
	const { theme } = useContext(StoreContext); // Получение состояний из глобального хранилища

	return (
		<div className={visible ? `${style.myModal} ${style.modalActive} ${modalInBlock ? style.modalInBlock : ''}` : `${style.myModal} ${modalInBlock ? style.modalInBlock : ''}`} onClick={() => setVisible(false)}>
			<div className={`${visible ? `${style.myModalContent} ${style.contentActive}` : style.myModalContent} ${theme} modals`} onClick={(e) => e.stopPropagation()}>
				{children}
				<button className={style.modalBtn} onClick={() => setVisible(false)}>X</button>
			</div>
		</div>
	);
}

export default MyModal;