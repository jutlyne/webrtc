import { BaseRoutes } from '@/shared/routes/base.routes';
import { UserService } from '@/users/services/user.service';
import AuthController from '../controllers/auth.controller';

class AuthRoutes extends BaseRoutes<AuthController> {
	constructor() {
		super(new AuthController(new UserService()));
	}

	protected registerRoutes(): void {
		this.router.post('/login', this.controller.login);
	}
}

export default new AuthRoutes();
