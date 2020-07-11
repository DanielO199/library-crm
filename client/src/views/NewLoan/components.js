import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { LoansStore } from 'stores';
import { Button, LoadingSpinner } from 'components/common';

const NewLoanHeader = () => {
	return <h1 className='new-loan__header'>New Loan</h1>;
};

const NewLoanForm = observer(({ books, users }) => {
	const [selectedBook, setSelectedBook] = useState();
	const [selectedUser, setSelectedUser] = useState();
	const [issueDate, setIssueDate] = useState();
	const history = useHistory();

	const handleChangeBook = (selectedBook) => {
		setSelectedBook(selectedBook);
	};

	const handleChangeUser = (selectedUser) => {
		setSelectedUser(selectedUser);
	};

	const handleChangeDate = (date) => {
		setIssueDate(date);
	};

	return (
		<div className='new-loan-form'>
			<div className='new-loan-form__item'>
				<Select
					value={selectedBook}
					onChange={handleChangeBook}
					options={books}
					placeholder='Select book...'
				/>
			</div>
			<div className='new-loan-form__item'>
				<Select
					value={selectedUser}
					onChange={handleChangeUser}
					options={users}
					placeholder='Select user...'
				/>
			</div>
			<div className='new-loan-form__item'>
				<DatePicker
					selected={issueDate}
					onChange={handleChangeDate}
					isClearable
					withPortal
					dateFormat='dd/MM/yyyy'
					className='new-loan-datepicker'
					placeholderText='Issue date'
				/>
			</div>
			<div className='new-loan-form__btns'>
				<div className='new-loan-form__btn '>
					<Button
						onClick={async () => {
							await LoansStore.addLoan({
								selectedBook,
								selectedUser,
								issueDate
							});
							history.push('/loans');
						}}>
						{LoansStore.loading ? <LoadingSpinner /> : 'Save'}
					</Button>
				</div>
			</div>
		</div>
	);
});

export { NewLoanHeader, NewLoanForm };
