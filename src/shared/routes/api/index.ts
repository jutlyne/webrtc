import { Router } from 'express';
import AuthRoute from '@/auth/routes/auth.route';

class ApiRoute {
	public router: Router;

	constructor() {
		this.router = Router();
		this.registerRoutes();
	}

	protected registerRoutes(): void {
		this.router.use('/auth', AuthRoute.router);
	}
}

export default new ApiRoute();
