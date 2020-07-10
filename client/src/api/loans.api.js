import { request } from './request';

const endpointBasePath = '/loans';

export default class LoansApi {
	getLoans(page, params) {
		return request(`${endpointBasePath}?page=${page}&limit=10`, {
			method: 'GET',
			query: params
		});
	}

	getLoan(id) {
		return request(`${endpointBasePath}/${id}`, {
			method: 'GET'
		});
	}

	addLoan(data) {
		return request(`${endpointBasePath}`, {
			method: 'POST',
			data: data
		});
	}

	updateLoan(params, id) {
		return request(`${endpointBasePath}/${id}`, {
			method: 'PATCH',
			data: params
		});
	}

	deleteLoan(id) {
		return request(`${endpointBasePath}/${id}`, {
			method: 'DELETE'
		});
	}

	getBooks() {
		return request(`/books?status=Available`, {
			method: 'GET'
		});
	}

	getUsers() {
		return request(`/users`, {
			method: 'GET'
		});
	}
}
