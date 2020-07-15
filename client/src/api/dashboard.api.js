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

	getMostActiveUsers() {
		return request(`${endpointBasePath}/users`, {
			method: 'GET'
		});
	}
}
