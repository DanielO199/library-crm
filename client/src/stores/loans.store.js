import { observable, action, decorate } from 'mobx';

import APIs from 'api';

class LoansStore {
	loading = false;
	isFirstPageNeeded = false;
	loansQuantity = undefined;
	loansList = [];
	books = [];
	users = [];
	loan = {};
	filters = {
		id: '',
		user: '',
		book: '',
		status: ''
	};

	fetchLoans(page, params) {
		this.loading = true;
		return APIs.loans
			.getLoans(page, params)
			.then((response) => {
				this.loansList = response.results;
				this.loansQuantity = response.length;
			})
			.finally(() => {
				this.loading = false;
			});
	}

	resetFilters() {
		this.filters.id = '';
		this.filters.user = '';
		this.filters.book = '';
		this.filters.status = '';
	}

	fetchLoan(id) {
		this.loading = true;
		return APIs.loans
			.getLoans(id)
			.then((response) => {
				this.loan = response.loan;
			})
			.finally(() => {
				this.loading = false;
			});
	}

	addLoan(data) {
		this.loading = true;
		return APIs.loans.addLoan(data).finally(() => {
			this.loading = false;
		});
	}

	updateLoan(data, id) {
		this.loading = true;
		return APIs.loans.updateLoan(data, id).finally(() => {
			this.loading = false;
		});
	}

	deleteLoan(id) {
		this.isFirstPageNeeded = false;
		return APIs.loans.deleteLoan(id).finally(() => {
			this.isFirstPageNeeded = true;
		});
	}

	fetchBooks() {
		this.loading = true;
		return APIs.loans
			.getBooks()
			.then((response) => {
				for (const result in response.results) {
					this.books.push({
						value: `${response.results[result].id}`,
						label: `${response.results[result].isbn} - ${response.results[result].title}`
					});
				}
			})
			.finally(() => {
				this.loading = false;
			});
	}

	fetchUsers() {
		this.loading = true;
		return APIs.loans
			.getUsers()
			.then((response) => {
				for (const result in response.results) {
					this.users.push({
						value: `${response.results[result].id}`,
						label: `${response.results[result].name} ${response.results[result].surname} - ${response.results[result].email}`
					});
				}
			})
			.finally(() => {
				this.loading = false;
			});
	}
}

decorate(LoansStore, {
	loading: observable,
	isFirstPageNeeded: observable,
	loansList: observable,
	books: observable.ref,
	users: observable.ref,
	loansQuantity: observable,
	loan: observable,
	filters: observable,
	fetchLoans: action,
	resetFilters: action,
	fetchLoan: action,
	addLoan: action,
	updateLoan: action,
	deleteLoan: action,
	fetchBooks: action,
	fetchUsers: action
});

export default new LoansStore();
