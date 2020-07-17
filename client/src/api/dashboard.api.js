import { request } from './request';

const endpointBasePath = '/dashboard';

export default class DashboardApi {
	getQuantity() {
		return request(`${endpointBasePath}/quantity`, {
			method: 'GET'
		});
	}

	getLoans() {
		return request(`${endpointBasePath}/loans`, {
			method: 'GET'
		});
	}

	getMostActiveUsersAndBooks() {
		return request(`${endpointBasePath}`, {
			method: 'GET'
		});
	}
}
