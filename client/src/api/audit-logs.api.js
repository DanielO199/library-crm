import { request } from './request';

const endpointBasePath = '/logs';

export default class AuditLogsApi {
	getLogs(page) {
		return request(`${endpointBasePath}?page=${page}&limit=10`, {
			method: 'GET'
		});
	}
}
