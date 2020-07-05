import Dashboard from 'views/Dashboard';
import UsersList from 'views/UsersList';
import BooksList from 'views/BooksList';
import NewBook from 'views/NewBook';
import UpdateBook from 'views/UpdateBook';
import Book from 'views/Book';

export const authRoutes = [
	{ path: '/home', name: 'Dashboard', component: Dashboard },
	{ path: '/users', name: 'UsersList', component: UsersList },
	{ path: '/books', name: 'BooksList', component: BooksList },
	{ path: '/new/book', name: 'NewBook', component: NewBook },
	{ path: '/book/:bookId', name: 'BooksList', component: Book },
	{ path: '/edit-book/:bookId', name: 'BooksList', component: UpdateBook }
];
