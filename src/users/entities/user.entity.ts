import { BaseEntities } from '@/shared/entities/base.entity';
import { transformerPassword } from '@/shared/utils/encryption.util';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { UserAttributes } from '../interfaces/user.interface';
import { Blog } from '@/blogs/entities/blog.entity';

@Entity('users')
export class User extends BaseEntities implements UserAttributes {
	@Column({ type: 'varchar' })
	username!: string;

	@Column({ type: 'varchar' })
	email!: string;

	@Column({
		type: 'varchar',
		transformer: transformerPassword,
		nullable: false,
	})
	@Exclude()
	password!: string;

	@Column({ type: 'varchar', nullable: true })
	avatar!: string;

	@Column({ type: 'int' })
	status!: number;

	@OneToMany(() => Blog, (blog) => blog.user, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
	blogs?: Blog[];
}
