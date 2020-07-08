import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import { LoansStore } from 'stores';
import { Input, Button, LoadingSpinner } from 'components/common';
import { useForm, VALIDATOR_REQUIRE } from 'utils';

const LoanUpdateHeader = () => {
	return <h1 className='update-loan__header'>Edit Loan</h1>;
};

const LoanUpdateForm = observer(({ id }) => {
	const history = useHistory();
	const { book, user, issueDate } = LoansStore.loan;

	console.log(book);

	const [formState, inputHandler] = useForm(
		{
			id: { value: '', isValid: true },
			book: { value: '', isValid: true },
			user: { value: '', isValid: true },
			issueDate: { value: null, isValid: true }
		},
		false
	);

	return (
		<div className='update-loan__form'>
			<Input
				id='id'
				element='input'
				type='text'
				label='Id'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Id is required'
				onInput={inputHandler}
				initialValue={id}
				required={true}
				initialValid={true}
				disabled={true}
			/>
			<Input
				id='book'
				element='input'
				type='text'
				label='Book'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Book is required'
				onInput={inputHandler}
				initialValue={book?.title}
				required={true}
				initialValid={true}
				disabled={true}
			/>
			<Input
				id='user'
				element='input'
				type='text'
				// label='User'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='User is required'
				onInput={inputHandler}
				initialValue={`${user?.name} ${user?.surname}`}
				required={true}
				initialValid={true}
				disabled={true}
			/>
			<Input
				id='issueDate'
				element='input'
				type='text'
				label='Issue Date'
				validators={[VALIDATOR_REQUIRE()]}
				errorText='Issue Date is required'
				onInput={inputHandler}
				initialValue={issueDate}
				required={true}
				initialValid={true}
				disabled={true}
			/>

			<div className='update-loan-form__btns'>
				<div className='update-loan-form__btn '>
					<Button
						onClick={
							formState.isValid
								? async () => {
										const formData = new FormData();
										formData.append('isbn', formState.inputs.isbn.value);
										formData.append('title', formState.inputs.title.value);
										formData.append('author', formState.inputs.author.value);
										formData.append('image', formState.inputs.image.value);

										await LoansStore.updateLoan(formData, id);
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
