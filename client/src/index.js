import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'mobx-react';
import * as stores from 'stores';
import 'assets/scss/styles.scss';

ReactDOM.render(
	<Provider {...stores}>
		<App />
	</Provider>,
	document.getElementById('root')
);
