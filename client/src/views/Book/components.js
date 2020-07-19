import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { BooksStore } from 'stores';
import { Button, Modal } from 'components/common';

const BookHeader = () => {
	return <h1 className='books-header'>View Book</h1>;
};

const BookToolBar = ({ bookId }) => {
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
								await BooksStore.deleteBook(bookId);
								history.push('/books');
							}}>
							Yes
						</button>
					</>
				}>
				<i className='fas fa-lg fa-exclamation-circle'></i>
				<span>Are you sure?</span>
			</Modal>

			<div className='book-tools'>
				<Link to={`/edit-book/${bookId}`}>
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

const BookData = () => {
	const {
		id,
		isbn,
		title,
		author,
		loansQuantity,
		image,
		status,
		createdAt
	} = BooksStore.book;
	return (
		<div className='book-data'>
			<div className='book-data__labels'>
				<div className='book-data__label'>Id</div>
				<div className='book-data__label'>ISBN</div>
				<div className='book-data__label'>Title</div>
				<div className='book-data__label'>Author</div>
				<div className='book-data__label'>Loans</div>
				<div className='book-data__label content-item__image'>Image</div>
				<div className='book-data__label'>Status</div>
				<div className='book-data__label'>Created at</div>
			</div>
			<div className='book-data__content'>
				<div className='book-data__content-item'> {id}</div>
				<div className='book-data__content-item'> {isbn}</div>
				<div className='book-data__content-item'> {title}</div>
				<div className='book-data__content-item'> {author}</div>
				<div className='book-data__content-item'> {loansQuantity}</div>
				<div className='book-data__content-item content-item__image'>
					<img src={`http://localhost:5000/${image}`} alt={title} />
				</div>
				<div className='book-data__content-item'>{status}</div>
				<div className='book-data__content-item'>{createdAt}</div>
			</div>
		</div>
	);
};

export { BookHeader, BookToolBar, BookData };
