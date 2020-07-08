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
	console.log(users);
	const [selectedBook, setSelectedBook] = useState();
	const [selectedUser, setSelectedUser] = useState();
	const [selectedDate, setSelectedDate] = useState();
	const history = useHistory();

	const handleChangeBook = (selectedBook) => {
		setSelectedBook(selectedBook);
	};

	const handleChangeUser = (selectedUser) => {
		setSelectedUser(selectedUser);
	};

	const handleChangeDate = (date) => {
		setSelectedDate(date);
	};

	return (
		<div className='new-loan-form'>
			<Select
				value={selectedBook}
				onChange={handleChangeBook}
				options={books}
			/>
			<Select
				value={selectedUser}
				onChange={handleChangeUser}
				options={users}
			/>
			<DatePicker
				selected={selectedDate}
				onChange={handleChangeDate}
				showTimeSelect
				dateFormat='Pp'
				isClearable
			/>
			<div className='new-loan-form__btns'>
				<div className='new-loan-form__btn '>
					<Button
						onClick={async () => {
							await LoansStore.addLoan({
								selectedBook,
								selectedUser,
								selectedDate
							});
							console.log(selectedBook, selectedUser, selectedDate);
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
