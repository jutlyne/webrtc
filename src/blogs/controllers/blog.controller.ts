import { NextFunction, Request, Response } from 'express';
import BaseController from '@/shared/controllers/base.controller';
import { IBlogService } from '../services/blog';
import { IBlogController } from './blog';
import { BlogService } from '../services/blog.service';
import { BlogCondtionsInterface } from '../interfaces/blog.interface';
import { apiSuccess } from '@/shared/utils/response.util';
import { trans } from '@/shared/utils/translation.util';

class BlogController
	extends BaseController<IBlogService>
	implements IBlogController
{
	constructor() {
		super(new BlogService());
	}

	public async index(req: Request, res: Response, next: NextFunction) {
		try {
			const { limit, skip, tag } = req.query;
			const conditions = {
				limit: Number(limit),
				skip: Number(skip),
				tag,
			} as BlogCondtionsInterface;
			const blogs = await this.service.getListBlogs(conditions);
			return apiSuccess(res, next, blogs, trans('success'));
		} catch (error) {
			next(error);
		}
	}

	public async store(req: Request, res: Response, next: NextFunction) {
		try {
			const body = {
				...req.body,
				user_id: res.locals.user.id,
				image: req.file?.filename,
			};

			await this.service.createBlog(body);
			return apiSuccess(res, next, [], trans('success'));
		} catch (error) {
			next(error);
		}
	}
}

export default new BlogController();
