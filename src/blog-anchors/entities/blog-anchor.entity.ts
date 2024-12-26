import { Blog } from '@/blogs/entities/blog.entity';
import { BaseEntities } from '@/shared/entities/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BlogAnchorAttributes } from '../interfaces/blog-anchor.interface';

@Entity('blog_anchors')
export class BlogAnchor extends BaseEntities implements BlogAnchorAttributes {
	@Column({ type: 'int', nullable: false })
	blog_id!: number;

	@Column({ type: 'int', nullable: true })
	parent_id?: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
	href!: string;

	@Column({ type: 'varchar', length: 255, nullable: false })
	title!: string;

	@ManyToOne(() => Blog, (blog) => blog.id, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'blog_id' })
	blog!: Blog;
}
