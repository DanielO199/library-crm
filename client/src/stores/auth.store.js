import { observable, action, decorate, reaction } from 'mobx';
import APIs from 'api';

class AuthStore {
	loading = false;
	token = undefined;
	admin = {};

	constructor() {
		reaction(
			() => this.token,
			(token) => {
				if (token) {
					window.localStorage.setItem('accessToken', token);
				} else {
					window.localStorage.removeItem('accessToken');
				}
			}
		);
	}

	login(data) {
		this.loading = true;
		return APIs.auth
			.login(data)
			.then((response) => {
				this.token = response.token;
				this.admin.id = response.adminId;
			})
			.finally(() => {
				this.loading = false;
			});
	}

	logout() {
		this.token = null;
		localStorage.removeItem('accessToken');
	}
}

decorate(AuthStore, {
	loading: observable,
	token: observable,
	user: observable,
	alert: observable,
	login: action,
	logout: action
});

export default new AuthStore();
