import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { BlogAttributes } from '../interfaces/blog.interface';
import { env } from '@/shared/configs';
import { UserDto } from '@/users/dtos/user.dto';
import { CategoryDto } from '@/categories/dtos/category.dto';
import { BlogAnchorDto } from '@/blog-anchors/dtos/blog-anchor.dto';

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
		if (!value) return null;
		return value && !regexLink.test(value) ? env.app.url + value : value;
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
	@Type(() => BlogAnchorDto)
	anchors!: BlogAnchorDto[];

	@Expose()
	@Type(() => CategoryDto)
	categories!: CategoryDto[];

	@Expose()
	created_at!: Date;

	@Expose()
	updated_at!: Date;

	@Exclude()
	deleted_at!: Date;
}
