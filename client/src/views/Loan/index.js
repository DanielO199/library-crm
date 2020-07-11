import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import { LoansStore } from 'stores';
import { Loader } from 'components/common';
import { LoanHeader, LoanToolBar, LoanData } from './components';

const Loan = observer(() => {
	const loanId = useParams().loanId;
	const { loading, loan } = LoansStore;

	useEffect(() => {
		LoansStore.fetchLoan(loanId);
	}, [loanId]);

	return (
		<div className='loan'>
			<LoanHeader />
			<LoanToolBar loanId={loanId} />
			{loading && <Loader />}
			{!loading && loan && <LoanData />}
		</div>
	);
});

export default Loan;
