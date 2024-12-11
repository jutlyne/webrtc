import { NextFunction, Request, Response } from 'express';
import BaseController from '@/shared/controllers/base.controller';
import { ControllerDecorator } from '@/shared/decorators/controller.decorator';
import { UserPayload } from '@/users/interfaces/user.interface';
import { isTrueSet } from '@/shared/utils/string.util';
import { getExpiresIn, sign } from '@/shared/utils/jwt.util';
import { apiSuccess } from '@/shared/utils/response.util';
import { trans } from '@/shared/utils/translation.util';
import { IAuthController } from './auth';
import { IUserService } from '@/users/services/user';

export default class AuthController
	extends BaseController<IUserService>
	implements IAuthController
{
	public constructor(service: IUserService) {
		super(service);
	}

	@ControllerDecorator
	public async login(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			let loggedUser: UserPayload | null = null;
			const { email, password, remember } = req.body;
			const isRemember = isTrueSet(remember);
			const expiresIn = getExpiresIn(isRemember);

			loggedUser = await this.service.login(email, password, expiresIn);

			const token = sign(loggedUser, expiresIn);
			const response = {
				...loggedUser,
				access_token: token,
			};

			return apiSuccess(res, next, response, trans('success'));
		} catch (error) {
			next(error);
		}
	}
}
