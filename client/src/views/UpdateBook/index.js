import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import { BooksStore } from 'stores';
import { Loader } from 'components/common';
import { BookUpdateHeader, BookUpdateForm } from './components';

const UpdateBook = observer(() => {
	const bookId = useParams().bookId;

	const { loading, book } = BooksStore;

	useEffect(() => {
		BooksStore.fetchBook(bookId);
	}, [bookId]);

	return (
		<div className='update-book'>
			<BookUpdateHeader />
			{loading && <Loader />}
			{!loading && book && <BookUpdateForm id={bookId} />}
		</div>
	);
});

export default UpdateBook;
