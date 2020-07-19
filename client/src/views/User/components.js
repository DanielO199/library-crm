import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { UsersStore } from 'stores';
import { Button, Modal } from 'components/common';

const UserHeader = () => {
	return <h1 className='users-header'>View User</h1>;
};

const UserToolBar = ({ userId }) => {
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
								await UsersStore.deleteUser(userId);
								history.push('/users');
							}}>
							Yes
						</button>
					</>
				}>
				<i className='fas fa-lg fa-exclamation-circle'></i>
				<span>Are you sure?</span>
			</Modal>

			<div className='user-tools'>
				<Link to={`/edit-user/${userId}`}>
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

const UserData = () => {
	const {
		id,
		name,
		surname,
		phone,
		email,
		image,
		status,
		createdAt,
		borrowedBooksQuantity
	} = UsersStore.user;
	return (
		<div className='user-data'>
			<div className='user-data__labels'>
				<div className='user-data__label'>Id</div>
				<div className='user-data__label'>Name</div>
				<div className='user-data__label'>Surname</div>
				<div className='user-data__label'>Phone</div>
				<div className='user-data__label'>E-mail</div>
				<div className='user-data__label'>Borrowed books</div>
				<div className='user-data__label content-item__image'>Image</div>
				<div className='user-data__label'>Status</div>
				<div className='user-data__label'>Created at</div>
			</div>
			<div className='user-data__content'>
				<div className='user-data__content-item'> {id}</div>
				<div className='user-data__content-item'> {name}</div>
				<div className='user-data__content-item'> {surname}</div>
				<div className='user-data__content-item'> {phone}</div>
				<div className='user-data__content-item'> {email}</div>
				<div className='user-data__content-item'> {borrowedBooksQuantity}</div>
				<div className='user-data__content-item content-item__image'>
					<img src={`http://localhost:5000/${image}`} alt={name} />
				</div>
				<div className='user-data__content-item'>{status}</div>
				<div className='user-data__content-item'>{createdAt}</div>
			</div>
		</div>
	);
};

export { UserHeader, UserToolBar, UserData };
