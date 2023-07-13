import React, { useContext } from 'react';
import style from './Table.module.css'
import { StoreContext } from '../../context/context';

const Table = ({ data }) => {
	const { theme } = useContext(StoreContext); // Получение состояний из глобального хранилища

	console.log(data);
	return (
		<table className={`${style.table} tableResult`}>
			<thead>
				<tr className={`${style.headerTable} ${style.tableRow}`}>
					<th className={`${data.thead.id.className} ${style.tableColumn}`}>
						{data.thead.id.content}
					</th>
					<th className='characteristicsPlayer'>
						<div className={`${data.thead.role.className} ${data.thead.state ? 'roleTG' : ''} ${style.tableColumn}`}>
							{data.thead.role.content}
						</div>
						{data.thead.time && (
							<div className={`${data.thead.time.className} ${style.tableColumn}`}>
								{data.thead.time.content}
							</div>
						)}
						{data.thead.falls && (
							<div className={`${data.thead.falls.className} ${style.tableColumn}`}>
								{data.thead.falls.content}
							</div>
						)}
						{data.thead.plus30 && (
							<div className={`${data.thead.plus30.className} ${style.tableColumn}`}>
								{data.thead.plus30.content}
							</div>
						)}
						{data.thead.state && (
							<div className={`${data.thead.state.className} ${style.tableColumn}`}>
								{data.thead.state.content}
							</div>
						)}
						{data.thead.cause && (
							<div className={`${data.thead.cause.className} ${style.tableColumn}`}>
								{data.thead.cause.content}
							</div>
						)}

					</th>
				</tr>
			</thead>
			<tbody>
				{data.tbody.map((item, index) => (
					<tr key={index} className={`${style.tableRow} ${theme} tableRow`}>
						<td className={`${data.thead.id.className} ${style.tableColumn}`}>
							{item.id.content}
						</td>
						<td className='characteristicsPlayer'>
							<div className={`${data.thead.role.className} ${data.thead.state ? 'roleTG' : ''} ${style.tableColumn}`}>
								{item.role.content}
							</div>
							{item.time && (
								<div className={`${data.thead.time.className} ${style.timePlayer} ${style.tableColumn}`}>
									{item.time.content}
								</div>
							)}
							{item.falls && (
								<div className={`${data.thead.falls.className} ${style.tableColumn}`}>
									{item.falls.content}
								</div>
							)}
							{item.plus30 && (
								<div className={`${data.thead.plus30.className} ${style.tableColumn}`}>
									{item.plus30.content}
								</div>
							)}
							{item.state && (
								<div className={`${data.thead.state.className} ${style.tableColumn}`}>
									{item.state.content}
								</div>
							)}
							{item.cause && (
								<div className={`${data.thead.cause.className} ${style.tableColumn}`}>
									{item.cause.content}
								</div>
							)}

						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default Table;

