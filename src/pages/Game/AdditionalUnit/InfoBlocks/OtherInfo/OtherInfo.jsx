// Импорты
import React from 'react';
import style from './OtherInfo.module.css';
import InfoBlock from '../../../../../components/UI/InfoBlock/InfoBlock';
//////////////////////////////////////////


const OtherInfo = ({ gameParametres }) => {

	// Отрисовка компонентов
	return (
		<div>
			<InfoBlock>
				<div className={style.otherInfo}>
					{gameParametres.fallsMax && <span>● {gameParametres.fallsMax - 1} фолл - мут</span>}
					{gameParametres.badWords && gameParametres.fallsMax ? <span>● 1 мат - 1 фолл</span> : ''}
					{gameParametres.plus30 && <span>● 1 раз за игру можно взять +30 сек на речь</span>}
					<span>● Несострелы разрешены</span>
					<span>● Правильное выставление: "Я ВЫСТАВЛЯЮ [НОМЕР]</span>
				</div>
			</InfoBlock>
		</div>
	);
	//////////////////////////////////////////
};

export default OtherInfo;