import { UserPayload } from '../interfaces/user.interface';

export interface IUserService {
	login(email: string, password: string): Promise<UserPayload>;
}
