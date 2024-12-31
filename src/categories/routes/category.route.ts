import { BaseRoutes } from '@/shared/routes/base.route';
import CategoryController from '../controllers/category.controller';
import { ICategoryController } from '../controllers/category';
import { validateBody } from '@/shared/utils/validation.util';
import { getSlug } from '@/shared/validators/base.validator';

class AuthRoute extends BaseRoutes<ICategoryController> {
	constructor() {
		super(CategoryController);
	}

	protected registerRoutes(): void {
		this.router.get('/', this.controller.index);
		this.router.get(
			'/:slug',
			validateBody(getSlug(), 'params'),
			this.controller.detail,
		);
	}
}

export default new AuthRoute();
