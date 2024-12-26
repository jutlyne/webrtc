import { BlogAnchor } from '@/blog-anchors/entities/blog-anchor.entity';
import { Category } from '@/categories/entities/category.entity';
import { User } from '@/users/entities/user.entity';

export interface BlogAttributes {
	title: string;
	slug: string;
	short_text: string;
	read_minutes: number;
	image: string;
	body: string;
	is_displayed: boolean;
	order: number;
	user: User;
	blog_anchors: BlogAnchor[];
	categories: Category[];
	created_at: Date;
	updated_at: Date;
	deleted_at?: Date;
}
