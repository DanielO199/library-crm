import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { LoansStore } from 'stores';
import { Button, Input, Modal } from 'components/common';
import { useForm } from 'utils';

const LoansListHeader = () => {
	return <h1 className='loans-list__header'>Loans</h1>;
};

const LoansListNone = () => {
	return <h2 className='loans-list__none'>No loans</h2>;
};

const LoansListToolBar = () => {
	return (
		<div className='loans-list__tools'>
			<Link to='/new/loan'>
				<Button>
					<i className='fas fa-plus'></i>New
				</Button>
			</Link>
			<Button inverse>Export to Excel</Button>
		</div>
	);
};

const LoansListFilters = observer(() => {
	const [formState, inputHandler] = useForm(
		{
			id: { value: '', isValid: false },
			user: { value: '', isValid: false },
			book: { value: '', isValid: false },
			status: { value: '', isValid: false }
		},
		false
	);

	return (
		<div className='loans-list__filters'>
			<div className='loans-list__filters-inputs'>
				<div className='loans-list__filters-input'>
					<Input
						id='id'
						element='input'
						type='text'
						validators={[]}
						onInput={inputHandler}
						placeholder='Id'
						valid={true}
					/>
				</div>
				<div className='loans-list__filters-input'>
					<Input
						id='user'
						element='input'
						type='text'
						validators={[]}
						onInput={inputHandler}
						placeholder='User'
						valid={true}
					/>
				</div>
				<div className='loans-list__filters-input'>
					<Input
						id='book'
						element='input'
						type='text'
						validators={[]}
						onInput={inputHandler}
						placeholder='Book'
						valid={true}
					/>
				</div>
				<div className='loans-list__filters-input'>
					<Input
						id='status'
						element='input'
						type='text'
						validators={[]}
						onInput={inputHandler}
						placeholder='Status'
						valid={true}
					/>
				</div>
			</div>
			<div className='loans-list__filters-btns'>
				<div className='loans-list__filters-btn'>
					<Button
						onClick={async () => {
							LoansStore.filters.id = formState.inputs.id.value;
							LoansStore.filters.user = formState.inputs.user.value;
							LoansStore.filters.book = formState.inputs.book.value;
							LoansStore.filters.status = formState.inputs.status.value;
							await LoansStore.fetchLoans(1, LoansStore.filters);
							LoansStore.isFirstPageNeeded = true;
						}}>
						<i className='fas fa-search'></i> Search
					</Button>
				</div>
				<div className='loans-list__filters-btn'>
					<Button
						inverse
						onClick={async () => {
							await LoansStore.fetchLoans();
							LoansStore.resetFilters();
						}}>
						Reset
					</Button>
				</div>
			</div>
		</div>
	);
});

const LoanItem = ({ id, user, book, issueDate, returnDate, status }) => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const showModal = () => {
		setShowConfirmModal(!showConfirmModal);
	};

	return (
		<>
			<Modal
				show={showConfirmModal}
				onCancel={showModal}
				footer={
					<>
						<button
							className='button button--inverse button-mr-15'
							onClick={showModal}>
							No
						</button>
						<button
							className='button'
							onClick={async () => {
								await LoansStore.deleteLoan(id);
								await LoansStore.fetchLoans(1, LoansStore.filters);
								LoansStore.isFirstPageNeeded = true;
							}}>
							Yes
						</button>
					</>
				}>
				<i className='fas fa-lg fa-exclamation-circle'></i>
				<span>Are you sure?</span>
			</Modal>

			<tr>
				<td>{book}</td>
				<td>{user}</td>
				<td>{issueDate}</td>
				<td>{returnDate}</td>
				<td>
					<span>{status}</span>
				</td>
				<td className='loan-item__actions'>
					<Link to={`/loan/${id}`}>View</Link>
					<Link to={`/edit-loan/${id}`}>Edit</Link>
					<span onClick={showModal}>Delete</span>
				</td>
			</tr>
		</>
	);
};

const LoansListTable = ({ children }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Book</th>
					<th>User</th>
					<th>Issue Date</th>
					<th>Return Date</th>
					<th>Status</th>
					<th></th>
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</table>
	);
};

export {
	LoansListHeader,
	LoansListNone,
	LoansListToolBar,
	LoansListFilters,
	LoanItem,
	LoansListTable
};
