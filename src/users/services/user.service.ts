import DataSource from '@/database/datasource';
import { UserDto } from '../dtos/user.dto';
import { BaseService } from '@/shared/services/base.service';
import { User } from '../entities/user.entity';
import { UserPayload } from '../interfaces/user.interface';
import { AppError } from '@/shared/utils/errror.util';
import { trans } from '@/shared/utils/translation.util';
import { HttpStatusCode } from 'axios';
import { compareHash } from '@/shared/utils/encryption.util';

export class UserService extends BaseService<User> {
	constructor() {
		const userRepository = DataSource.getRepository(User);
		super(userRepository, UserDto);
	}

	public async login(
		email: string,
		password: string,
		expiresIn: number,
	): Promise<UserPayload> {
		const user = await this.findOne({ email });

		if (!user) {
			throw new AppError(
				trans('email.mismatch', {}, 'errors'),
				HttpStatusCode.Forbidden,
			);
		}

		const isMatch = compareHash(password, user.password);

		if (!isMatch) {
			throw new AppError(
				trans('password.invalid', {}, 'errors'),
				HttpStatusCode.Forbidden,
			);
		}

		if (!user.status) {
			throw new AppError(
				trans('status.inactive', {}, 'errors'),
				HttpStatusCode.Forbidden,
			);
		}

		return {
			id: user.id,
			email: user.email,
			username: user.username,
			avatar: user.avatar,
			expires: expiresIn,
		};
	}
}
