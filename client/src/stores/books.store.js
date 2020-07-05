import { observable, action, decorate } from 'mobx';

import APIs from 'api';

class BooksStore {
	loading = false;
	isFirstPageNeeded = false;
	booksQuantity = undefined;
	booksList = [];
	book = {};
	filters = {
		isbn: '',
		author: '',
		title: '',
		status: ''
	};

	fetchBooks(page, params) {
		this.loading = true;
		return APIs.books
			.getBooks(page, params)
			.then((response) => {
				this.booksList = response.results;
				this.booksQuantity = response.length;
			})
			.finally(() => {
				this.loading = false;
			});
	}

	resetFilters() {
		this.filters.isbn = '';
		this.filters.title = '';
		this.filters.author = '';
		this.filters.status = '';
	}

	fetchBook(id) {
		this.loading = true;
		return APIs.books
			.getBook(id)
			.then((response) => {
				this.book = response.book;
			})
			.finally(() => {
				this.loading = false;
			});
	}

	addBook(data) {
		this.loading = true;
		return APIs.books.addBook(data).finally(() => {
			this.loading = false;
		});
	}

	updateBook(data, id) {
		this.loading = true;
		return APIs.books.updateBook(data, id).finally(() => {
			this.loading = false;
		});
	}

	deleteBook(id) {
		this.isFirstPageNeeded = false;
		return APIs.books.deleteBook(id).finally(() => {
			this.isFirstPageNeeded = true;
		});
	}
}

decorate(BooksStore, {
	loading: observable,
	isFirstPageNeeded: observable,
	booksList: observable,
	booksQuantity: observable,
	book: observable,
	filters: observable,
	fetchBooks: action,
	resetFilters: action,
	fetchBook: action,
	addBook: action,
	updateBook: action,
	deleteBook: action
});

export default new BooksStore();
