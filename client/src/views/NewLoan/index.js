import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { LoansStore } from 'stores';
import { Loader } from 'components/common';
import { NewLoanHeader, NewLoanForm } from './components';

const NewLoan = observer(() => {
	useEffect(() => {
		LoansStore.fetchBooks();
		LoansStore.fetchUsers();
	}, []);

	return (
		<div className='new-loan'>
			<NewLoanHeader />
			{LoansStore.loading && <Loader />}
			{!LoansStore.loading && LoansStore.books && LoansStore.users && (
				<NewLoanForm books={LoansStore.books} users={LoansStore.users} />
			)}
		</div>
	);
});

export default NewLoan;
