import { Blog } from '@/blogs/entities/blog.entity';
import { BaseEntities } from '@/shared/entities/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { generateIdFromText } from '@/shared/utils/string.util';

@Entity('categories')
export class Category extends BaseEntities {
	@Column({ type: 'varchar', length: 255, nullable: false })
	name!: string;

	@Column({
		type: 'varchar',
		length: 255,
		nullable: false,
		transformer: {
			to: function (value: string) {
				return generateIdFromText(value);
			},
			from: function (value: string) {
				return value;
			},
		},
	})
	slug!: string;

	@Column({ type: 'text', nullable: true })
	description?: string;

	@ManyToMany(() => Blog, (blog) => blog.categories, { onDelete: 'CASCADE' })
	blogs?: Blog[];
}
