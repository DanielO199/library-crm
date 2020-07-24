import React from 'react';

import { Button } from 'components/common';

const AuditLogsHeader = () => {
	return <h1 className='audit-logs__header'>Audit logs</h1>;
};

const AuditLogsNone = () => {
	return <h2 className='audit-logs__none'>No audit logs</h2>;
};

const AuditLogsToolBar = () => {
	return (
		<div className='audit-logs__tools'>
			<Button inverse>Export to Excel</Button>
		</div>
	);
};

const AuditLogItem = ({ id, createdAt, entity, action }) => {
	return (
		<tr>
			<td>{createdAt}</td>
			<td>{entity}</td>
			<td>{action}</td>
			<td>{id}</td>
		</tr>
	);
};

const AuditLogsTable = ({ children }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Date</th>
					<th>Entity</th>
					<th>Action</th>
					<th>Action ID</th>
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</table>
	);
};

export {
	AuditLogsHeader,
	AuditLogsNone,
	AuditLogsToolBar,
	AuditLogItem,
	AuditLogsTable
};
