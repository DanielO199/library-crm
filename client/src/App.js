import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { AuthStore } from 'stores';
import { routes } from 'globals/routesCombined';
import { Sidebar, Logger } from 'components/common';

const App = observer(() => {
	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			AuthStore.token = localStorage.getItem('accessToken');
		}
	}, []);

	return (
		<div className='app'>
			<Logger />
			<Router>
				{AuthStore.token && <Sidebar />}
				<main className={`${AuthStore.token && 'logged'}`}>
					{routes.map((route, index) => {
						return (
							<Route
								key={index}
								path={route.path}
								exact={route.exact}
								name={route.name}
								component={route.component}
							/>
						);
					})}
				</main>
			</Router>
		</div>
	);
});

export default App;
