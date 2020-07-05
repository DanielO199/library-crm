import { observable, action, decorate } from 'mobx';

import APIs from 'api';

class UsersStore {
	loading = false;
	isFirstPageNeeded = false;
	usersQuantity = undefined;
	usersList = [];
	user = {};
	filters = {
		id: '',
		email: '',
		name: '',
		status: ''
	};

	fetchUsers(page, params) {
		this.loading = true;
		return APIs.users
			.getUsers(page, params)
			.then((response) => {
				this.usersList = response.results;
				this.usersQuantity = response.length;
			})
			.finally(() => {
				this.loading = false;
			});
	}

	resetFilters() {
		this.filters.id = '';
		this.filters.email = '';
		this.filters.name = '';
		this.filters.status = '';
	}

	fetchUser(id) {
		this.loading = true;
		return APIs.users
			.getUser(id)
			.then((response) => {
				this.user = response.user;
			})
			.finally(() => {
				this.loading = false;
			});
	}

	addUser(data) {
		this.loading = true;
		return APIs.users.addUser(data).finally(() => {
			this.loading = false;
		});
	}

	updateUser(data, id) {
		this.loading = true;
		return APIs.users.updateUser(data, id).finally(() => {
			this.loading = false;
		});
	}

	deleteUser(id) {
		this.isFirstPageNeeded = false;
		return APIs.users.deleteUser(id).finally(() => {
			this.isFirstPageNeeded = true;
		});
	}
}

decorate(UsersStore, {
	loading: observable,
	isFirstPageNeeded: observable,
	usersList: observable,
	usersQuantity: observable,
	user: observable,
	filters: observable,
	fetchUsers: action,
	resetFilters: action,
	fetchUser: action,
	addUser: action,
	updateUser: action,
	deleteUser: action
});

export default new UsersStore();
