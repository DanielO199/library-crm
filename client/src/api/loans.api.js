import { request } from './request';

const endpointBasePath = '/users';

export default class UsersApi {
	getUsers(params = {}) {
		return request(`${endpointBasePath}`, {
			method: 'GET',
			query: params
		});
	}

	getUser(id) {
		return request(`${endpointBasePath}/${id}`, {
			method: 'GET'
		});
	}

	addUser(data) {
		return request(`${endpointBasePath}`, {
			method: 'POST',
			data: data
		});
	}

	updateUser(params = {}) {
		console.log(params);
		return request(`${endpointBasePath}/${params['id']}`, {
			method: 'PATCH',
			data: params
		});
	}

	deleteUser(id) {
		return request(`${endpointBasePath}/${id}`, {
			method: 'DELETE'
		});
	}
}
