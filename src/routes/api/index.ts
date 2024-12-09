import { Router } from 'express';

class ApiRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
		this.registerRoutes();
	}

	protected registerRoutes(): void {}
}

export default new ApiRoutes();
