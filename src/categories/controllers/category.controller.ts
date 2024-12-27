import { NextFunction, Request, Response } from 'express';
import BaseController from '@/shared/controllers/base.controller';
import { ICategoryService } from '../services/category';
import { apiSuccess } from '@/shared/utils/response.util';
import { trans } from '@/shared/utils/translation.util';
import { ICategoryController } from './category';
import { CategoryService } from '../services/category.service';

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
}

export default new CategoryController();
