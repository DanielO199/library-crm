import AuthApi from './auth.api';
import UsersApi from './users.api';
import BooksApi from './books.api';
import LoansApi from './loans.api';
import DashboardApi from './dashboard.api';
import AuditLogsApi from './audit-logs.api';

const APIs = {
	auth: new AuthApi(),
	users: new UsersApi(),
	books: new BooksApi(),
	loans: new LoansApi(),
	dashboard: new DashboardApi(),
	auditLogs: new AuditLogsApi()
};

export default APIs;
