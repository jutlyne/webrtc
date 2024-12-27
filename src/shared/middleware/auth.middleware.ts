import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { env } from '@shared/configs';
import { AppError } from '@utils/errror.util';
import { trans } from '@utils/translation.util';
import { HttpStatusCode } from 'axios';
import { AuthPayload } from '@/auth/interfaces/auth.interface';

const { secret } = env.jwt;

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (isUnauthenticatePath(req.path) || isPublicPath(req.path, req.method)) {
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
		const decodedToken = jwt.verify(token, secret) as AuthPayload;
		res.locals.user = decodedToken;
		next();
	} catch (error) {
		next(error);
	}
};

const isUnauthenticatePath = (path: string): boolean => {
	const authRoutePrefixes = ['/auth'];
	const isPathInvalidForAuth = authRoutePrefixes.some((prefix) =>
		path.startsWith(prefix),
	);

	return isPathInvalidForAuth;
};

const isPublicPath = (path: string, method: string): boolean => {
	return (
		method == 'GET' &&
		['/blog', '/category'].some((prefix) => path.startsWith(prefix))
	);
};
