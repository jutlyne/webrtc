import { BaseRoutes } from '@/shared/routes/base.routes';
import { UserService } from '@/users/services/user.service';
import AuthController from '../controllers/auth.controller';
import { IAuthController } from '../controllers/auth';

class AuthRoutes extends BaseRoutes<IAuthController> {
	constructor() {
		super(new AuthController(new UserService()));
	}

	protected registerRoutes(): void {
		this.router.post('/login', this.controller.login);
	}
}

export default new AuthRoutes();
