import { Expose, Transform } from 'class-transformer';
import { BlogAttributes } from '../interfaces/blog.interface';
import { env } from '@/shared/configs';
import { UserDto } from '@/users/dtos/user.dto';
import { BlogAnchor } from '@/blog-anchors/entities/blog-anchor.entity';
import { Category } from '@/categories/entities/category.entity';

export class BlogDto implements BlogAttributes {
	@Expose()
	id!: number;

	@Expose()
	user_id!: number;

	@Expose()
	title!: string;

	@Expose()
	@Transform(({ obj }) => obj.slug || obj.title) // Fallback nếu slug không tồn tại
	slug!: string;

	@Expose()
	short_text!: string;

	@Expose()
	read_minutes!: number;

	@Expose()
	@Transform(({ value }) => {
		const regexLink = /^https?:\/\//i;
		return regexLink.test(value) ? value : env.app.url + value;
	})
	image!: string;

	@Expose()
	body!: string;

	@Expose()
	is_displayed!: boolean;

	@Expose()
	order!: number;

	@Expose()
	user!: UserDto;

	@Expose()
	anchors!: BlogAnchor[];

	@Expose()
	categories!: Category[];

	@Expose()
	created_at!: Date;

	@Expose()
	updated_at!: Date;

	@Expose()
	deleted_at!: Date;
}
