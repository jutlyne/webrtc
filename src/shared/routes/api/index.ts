import { NextFunction, Request, Response, Router } from 'express';
import AuthRoute from '@/auth/routes/auth.route';
import BlogRoute from '@/blogs/routes/blog.route';
import { createMultipartUpload } from '@/shared/utils/aws.util';
import CategoryRoute from '@/categories/routes/category.route';

class ApiRoute {
	public router: Router;

	constructor() {
		this.router = Router();
		this.registerRoutes();
	}

	protected registerRoutes(): void {
		this.router.use('/auth', AuthRoute.router);
		this.router.use('/blog', BlogRoute.router);
		this.router.use('/category', CategoryRoute.router);
		this.router.get(
			'/upload',
			async (req: Request, res: Response, next: NextFunction) => {
				const uploadId = await createMultipartUpload({
					Bucket: 'blogs',
					Key: 'blogs',
				});
				return { uploadId };
			},
		);
	}
}

export default new ApiRoute();
