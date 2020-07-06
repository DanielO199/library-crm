import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { LoansStore } from 'stores';
import { Pagination, Loader } from 'components/common';
import {
	LoansListHeader,
	LoansListNone,
	LoansListToolBar,
	LoansListFilters,
	LoansListTable,
	LoanItem
} from './components';

const LoansList = observer(() => {
	const {
		loading,
		loansList,
		loansQuantity,
		filters,
		isFirstPageNeeded
	} = LoansStore;

	useEffect(() => {
		LoansStore.fetchLoans();
		LoansStore.resetFilters();
	}, []);

	return (
		<>
			<div className='loans-list'>
				<LoansListHeader />
				<LoansListToolBar />
				<LoansListFilters />
				{loading && <Loader />}
				{!loading && loansList && (
					<LoansListTable>
						{loansList.map((loan) => (
							<LoanItem
								key={loan.id}
								id={loan.id}
								issueDate={loan.issueDate}
								returnDate={loan.returnDate}
								createdAt={loan.createdAt}
								book={loan.book}
								user={loan.user}
							/>
						))}
					</LoansListTable>
				)}
				{loansQuantity ? (
					<Pagination
						numberOfArticles={loansQuantity}
						params={filters}
						fetchArticles={(page, params) =>
							LoansStore.fetchLoans(page, params)
						}
						isFirstPageNeeded={isFirstPageNeeded}
					/>
				) : null}
				{loansQuantity === 0 && <LoansListNone />}
			</div>
		</>
	);
});

export default LoansList;
