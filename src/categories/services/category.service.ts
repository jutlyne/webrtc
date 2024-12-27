import DataSource from '@/database/datasource';
import { BaseService } from '@/shared/services/base.service';
import { Category } from '@/categories/entities/category.entity';
import { ICategoryService } from './category';

export class CategoryService
	extends BaseService<Category>
	implements ICategoryService
{
	constructor() {
		const categoryRepository = DataSource.getRepository(Category);
		super(categoryRepository, Category);
	}
}
