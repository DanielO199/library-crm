import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import { LoansStore } from 'stores';
import { Loader } from 'components/common';
import { LoanUpdateHeader, LoanUpdateForm } from './components';

const UpdateLoan = observer(() => {
	const loanId = useParams().loanId;

	const { loading, loan } = LoansStore;

	useEffect(() => {
		LoansStore.fetchLoan(loanId);
	}, [loanId]);

	return (
		<div className='update-loan'>
			<LoanUpdateHeader />
			{loading && <Loader />}
			{!loading && loan && <LoanUpdateForm id={loanId} />}
		</div>
	);
});

export default UpdateLoan;
