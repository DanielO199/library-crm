import { request } from './request';

const endpointBasePath = '/admin';

export default class AuthApi {
	login(data) {
		return request(`${endpointBasePath}/login`, {
			method: 'POST',
			data: data
		});
	}
}
