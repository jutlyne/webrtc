import { env } from '@/shared/configs';
import { Expose, Transform } from 'class-transformer';
import { UserAttributes } from '../interfaces/user.interface';

export class UserDto implements UserAttributes {
	@Expose()
	id!: number;

	@Expose()
	username!: string;

	@Expose()
	email!: string;

	password!: string;

	@Expose()
	@Transform(({ value }) => {
		if (!value) return;

		const regexLink = /^https?:\/\//i;
		return regexLink.test(value) ? value : env.app.url + value;
	})
	avatar!: string;

	@Expose()
	status!: number;

	@Expose()
	created_at!: Date;

	@Expose()
	updated_at!: Date;

	@Expose()
	deleted_at!: Date;
}
