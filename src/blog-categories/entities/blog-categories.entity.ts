import { BaseEntities } from '@/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('blog_categories')
export class BlogCategory extends BaseEntities {
	@Column({ type: 'int', nullable: false })
	blog_id!: number;

	@Column({ type: 'int', nullable: false })
	category_id!: number;
}
