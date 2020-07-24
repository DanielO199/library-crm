import { observable, action, decorate } from 'mobx';
import APIs from 'api';

class AuditLogs {
	loading = false;
	logsQuantity = undefined;
	logs = [];

	fetchLogs(page) {
		this.loading = true;
		return APIs.auditLogs
			.getLogs(page)
			.then((response) => {
				this.logs = response.results;
				this.logsQuantity = response.length;
			})
			.finally(() => {
				this.loading = false;
			});
	}
}

decorate(AuditLogs, {
	loading: observable,
	logsQuantity: observable,
	logs: observable,
	fetchLogs: action
});

export default new AuditLogs();
