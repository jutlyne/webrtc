import { BaseRoutes } from '@/shared/routes/base.route';
import AuthController from '../controllers/auth.controller';
import { IAuthController } from '../controllers/auth';
import { validateBody } from '@/shared/utils/validation.util';
import {
	getLoginSchema,
	getRefreshTokenSchema,
} from '../validators/auth.validator';
import { AuthAttributes } from '@/users/interfaces/user.interface';

class AuthRoute extends BaseRoutes<IAuthController> {
	constructor() {
		super(AuthController);
	}

	protected registerRoutes(): void {
		this.router.post(
			'/login',
			validateBody<AuthAttributes>(getLoginSchema()),
			this.controller.login,
		);

		this.router.post(
			'/refresh',
			validateBody<{
				refresh_token: string;
			}>(getRefreshTokenSchema()),
			this.controller.refreshToken,
		);

		this.router.get('/profile', this.controller.getProfile);
	}
}

export default new AuthRoute();
