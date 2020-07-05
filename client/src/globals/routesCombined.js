import { authRoutes } from './authRoutes';
import { homeRoutes } from './homeRoutes';

export const routes = [...authRoutes, ...homeRoutes];
