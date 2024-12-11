import { Router } from 'express';
import AuthRoutes from '@/auth/routes/auth.routes';

class ApiRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
		this.registerRoutes();
	}

	protected registerRoutes(): void {
		this.router.use('/auth', AuthRoutes.router);
	}
}

export default new ApiRoutes();
