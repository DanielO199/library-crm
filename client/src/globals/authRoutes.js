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
import { Protected } from 'components/common';

export const authRoutes = [
	{ path: '/home', name: 'Dashboard', component: Protected(Dashboard) },
	{ path: '/audit-logs', name: 'AuditLogs', component: Protected(AuditLogs) },
	{ path: '/books', name: 'BooksList', component: Protected(BooksList) },
	{ path: '/new/book', name: 'NewBook', component: Protected(NewBook) },
	{
		path: '/edit-book/:bookId',
		name: 'BooksList',
		component: Protected(UpdateBook)
	},
	{ path: '/book/:bookId', name: 'Book', component: Protected(Book) },
	{ path: '/users', name: 'UsersList', component: Protected(UsersList) },
	{ path: '/new/user', name: 'NewUser', component: Protected(NewUser) },
	{
		path: '/edit-user/:userId',
		name: 'UpdateUser',
		component: Protected(UpdateUser)
	},
	{ path: '/user/:userId', name: 'User', component: Protected(User) },
	{ path: '/loans', name: 'LoansList', component: Protected(LoansList) },
	{ path: '/new/loan', name: 'NewLoan', component: Protected(NewLoan) },
	{
		path: '/edit-loan/:loanId',
		name: 'UpdateLoan',
		component: Protected(UpdateLoan)
	},
	{ path: '/loan/:loanId', name: 'Loan', component: Protected(Loan) }
];
