import AuthApi from './auth.api';
import UsersApi from './users.api';
import BooksApi from './books.api';
import LoansApi from './loans.api';

const APIs = {
	auth: new AuthApi(),
	users: new UsersApi(),
	books: new BooksApi(),
	loans: new LoansApi()
};

export default APIs;
