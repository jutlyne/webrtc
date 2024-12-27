import { BaseRoutes } from '@/shared/routes/base.route';
import CategoryController from '../controllers/category.controller';
import { ICategoryController } from '../controllers/category';

class AuthRoute extends BaseRoutes<ICategoryController> {
	constructor() {
		super(CategoryController);
	}

	protected registerRoutes(): void {
		this.router.get('/', this.controller.index);
	}
}

export default new AuthRoute();
