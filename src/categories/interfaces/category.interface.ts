import { Blog } from '@/blogs/entities/blog.entity';

export interface CategoryAttributes {
	name: string;
	slug: string;
	description?: string;
	blogs?: Blog[];
	created_at: Date;
	updated_at: Date;
	deleted_at?: Date;
}
