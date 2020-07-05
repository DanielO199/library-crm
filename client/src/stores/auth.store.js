import { observable, action, decorate, reaction } from 'mobx';
import APIs from 'api';

class AuthStore {
	loading = true;
	token = 'dsf';
	admin = {
		id: '',
		email: ''
	};
	alert = '';

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
		return APIs.auth
			.login(data)
			.then((response) => {
				this.token = response.token;
				this.admin.id = response.adminId;
				this.admin.email = response.email;
			})
			.catch((err) => {
				this.alert = err.message;
			})
			.finally(() => {
				this.loading = false;
			});
	}

	logout() {
		this.token = null;
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
