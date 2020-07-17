import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { DasboardStore } from 'stores';
import { Loader } from 'components/common';
import { Card, Chart, UsersList, BooksList } from './components';

const Dashboard = observer(() => {
	const {
		loading,
		usersQuantity,
		booksQuantity,
		loansQuantity,
		loans,
		mostActiveUsers,
		bestBooks
	} = DasboardStore;

	useEffect(() => {
		DasboardStore.fetchQuantity();
		DasboardStore.fetchLoans();
		DasboardStore.fetchMostActiveUsersAndBooks();
	}, []);

	return (
		<div className='dashboard'>
			{loading && <Loader />}
			{!loading &&
				usersQuantity &&
				booksQuantity &&
				loansQuantity &&
				loans &&
				mostActiveUsers &&
				bestBooks && (
					<>
						<div className='dashboard-cards'>
							<Card quantity={usersQuantity} label='Users' />
							<Card quantity={booksQuantity} label='Books' />
							<Card quantity={loansQuantity} label='Loans' />
						</div>
						<div className='dasboard-charts'>
							<Chart loans={loans} legendPosition='bottom' />
						</div>
						<div className='dashboard-best'>
							<UsersList users={mostActiveUsers} />
							<BooksList books={bestBooks} />
						</div>
					</>
				)}
		</div>
	);
});

export default Dashboard;
