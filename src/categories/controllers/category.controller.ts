import { NextFunction, Request, Response } from 'express';
import BaseController from '@/shared/controllers/base.controller';
import { ICategoryService } from '../services/category';
import { apiSuccess } from '@/shared/utils/response.util';
import { trans } from '@/shared/utils/translation.util';
import { ICategoryController } from './category';
import { CategoryService } from '../services/category.service';
import { maxPageSize } from '@/shared/constants/common.constant';

class CategoryController
	extends BaseController<ICategoryService>
	implements ICategoryController
{
	constructor() {
		super(new CategoryService());
	}

	public async index(req: Request, res: Response, next: NextFunction) {
		try {
			const categories = await this.service.all({});
			return apiSuccess(res, next, categories, trans('success'));
		} catch (error) {
			next(error);
		}
	}

	public async detail(req: Request, res: Response, next: NextFunction) {
		try {
			const { slug } = req.params;
			const limit = Number(req.query.limit) || maxPageSize;
			const category = await this.service.getDetail(slug, limit);
			return apiSuccess(res, next, category, trans('success'));
		} catch (error) {
			next(error);
		}
	}
}

export default new CategoryController();
