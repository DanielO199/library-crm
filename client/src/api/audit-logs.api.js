import { request } from './request';

const endpointBasePath = '/dashboard';

export default class AuditLogsApi {
	getLogs(page) {
		return request(`${endpointBasePath}/logs/?page=${page}&limit=10`, {
			method: 'GET'
		});
	}
}
