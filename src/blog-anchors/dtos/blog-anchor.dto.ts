import { Exclude, Expose, Type } from 'class-transformer';
import { BlogAnchorAttributes } from '../interfaces/blog-anchor.interface';
import { BlogDto } from '@/blogs/dtos/blog.dto';

export class BlogAnchorDto implements BlogAnchorAttributes {
	@Expose()
	id!: number;

	@Expose()
	blog_id!: number;

	@Expose()
	parent_id?: number;

	@Expose()
	href!: string;

	@Expose()
	title!: string;

	@Expose()
	@Type(() => BlogDto)
	blog!: BlogDto;

	@Expose()
	@Type(() => BlogAnchorDto)
	children?: BlogAnchorDto[];

	@Expose()
	created_at!: Date;

	@Expose()
	updated_at!: Date;

	@Exclude()
	deleted_at!: Date;
}
