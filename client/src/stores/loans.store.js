import { observable, action, decorate } from 'mobx';

import APIs from 'api';

class LoansStore {
	loading = false;
	isFirstPageNeeded = false;
	loansQuantity = undefined;
	loansList = [];
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
}

decorate(LoansStore, {
	loading: observable,
	isFirstPageNeeded: observable,
	loansList: observable,
	loansQuantity: observable,
	loan: observable,
	filters: observable,
	fetchLoans: action,
	resetFilters: action,
	fetchLoan: action,
	addLoan: action,
	updateLoan: action,
	deleteLoan: action
});

export default new LoansStore();
