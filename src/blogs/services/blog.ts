import { IBaseService } from '@/shared/services/base';
import { Blog } from '../entities/blog.entity';
import {
	BlogAttributes,
	BlogCondtionsInterface,
} from '../interfaces/blog.interface';

export interface IBlogService extends IBaseService<Blog> {
	createBlog(body: BlogAttributes): Promise<Blog>;
	getListBlogs(conditions: BlogCondtionsInterface): Promise<Blog[]>;
}
