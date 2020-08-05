import React from 'react';
import Loadable from 'react-loadable';

import { Protected } from 'components/common';

function Loading() {
	return <div>Loading...</div>;
}

const Dashboard = Loadable({
	loader: () => import('views/Dashboard'),
	loading: Loading
});

const AuditLogs = Loadable({
	loader: () => import('views/AuditLogs'),
	loading: Loading
});

const BooksList = Loadable({
	loader: () => import('views/BooksList'),
	loading: Loading
});

const NewBook = Loadable({
	loader: () => import('views/NewBook'),
	loading: Loading
});

const UpdateBook = Loadable({
	loader: () => import('views/UpdateBook'),
	loading: Loading
});

const Book = Loadable({
	loader: () => import('views/Book'),
	loading: Loading
});

const UsersList = Loadable({
	loader: () => import('views/UsersList'),
	loading: Loading
});

const NewUser = Loadable({
	loader: () => import('views/NewUser'),
	loading: Loading
});

const UpdateUser = Loadable({
	loader: () => import('views/UpdateUser'),
	loading: Loading
});

const User = Loadable({
	loader: () => import('views/User'),
	loading: Loading
});

const LoansList = Loadable({
	loader: () => import('views/LoansList'),
	loading: Loading
});

const NewLoan = Loadable({
	loader: () => import('views/NewLoan'),
	loading: Loading
});

const UpdateLoan = Loadable({
	loader: () => import('views/UpdateLoan'),
	loading: Loading
});

const Loan = Loadable({
	loader: () => import('views/Loan'),
	loading: Loading
});

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
