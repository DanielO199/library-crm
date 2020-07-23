import { observable, action, decorate } from 'mobx';
import APIs from 'api';

class AuditLogs {
	loading = false;
	logs = [];

	fetchLogs(page) {
		this.loading = true;
		return APIs.auditLogs
			.getLogs(page)
			.then((response) => {
				console.log(response);
			})
			.finally(() => {
				this.loading = false;
			});
	}
}

decorate(AuditLogs, {
	loading: observable,
	logs: observable,
	fetchLogs: action
});

export default new AuditLogs();
