import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { UsersStore } from 'stores';
import { Button, Input, Modal } from 'components/common';
import { useForm } from 'utils';

const UsersListHeader = () => {
	return <h1 className='users-list__header'>Users</h1>;
};

const UsersListNone = () => {
	return <h2 className='users-list__none'>No users</h2>;
};

const UsersListToolBar = () => {
	return (
		<div className='users-list__tools'>
			<Link to='/new/user'>
				<Button>
					<i className='fas fa-plus'></i>New
				</Button>
			</Link>
			<Button inverse>Export to Excel</Button>
		</div>
	);
};

const UsersListFilters = observer(() => {
	const [formState, inputHandler] = useForm(
		{
			id: { value: '', isValid: false },
			name: { value: '', isValid: false },
			email: { value: '', isValid: false },
			status: { value: '', isValid: false }
		},
		false
	);

	return (
		<div className='users-list__filters'>
			<div className='users-list__filters-inputs'>
				<div className='users-list__filters-input'>
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
				<div className='users-list__filters-input'>
					<Input
						id='name'
						element='input'
						type='text'
						validators={[]}
						onInput={inputHandler}
						placeholder='Name'
						valid={true}
					/>
				</div>
				<div className='users-list__filters-input'>
					<Input
						id='email'
						element='input'
						type='text'
						validators={[]}
						onInput={inputHandler}
						placeholder='E-mail'
						valid={true}
					/>
				</div>
				<div className='users-list__filters-input'>
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
			<div className='users-list__filters-btn'>
				<Button
					onClick={async () => {
						UsersStore.filters.id = formState.inputs.id.value;
						UsersStore.filters.name = formState.inputs.name.value;
						UsersStore.filters.email = formState.inputs.email.value;
						UsersStore.filters.status = formState.inputs.status.value;
						await UsersStore.fetchUsers(1, UsersStore.filters);
						UsersStore.isFirstPageNeeded = true;
					}}>
					<i className='fas fa-search'></i> Search
				</Button>
			</div>
		</div>
	);
});

const UserItem = ({ id, image, name, surname, email, status }) => {
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
								await UsersStore.deleteUser(id);
								await UsersStore.fetchUsers(1, UsersStore.filters);
								UsersStore.isFirstPageNeeded = true;
							}}>
							Yes
						</button>
					</>
				}>
				<i className='fas fa-lg fa-exclamation-circle'></i>
				<span>Are you sure?</span>
			</Modal>

			<tr>
				<td>
					<img src={`http://localhost:5000/${image}`} alt={name} />
				</td>
				<td>{email}</td>
				<td>
					{name} {surname}
				</td>
				<td>
					<span className={`${status === 'Enabled' ? 'enabled' : 'disabled'}`}>
						{status}
					</span>
				</td>
				<td className='user-item__actions'>
					<Link to={`/user/${id}`}>View</Link>
					<Link to={`/edit-user/${id}`}>Edit</Link>
					<span onClick={showModal}>Delete</span>
				</td>
			</tr>
		</>
	);
};

const UsersListTable = ({ children }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Avatar</th>
					<th>E-mail</th>
					<th>Name</th>
					<th>Status</th>
					<th></th>
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</table>
	);
};

export {
	UsersListHeader,
	UsersListNone,
	UsersListToolBar,
	UsersListFilters,
	UserItem,
	UsersListTable
};
