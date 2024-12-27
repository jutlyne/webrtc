import { BlogAnchor } from '@/blog-anchors/entities/blog-anchor.entity';
import { Category } from '@/categories/entities/category.entity';
import { User } from '@/users/entities/user.entity';

export interface BlogAttributes {
	user_id: number;
	title: string;
	slug: string;
	short_text: string;
	read_minutes: number;
	image: string;
	body: string;
	is_displayed: boolean;
	order: number;
	user: User;
	anchors: BlogAnchor[];
	categories: Category[];
	created_at: Date;
	updated_at: Date;
	deleted_at?: Date;
}

export interface BlogCondtionsInterface {
	limit: number;
	skip: number;
	tag: string;
}
