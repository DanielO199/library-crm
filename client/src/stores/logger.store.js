import { observable, action, decorate, toJS } from 'mobx';

class LoggerStore {
	logs = [];

	addLog(message, status) {
		const newIndex = toJS(this.logs).length;
		const logToPush = {
			id: newIndex,
			message: message,
			status: status,
			show: true,
			created_at: Date.now()
		};
		this.logs.push(logToPush);
		this.startTimeoutToHideLoggerWindow(newIndex);
	}

	successLog(message) {
		this.addLog(message, 'Success');
	}

	errorLog(message) {
		this.addLog(message, 'Error');
	}

	closeLoggerWindow(index) {
		this.logs = toJS(this.logs).map((log) => {
			if (log.id === index) {
				log.show = false;
			}
			return log;
		});
	}

	startTimeoutToHideLoggerWindow(index) {
		const timer = setTimeout(() => {
			this.closeLoggerWindow(index);
			clearTimeout(timer);
		}, 4000);
	}
}

decorate(LoggerStore, {
	logs: observable,
	addLog: action,
	successLog: action,
	errorLog: action,
	closeLoggerWindow: action,
	startTimeoutToHideLoggerWindow: action
});

export default new LoggerStore();
