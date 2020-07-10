import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { BooksStore } from 'stores';
import { Button, Input, Modal } from 'components/common';
import { useForm } from 'utils';

const BooksListHeader = () => {
	return <h1 className='books-list__header'>Books</h1>;
};

const BooksListNone = () => {
	return <h2 className='books-list__none'>No books</h2>;
};

const BooksListToolBar = () => {
	return (
		<div className='books-list__tools'>
			<Link to='/new/book'>
				<Button>
					<i className='fas fa-plus'></i>New
				</Button>
			</Link>
			<Button inverse>Export to Excel</Button>
		</div>
	);
};

const BooksListFilters = observer(() => {
	const [formState, inputHandler] = useForm(
		{
			isbn: { value: '', isValid: false },
			author: { value: '', isValid: false },
			title: { value: '', isValid: false },
			status: { value: '', isValid: false }
		},
		false
	);

	return (
		<div className='books-list__filters'>
			<div className='books-list__filters-inputs'>
				<div className='books-list__filters-input'>
					<Input
						id='isbn'
						element='input'
						type='text'
						validators={[]}
						onInput={inputHandler}
						placeholder='ISBN'
						valid={true}
					/>
				</div>
				<div className='books-list__filters-input'>
					<Input
						id='title'
						element='input'
						type='text'
						validators={[]}
						onInput={inputHandler}
						placeholder='Title'
						valid={true}
					/>
				</div>
				<div className='books-list__filters-input'>
					<Input
						id='author'
						element='input'
						type='text'
						validators={[]}
						onInput={inputHandler}
						placeholder='Author'
						valid={true}
					/>
				</div>
				<div className='books-list__filters-input'>
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
			<div className='books-list__filters-btns'>
				<div className='books-list__filters-btn'>
					<Button
						onClick={async () => {
							BooksStore.filters.isbn = formState.inputs.isbn.value;
							BooksStore.filters.title = formState.inputs.title.value;
							BooksStore.filters.author = formState.inputs.author.value;
							BooksStore.filters.status = formState.inputs.status.value;
							await BooksStore.fetchBooks(1, BooksStore.filters);
							BooksStore.isFirstPageNeeded = true;
						}}>
						<i className='fas fa-search'></i> Search
					</Button>
				</div>
				<div className='books-list__filters-btn'>
					<Button
						inverse
						onClick={async () => {
							await BooksStore.fetchBooks();
							BooksStore.resetFilters();
						}}>
						Reset
					</Button>
				</div>
			</div>
		</div>
	);
});

const BookItem = ({ id, image, title, isbn, author, status }) => {
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
								await BooksStore.deleteBook(id);
								await BooksStore.fetchBooks(1, BooksStore.filters);
								BooksStore.isFirstPageNeeded = true;
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
					<img src={`http://localhost:5000/${image}`} alt={title} />
				</td>
				<td>{title}</td>
				<td>{isbn}</td>
				<td>{author}</td>
				<td>
					<span
						className={`${
							status === 'Available' ? 'available' : 'unavailable'
						}`}>
						{status}
					</span>
				</td>
				<td className='book-item__actions'>
					<Link to={`/book/${id}`}>View</Link>
					<Link to={`/edit-book/${id}`}>Edit</Link>
					<span onClick={showModal}>Delete</span>
				</td>
			</tr>
		</>
	);
};

const BooksListTable = ({ children }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Image</th>
					<th>Title</th>
					<th>ISBN</th>
					<th>Author</th>
					<th>Status</th>
					<th></th>
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</table>
	);
};

export {
	BooksListHeader,
	BooksListNone,
	BooksListToolBar,
	BooksListFilters,
	BookItem,
	BooksListTable
};
