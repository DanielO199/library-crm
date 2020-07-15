import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { DasboardStore } from 'stores';
import { Loader } from 'components/common';
import { Card, Chart } from './components';

const Dashboard = observer(() => {
	useEffect(() => {
		DasboardStore.fetchQuantity();
		DasboardStore.fetchLoans();
		DasboardStore.fetchMostActiveUsers();
	}, []);

	return (
		<div className='dashboard'>
			{DasboardStore.loading && <Loader />}
			{!DasboardStore.loading &&
				DasboardStore.usersQuantity &&
				DasboardStore.booksQuantity &&
				DasboardStore.loansQuantity &&
				DasboardStore.loans && (
					<>
						<div className='dashboard-cards'>
							<Card quantity={DasboardStore.usersQuantity} label='Users' />
							<Card quantity={DasboardStore.booksQuantity} label='Books' />
							<Card quantity={DasboardStore.loansQuantity} label='Loans' />
						</div>
						<div className='dasboard-charts'>
							TOP 5 CZYTELNIKOW TOP 5 NAJLEPSZYCH KSIAZEK MOZE
							<Chart loans={DasboardStore.loans} legendPosition='bottom' />
						</div>
					</>
				)}
		</div>
	);
});

export default Dashboard;
