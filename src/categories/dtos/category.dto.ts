import { Expose } from 'class-transformer';
import { CategoryAttributes } from '../interfaces/category.interface';
import { BlogDto } from '@/blogs/dtos/blog.dto';

export class CategoryDto implements CategoryAttributes {
	@Expose()
	id!: number;

	@Expose()
	name!: string;

	@Expose()
	slug!: string;

	@Expose()
	description?: string;

	@Expose()
	blogs?: BlogDto[];

	@Expose()
	created_at!: Date;

	@Expose()
	updated_at!: Date;

	@Expose()
	deleted_at!: Date;
}
