import { observable, action, decorate } from 'mobx';

import APIs from 'api';

class DashboardStore {
	loading = false;
	usersQuantity = undefined;
	booksQuantity = undefined;
	loansQuantity = undefined;
	mostActiveUsers = [];
	loans = [];

	fetchQuantity() {
		this.loading = true;
		return APIs.dashboard
			.getQuantity()
			.then((response) => {
				this.usersQuantity = response.usersQuantity;
				this.booksQuantity = response.booksQuantity;
				this.loansQuantity = response.loansQuantity;
			})
			.finally(() => {
				this.loading = false;
			});
	}

	fetchLoans() {
		this.loading = true;
		return APIs.dashboard
			.getLoans()
			.then((response) => {
				console.log(response);
				this.loans = response.borrowsInMonthObj;
			})
			.finally(() => {
				this.loading = false;
			});
	}

	fetchMostActiveUsers() {
		this.loading = true;
		return APIs.dashboard
			.getMostActiveUsers()
			.then((response) => {
				this.mostActiveUsers = response.mostActiveUsers;
			})
			.finally(() => {
				this.loading = false;
			});
	}
}

decorate(DashboardStore, {
	loading: observable,
	usersQuantity: observable,
	booksQuantity: observable,
	loansQuantity: observable,
	mostActiveUsers: observable,
	loans: observable,
	fetchQuantity: action,
	fetchLoans: action,
	fetchMostActiveUsers: action
});

export default new DashboardStore();
