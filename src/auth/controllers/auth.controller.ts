import { NextFunction, Request, Response } from 'express';
import BaseController from '@/shared/controllers/base.controller';
import { isTrueSet } from '@/shared/utils/string.util';
import { getExpiresIn, sign, verifyToken } from '@/shared/utils/jwt.util';
import { apiSuccess } from '@/shared/utils/response.util';
import { trans } from '@/shared/utils/translation.util';
import { IAuthController } from './auth';
import { IUserService } from '@/users/services/user';
import { env } from '@/shared/configs';
import { UserService } from '@/users/services/user.service';
import moment from 'moment-timezone';

class AuthController
	extends BaseController<IUserService>
	implements IAuthController
{
	constructor() {
		super(new UserService());
	}

	public async login(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { email, password, remember } = req.body;
			const isRemember = isTrueSet(remember);
			const { expiresIn, defaultExpiresInDate } =
				getExpiresIn(isRemember);
			const { refresh_secret, refresh_expires_in } = env.jwt;
			const loggedUser = await this.service.login(email, password);
			const token = sign(loggedUser, `${defaultExpiresInDate}d`);
			const refreshToken = sign(
				loggedUser,
				refresh_expires_in,
				refresh_secret,
			);
			const response = {
				...loggedUser,
				expires: expiresIn,
				access_token: token,
				refreshToken,
			};

			return apiSuccess(res, next, response, trans('success'));
		} catch (error) {
			next(error);
		}
	}

	public async refreshToken(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { refresh_secret } = env.jwt;
			const { refresh_token } = req.body;
			const { id, email, username, avatar, exp } = verifyToken(
				refresh_token,
				refresh_secret,
			);
			const payload = { id, email, username, avatar };

			const currentDate = moment.tz(new Date(), env.timezone).unix();
			const expiresIn = moment
				.tz(Number(exp) * 1000, env.timezone)
				.unix();

			const token = sign(payload, '1d');
			const refreshToken = sign(
				payload,
				expiresIn - currentDate,
				refresh_secret,
			);

			return apiSuccess(
				res,
				next,
				{
					token,
					refresh_token: refreshToken,
				},
				trans('success'),
			);
		} catch (error) {
			next(error);
		}
	}
}

export default new AuthController();
