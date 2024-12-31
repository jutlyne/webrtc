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
import { AppError } from '@/shared/utils/errror.util';
import { HttpStatusCode } from 'axios';
import { trans } from '@/shared/utils/translation.util';
import { plainObject } from '@/shared/dto';

export class BlogService extends BaseService<Blog> implements IBlogService {
	protected categoryRepository: Repository<Category>;

	constructor() {
		const blogRepository = DataSource.getRepository(Blog);
		super(blogRepository, BlogDto);
		this.categoryRepository = DataSource.getRepository(Category);
	}

	public async getListBlogs(conditions: BlogCondtionsInterface): Promise<{
		blogs: Blog[];
		total: number;
	}> {
		const total = await this.repository.count();
		const blogQuery = this.repository
			.createQueryBuilder('blog')
			.leftJoinAndSelect('blog.categories', 'category');

		if (conditions.tag) {
			blogQuery.where('category.id = :id', { id: conditions.tag });
		}

		const blogs = await blogQuery
			.skip(conditions.skip)
			.take(conditions.limit)
			.getMany();

		return {
			blogs: plainObject(this.dto, blogs) as unknown as Blog[],
			total,
		};
	}

	public async createBlog(body: BlogAttributes): Promise<Blog | undefined> {
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

	public async getDetail(slug: string): Promise<Blog | null> {
		const blog = await this.repository
			.createQueryBuilder('blog')
			.leftJoinAndSelect('blog.categories', 'category')
			.leftJoinAndSelect('blog.anchors', 'anchor')
			.leftJoinAndSelect('anchor.children', 'child')
			.where({
				slug,
				is_displayed: true,
			})
			.andWhere('anchor.parent_id IS NULL')
			.getOne();

		if (!blog) {
			throw new AppError(
				trans('not_found', {}, 'errors'),
				HttpStatusCode.Forbidden,
			);
		}
		return plainObject(this.dto, blog);
	}
}
