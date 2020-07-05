import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { BooksStore } from 'stores';
import { Pagination, Loader } from 'components/common';
import {
	BookListHeader,
	BooksListNone,
	BookListToolBar,
	BookListFilters,
	BooksListTable,
	BookItem
} from './components';

const BooksList = observer(() => {
	const {
		loading,
		booksList,
		booksQuantity,
		filters,
		isFirstPageNeeded
	} = BooksStore;

	useEffect(() => {
		BooksStore.fetchBooks();
		BooksStore.resetFilters();
	}, []);

	return (
		<>
			<div className='books-list'>
				<BookListHeader />
				<BookListToolBar />
				<BookListFilters />
				{loading && <Loader />}
				{!loading && booksList && (
					<BooksListTable>
						{booksList.map((book) => (
							<BookItem
								key={book.id}
								id={book.id}
								image={book.image}
								title={book.title}
								isbn={book.isbn}
								author={book.author}
								status={book.status}
							/>
						))}
					</BooksListTable>
				)}
				{booksQuantity ? (
					<Pagination
						numberOfArticles={booksQuantity}
						params={filters}
						fetchArticles={(page, params) =>
							BooksStore.fetchBooks(page, params)
						}
						isFirstPageNeeded={isFirstPageNeeded}
					/>
				) : null}
				{booksQuantity === 0 && <BooksListNone />}
			</div>
		</>
	);
});

export default BooksList;
