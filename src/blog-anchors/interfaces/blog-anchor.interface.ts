import { Blog } from '@/blogs/entities/blog.entity';

export interface BlogAnchorAttributes {
	id: number;
	blog_id: number;
	parent_id?: number;
	href: string;
	title: string;
	blog: Blog;
	created_at: Date;
	updated_at: Date;
	deleted_at?: Date;
}
