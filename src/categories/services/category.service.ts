import DataSource from '@/database/datasource';
import { BaseService } from '@/shared/services/base.service';
import { Category } from '@/categories/entities/category.entity';
import { ICategoryService } from './category';
import { trans } from '@/shared/utils/translation.util';
import { HttpStatusCode } from 'axios';
import { AppError } from '@/shared/utils/errror.util';
import { Blog } from '@/blogs/entities/blog.entity';
import { BlogDto } from '@/blogs/dtos/blog.dto';
import { plainObject } from '@/shared/dto';

export class CategoryService
	extends BaseService<Category>
	implements ICategoryService
{
	constructor() {
		const categoryRepository = DataSource.getRepository(Category);
		super(categoryRepository, Category);
	}

	public async getDetail(slug: string, limit: number): Promise<Category> {
		const category = await this.findOne({
			slug,
		});

		if (!category) {
			throw new AppError(
				trans('not_found', {}, 'errors'),
				HttpStatusCode.Forbidden,
			);
		}

		const blogRepository = DataSource.getRepository(Blog);

		category.blogs = await blogRepository
			.createQueryBuilder('blogs')
			.innerJoinAndSelect('blogs.categories', 'category')
			.select(['blogs.id', 'blogs.title', 'blogs.image'])
			.where('category.id = :id', { id: category.id })
			.orderBy('blogs.id', 'DESC')
			.take(limit)
			.getMany();

		category.blogs = category.blogs.map((blog) =>
			plainObject(BlogDto, blog),
		);

		return category;
	}
}
