import { Application, NextFunction, Request, Response } from 'express';
import apiRoutes from './api';
import { authMiddleware } from '@/middleware/auth.middleware';

const routes = (server: Application): void => {
	server.use('/api', authMiddleware, apiRoutes.router);
	server.all('/health', (req: Request, res: Response, next: NextFunction) => {
		return res.status(200).json('ok');
	});
};

export default routes;
