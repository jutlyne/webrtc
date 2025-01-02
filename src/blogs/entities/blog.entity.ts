import { BlogAnchor } from '@/blog-anchors/entities/blog-anchor.entity';
import { Category } from '@/categories/entities/category.entity';
import { BaseEntities } from '@/shared/entities/base.entity';
import { User } from '@/users/entities/user.entity';
import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { BlogAttributes } from '../interfaces/blog.interface';
import { generateIdFromText } from '@/shared/utils/string.util';

@Entity('blogs')
export class Blog extends BaseEntities implements BlogAttributes {
	@Column({ type: 'int', nullable: false })
	user_id!: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
	title!: string;

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

	@Column({ type: 'varchar', length: 255, nullable: false })
	short_text!: string;

	@Column({ type: 'int', nullable: false })
	read_minutes!: number;

	@Column({ type: 'varchar', length: 255, nullable: false })
	image!: string;

	@Column({ type: 'longtext', nullable: false })
	body!: string;

	@Column({ type: 'boolean', default: true })
	is_displayed!: boolean;

	@Column({ type: 'int', default: 0 })
	order!: number;

	@ManyToOne(() => User, (user) => user.blogs)
	@JoinColumn({ name: 'user_id' })
	user!: User;

	@OneToMany(() => BlogAnchor, (blogAnchor) => blogAnchor.blog)
	@JoinColumn({ name: 'blog_id' })
	anchors!: BlogAnchor[];

	@ManyToMany(() => Category)
	@JoinTable({
		name: 'blog_categories',
		joinColumn: {
			name: 'blog_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'category_id',
			referencedColumnName: 'id',
		},
	})
	categories!: Category[];
}
