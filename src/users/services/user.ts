import { IBaseService } from '@/shared/services/base';
import { User } from '../entities/user.entity';
import { UserPayload } from '../interfaces/user.interface';

export interface IUserService extends IBaseService<User> {
	login(email: string, password: string): Promise<UserPayload>;
}
