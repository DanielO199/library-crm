import { request } from './request';

const endpointBasePath = '/books';

export default class BooksApi {
	getBooks(page, params) {
		return request(`${endpointBasePath}?page=${page}&limit=5`, {
			method: 'GET',
			query: params
		});
	}

	getBook(id) {
		return request(`${endpointBasePath}/${id}`, {
			method: 'GET'
		});
	}

	addBook(data) {
		return request(`${endpointBasePath}`, {
			method: 'POST',
			data: data
		});
	}

	updateBook(params, id) {
		return request(`${endpointBasePath}/${id}`, {
			method: 'PATCH',
			data: params
		});
	}

	deleteBook(id) {
		return request(`${endpointBasePath}/${id}`, {
			method: 'DELETE'
		});
	}
}
