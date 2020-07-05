import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import { BooksStore } from 'stores';
import { Loader } from 'components/common';
import { BookHeader, BookToolBar, BookData } from './components';

const Book = observer(() => {
	const bookId = useParams().bookId;
	const { loading, book } = BooksStore;

	useEffect(() => {
		BooksStore.fetchBook(bookId);
	}, [bookId]);

	return (
		<div className='book'>
			<BookHeader />
			<BookToolBar bookId={bookId} />
			{loading && <Loader />}
			{!loading && book && <BookData />}
		</div>
	);
});

export default Book;
