import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { AuditLogsStore } from 'stores';
import { Pagination, Loader } from 'components/common';
import {
	AuditLogsHeader,
	AuditLogsNone,
	AuditLogsToolBar,
	AuditLogItem,
	AuditLogsTable
} from './components';

const AuditLogs = observer(() => {
	const { loading, logs, logsQuantity } = AuditLogsStore;

	useEffect(() => {
		AuditLogsStore.fetchLogs();
	}, []);
	//TODO ADD SCSS TO LOGS AND CREATE CONTROLLER IN API
	return (
		<>
			<div className='audit-logs'>
				<AuditLogsHeader />
				<AuditLogsToolBar />
				{loading && <Loader />}
				{!loading && logs && (
					<AuditLogsTable>
						{logs.map((log) => (
							<AuditLogItem
								key={log._id}
								id={log._id}
								date={log.date}
								entity={log.entity}
								action={log.action}
							/>
						))}
					</AuditLogsTable>
				)}
				{logsQuantity ? (
					<Pagination
						numberOfArticles={logsQuantity}
						articlesPerPage={10}
						fetchArticles={(page) => AuditLogsStore.fetchLogs(page)}
					/>
				) : null}
				{logsQuantity === 0 && <AuditLogsNone />}
			</div>
		</>
	);
});

export default AuditLogs;
