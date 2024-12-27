import { BlogDto } from '@/blogs/dtos/blog.dto';

export interface CategoryAttributes {
	name: string;
	slug: string;
	description?: string;
	blogs?: BlogDto[];
	created_at: Date;
	updated_at: Date;
	deleted_at?: Date;
}
