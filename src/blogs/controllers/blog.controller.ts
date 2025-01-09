import { NextFunction, Request, Response } from 'express';
import BaseController from '@/shared/controllers/base.controller';
import { IBlogService } from '../services/blog';
import { IBlogController } from './blog';
import { BlogService } from '../services/blog.service';
import { BlogCondtionsInterface } from '../interfaces/blog.interface';
import { apiSuccess } from '@/shared/utils/response.util';
import { trans } from '@/shared/utils/translation.util';
import { generateIdFromText } from '@/shared/utils/string.util';

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
				slug: req.body.title,
				user_id: res.locals.user.id,
				image: req.file?.filename,
			};

			await this.service.createBlog(body);
			return apiSuccess(res, next, [], trans('success'));
		} catch (error) {
			next(error);
		}
	}

	public async detail(req: Request, res: Response, next: NextFunction) {
		try {
			const { slug } = req.params;
			const blog = await this.service.getDetail(slug);

			return apiSuccess(res, next, blog, trans('success'));
		} catch (error) {
			next(error);
		}
	}

	public async update(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const body = {
				...req.body,
				user_id: res.locals.user.id,
			};

			if (req.body.title) {
				body.slug = generateIdFromText(req.body.title);
			}

			if (req.file?.filename) {
				body.image = req.file.filename;
			}

			const updatedBlog = await this.service.updateBlog(Number(id), body);

			return apiSuccess(res, next, updatedBlog, trans('success'));
		} catch (error) {
			next(error);
		}
	}

	public async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;
			const result = await this.service.delete({ id: Number(id) });

			return apiSuccess(res, next, result, trans('success'));
		} catch (error) {
			next(error);
		}
	}
}

export default new BlogController();
