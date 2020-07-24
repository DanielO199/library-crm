import Login from 'views/Login';
import { RerouteLogged } from 'components/common';

export const homeRoutes = [
	{ path: '/login', name: 'Login', component: RerouteLogged(Login) }
];
