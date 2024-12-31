import { BaseRoutes } from '@/shared/routes/base.route';
import { IBlogController } from '../controllers/blog';
import BlogController from '../controllers/blog.controller';
import { validateBody } from '@/shared/utils/validation.util';
import {
	createBlogSchema,
	getListBlogSchema,
} from '../validators/blog.validator';
import { uploadSingle } from '@/shared/utils/media.util';
import { getSlug } from '@/shared/validators/base.validator';

class BlogRoute extends BaseRoutes<IBlogController> {
	constructor() {
		super(BlogController);
	}

	protected registerRoutes(): void {
		this.router.get(
			'',
			validateBody(getListBlogSchema()),
			this.controller.index,
		);

		this.router.post(
			'',
			uploadSingle('image', 'images/blogs'),
			validateBody(createBlogSchema()),
			this.controller.store,
		);

		this.router.get(
			'/:slug',
			validateBody(getSlug(), 'params'),
			this.controller.detail,
		);
	}
}

export default new BlogRoute();
