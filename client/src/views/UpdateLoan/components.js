import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { LoansStore } from 'stores';
import { Button, LoadingSpinner } from 'components/common';

const LoanUpdateHeader = () => {
	return <h1 className='update-loan__header'>Edit Loan</h1>;
};

const LoanUpdateForm = observer(({ id }) => {
	const [returnDate, setReturnDate] = useState();
	const { book, user, issueDate, createdAt } = LoansStore.loan;
	const history = useHistory();

	const handleChangeDate = (date) => {
		setReturnDate(date);
	};

	return (
		<div className='update-loan__form'>
			<div className='form-input-not-allowed'>
				<label>Id</label>
				<input type='text' value={id} disabled={true} />
			</div>
			<div className='form-input-not-allowed'>
				<label>Book</label>
				<input type='text' value={book?.title} disabled={true} />
			</div>
			<div className='form-input-not-allowed'>
				<label>User</label>
				<input
					type='text'
					value={`${user?.name} ${user?.surname}`}
					disabled={true}
				/>
			</div>
			<div className='form-input-not-allowed'>
				<label>Issue date</label>
				<input type='text' value={issueDate} disabled={true} />
			</div>
			<label>Return date</label>
			<DatePicker
				selected={returnDate}
				onChange={handleChangeDate}
				isClearable
				withPortal
				className='update-loan-datepicker'
				minDate={new Date(createdAt)}
			/>
			<div className='update-loan-form__btns'>
				<div className='update-loan-form__btn '>
					<Button
						onClick={
							returnDate
								? async () => {
										await LoansStore.updateLoan({ returnDate }, id);
										history.push('/loans');
								  }
								: null
						}>
						{LoansStore.loading ? <LoadingSpinner /> : 'Save'}
					</Button>
				</div>
				<Button inverse>Reset</Button>
			</div>
		</div>
	);
});

export { LoanUpdateHeader, LoanUpdateForm };
