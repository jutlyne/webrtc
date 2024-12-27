import DataSource from '@/database/datasource';
import { BaseService } from '@/shared/services/base.service';
import { Blog } from '../entities/blog.entity';
import { IBlogService } from './blog';
import { BlogDto } from '../dtos/blog.dto';
import {
	BlogAttributes,
	BlogCondtionsInterface,
} from '../interfaces/blog.interface';
import { In, Repository } from 'typeorm';
import { Category } from '@/categories/entities/category.entity';
import { BlogAnchor } from '@/blog-anchors/entities/blog-anchor.entity';

export class BlogService extends BaseService<Blog> implements IBlogService {
	protected categoryRepository: Repository<Category>;

	constructor() {
		const blogRepository = DataSource.getRepository(Blog);
		super(blogRepository, BlogDto);
		this.categoryRepository = DataSource.getRepository(Category);
	}

	public getListBlogs(conditions: BlogCondtionsInterface): Promise<Blog[]> {
		return this.repository.find({
			skip: conditions.skip,
			take: conditions.limit,
		});
	}

	public async createBlog(body: BlogAttributes): Promise<any> {
		const queryRunner = DataSource.createQueryRunner();
		await queryRunner.connect();

		const categories = await this.categoryRepository.find({
			where: {
				id: In([body.categories]),
			},
		});

		await queryRunner.startTransaction();

		try {
			const blogRepository = queryRunner.manager.getRepository(Blog);
			const anchorRepository =
				queryRunner.manager.getRepository(BlogAnchor);
			const blogData = blogRepository.create({
				...body,
				categories,
			});
			const blog = await blogRepository.save(blogData);

			for (const anchor of body.anchors) {
				const parentData = anchorRepository.create({
					title: anchor.title,
					href: anchor.href,
					blog_id: blog.id,
				});

				const parent = await anchorRepository.save(parentData);

				if (!anchor.children) continue;

				for (const children of anchor.children) {
					const childrenData = anchorRepository.create({
						title: children.title,
						href: children.href,
						blog_id: blog.id,
						parent_id: parent.id,
					});
					await anchorRepository.save(childrenData);
				}
			}

			await queryRunner.commitTransaction();
			return blog;
		} catch (error) {
			await queryRunner.rollbackTransaction();
		} finally {
			await queryRunner.release();
		}
	}
}
