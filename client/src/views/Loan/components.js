import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { LoansStore } from 'stores';
import { Button, Modal } from 'components/common';

const LoanHeader = () => {
	return <h1 className='books-header'>View Loan</h1>;
};

const LoanToolBar = ({ loanId }) => {
	const history = useHistory();
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
								await LoansStore.deleteLoan(loanId);
								history.push('/loans');
							}}>
							Yes
						</button>
					</>
				}>
				<i className='fas fa-lg fa-exclamation-circle'></i>
				<span>Are you sure?</span>
			</Modal>

			<div className='loan-tools'>
				<Link to={`/edit-loan/${loanId}`}>
					<Button>
						<i class='fas fa-edit'></i>Edit
					</Button>
				</Link>
				<Button onClick={showModal}>
					<i class='fas fa-trash-alt'></i>Delete
				</Button>
			</div>
		</>
	);
};

const LoanData = () => {
	const {
		id,
		book,
		user,
		issueDate,
		returnDate,
		status,
		createdAt
	} = LoansStore.loan;
	return (
		<div className='loan-data'>
			<div className='loan-data__labels'>
				<div className='loan-data__label'>Id</div>
				<div className='loan-data__label'>Book</div>
				<div className='loan-data__label'>User</div>
				<div className='loan-data__label'>Status</div>
				<div className='loan-data__label'>Created at</div>
				<div className='loan-data__label'>Issue date</div>
				<div className='loan-data__label'>Return date</div>
			</div>
			<div className='loan-data__content'>
				<div className='loan-data__content-item'> {id}</div>
				<div className='loan-data__content-item'>
					<Link to={`/book/${book?._id}`}>
						{book?.title} - {book?.author}
					</Link>
				</div>
				<div className='loan-data__content-item'>
					<Link to={`/user/${user?._id}`}>
						{user?.name} {user?.surname} - {user?.email}
					</Link>
				</div>
				<div className='loan-data__content-item'>{status}</div>
				<div className='loan-data__content-item'>{createdAt}</div>
				<div className='loan-data__content-item'>{issueDate} </div>
				<div className='loan-data__content-item'>{returnDate} </div>
			</div>
		</div>
	);
};

export { LoanHeader, LoanToolBar, LoanData };
