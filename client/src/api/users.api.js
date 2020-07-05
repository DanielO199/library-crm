import { request } from './request';

const endpointBasePath = '/users';

export default class UsersApi {
	getUsers(page, params) {
		return request(`${endpointBasePath}?page=${page}&limit=5`, {
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

	updateUser(params, id) {
		return request(`${endpointBasePath}/${id}`, {
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
