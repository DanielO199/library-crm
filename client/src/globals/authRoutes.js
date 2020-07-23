import Dashboard from 'views/Dashboard';
import AuditLogs from 'views/AuditLogs';
import BooksList from 'views/BooksList';
import NewBook from 'views/NewBook';
import UpdateBook from 'views/UpdateBook';
import Book from 'views/Book';
import UsersList from 'views/UsersList';
import NewUser from 'views/NewUser';
import UpdateUser from 'views/UpdateUser';
import User from 'views/User';
import LoansList from 'views/LoansList';
import NewLoan from 'views/NewLoan';
import UpdateLoan from 'views/UpdateLoan';
import Loan from 'views/Loan';

export const authRoutes = [
	{ path: '/home', name: 'Dashboard', component: Dashboard },
	{ path: '/audit-logs', name: 'AuditLogs', component: AuditLogs },
	{ path: '/books', name: 'BooksList', component: BooksList },
	{ path: '/new/book', name: 'NewBook', component: NewBook },
	{ path: '/edit-book/:bookId', name: 'BooksList', component: UpdateBook },
	{ path: '/book/:bookId', name: 'Book', component: Book },
	{ path: '/users', name: 'UsersList', component: UsersList },
	{ path: '/new/user', name: 'NewUser', component: NewUser },
	{ path: '/edit-user/:userId', name: 'UpdateUser', component: UpdateUser },
	{ path: '/user/:userId', name: 'User', component: User },
	{ path: '/loans', name: 'LoansList', component: LoansList },
	{ path: '/new/loan', name: 'NewLoan', component: NewLoan },
	{ path: '/edit-loan/:loanId', name: 'UpdateLoan', component: UpdateLoan },
	{ path: '/loan/:loanId', name: 'Loan', component: Loan }
];
