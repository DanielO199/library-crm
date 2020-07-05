import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

import { LoggerStore } from 'stores';

const LogElem = observer(({ item, index }) => {
	return (
		<div
			key={index}
			className={`logger ${item.status === 'Success' && 'log-success'} ${
				item.status === 'Error' && 'log-error'
			}`}>
			<div className='logger-icon'>
				<i className='fas fa-lg fa-check-circle'></i>
				{`${item.message}`}
			</div>
			<span
				className='logger-close'
				onClick={() => {
					LoggerStore.closeLoggerWindow(item.id);
				}}>
				<i className='fas fa-times'></i>
			</span>
		</div>
	);
});
const Logger = observer(() => {
	return (
		<div className='logger-container'>
			{toJS(LoggerStore.logs)
				.reverse()
				.map((item, index) => {
					return item.show && <LogElem item={item} index={index} key={index} />;
				})}
		</div>
	);
});

export default Logger;
