import jwt, {
	JsonWebTokenError,
	NotBeforeError,
	TokenExpiredError,
} from 'jsonwebtoken';
import { env } from '../configs';
import { AuthPayload } from '@/auth/interfaces/auth.interface';
import { AppError } from './errror.util';
import { trans } from './translation.util';
import { HttpStatusCode } from 'axios';

const { expires_in, secret: initSecret } = env.jwt;

export const sign = (
	data: string | Buffer | object,
	expiresIn: number | string,
	secret = initSecret,
): string => {
	return jwt.sign(data, secret, { expiresIn });
};

export const getExpiresIn = (remember = false) => {
	const currentDate = new Date();
	let defaultExpiresInDate = expires_in;
	if (remember) {
		defaultExpiresInDate = 30;
	}

	currentDate.setDate(currentDate.getDate() + defaultExpiresInDate);
	return {
		expiresIn: Math.floor(currentDate.getTime() / 1000),
		defaultExpiresInDate,
	};
};

export const verifyToken = (token: string, secret: string): AuthPayload => {
	try {
		return jwt.verify(token, secret) as AuthPayload;
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			throw new AppError(
				trans('token.expired', {}, 'errors'),
				HttpStatusCode.Unauthorized,
			);
		}
		if (error instanceof JsonWebTokenError) {
			throw new AppError(
				trans('token.invalid', {}, 'errors'),
				HttpStatusCode.BadRequest,
			);
		}
		if (error instanceof NotBeforeError) {
			throw new AppError(
				trans('token.not_active', {}, 'errors'),
				HttpStatusCode.BadRequest,
			);
		}

		throw new AppError(
			trans('token.unknown', {}, 'errors'),
			HttpStatusCode.BadRequest,
		);
	}
};
