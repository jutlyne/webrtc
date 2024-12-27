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
	protected anchorRepository: Repository<BlogAnchor>;

	constructor() {
		const blogRepository = DataSource.getRepository(Blog);
		super(blogRepository, BlogDto);
		this.categoryRepository = DataSource.getRepository(Category);
		this.anchorRepository = DataSource.getRepository(BlogAnchor);
	}

	public getListBlogs(conditions: BlogCondtionsInterface): Promise<Blog[]> {
		return this.repository.find({
			skip: conditions.skip,
			take: conditions.limit,
		});
	}

	public async createBlog(body: BlogAttributes): Promise<Blog> {
		const categories = await this.categoryRepository.find({
			where: {
				id: In([body.categories]),
			},
		});

		const blog = await this.create({
			...body,
			categories,
		});

		for (const anchor of body.anchors) {
			const parentData = this.anchorRepository.create({
				title: anchor.title,
				blog_id: blog.id,
			});

			const parent = await this.anchorRepository.save(parentData);

			if (!anchor.children) continue;

			for (const children of anchor.children) {
				const childrenData = this.anchorRepository.create({
					title: children.title,
					blog_id: blog.id,
					parent_id: parent.id,
				});
				await this.anchorRepository.save(childrenData);
			}
		}

		return blog;
	}
}
