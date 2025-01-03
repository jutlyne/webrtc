import { IBaseService } from '@/shared/services/base';
import { Blog } from '../entities/blog.entity';
import {
	BlogAttributes,
	BlogCondtionsInterface,
} from '../interfaces/blog.interface';

export interface IBlogService extends IBaseService<Blog> {
	createBlog(body: BlogAttributes): Promise<Blog | undefined>;
	getListBlogs(conditions: BlogCondtionsInterface): Promise<{
		blogs: Blog[];
		total: number;
	}>;
	getDetail(slug: string): Promise<Blog | null>;
	updateBlog(blogId: number, body: BlogAttributes): Promise<Blog | undefined>;
}
