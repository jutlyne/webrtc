import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { env } from '@shared/configs';
import { AppError } from '@utils/errror.util';
import { trans } from '@utils/translation.util';
import { HttpStatusCode } from 'axios';
import { AuthorizationType } from '@/shared/constants/common.constant';

const { scret } = env.jwt;

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (isUnauthenticatePath(req.path)) {
		return next();
	}

	const token = req.headers.authorization?.split(' ')[1];
	if (!token) {
		throw new AppError(
			trans('auth.unauthorized', {}, 'errors'),
			HttpStatusCode.Unauthorized,
		);
	}
	try {
		const decodedToken = jwt.verify(token, scret) as any;

		if (isUnauthorizedPath(decodedToken.authorization_type, req.path)) {
			throw new AppError(
				trans('auth.unauthorized', {}, 'errors'),
				HttpStatusCode.Unauthorized,
			);
		}
		res.locals.user = decodedToken;
		next();
	} catch (error) {
		next(error);
	}
};

const isUnauthorizedPath = (
	authorizationType: number,
	path: string,
): boolean => {
	return (
		(authorizationType !== AuthorizationType.Admin &&
			path.startsWith('/admin')) ||
		(authorizationType !== AuthorizationType.User &&
			path.startsWith('/user'))
	);
};

const isUnauthenticatePath = (path: string): boolean => {
	const privateRoutePrefixes = ['/admin', '/user'];
	const authRoutePrefixes = ['/admin/auth', '/user/auth'];

	const isPathPrivate = privateRoutePrefixes.some((prefix) =>
		path.startsWith(prefix),
	);
	const isPathInvalidForAuth = authRoutePrefixes.some((prefix) =>
		path.startsWith(prefix),
	);

	return !isPathPrivate || isPathInvalidForAuth;
};
