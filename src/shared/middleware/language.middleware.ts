import { CallbackError } from 'i18next';
import { i18nConfig, logger } from '../configs';
import { NextFunction, Request, Response } from 'express';
import { AcceptLanguage } from '@/shared/constants/common.constant';

class LanguageMiddleware {
	static async handle(req: Request, res: Response, next: NextFunction) {
		const headerLng = req.headers['accept-language'];
		const preloadLanguage: string[] = Object.values(AcceptLanguage);
		const lng =
			headerLng && preloadLanguage.includes(headerLng) ? headerLng : 'vi';

		if (lng) {
			i18nConfig.changeLanguage(lng, (err: CallbackError) => {
				if (err) {
					logger.error(err);
				}
			});
		}

		next();
	}
}

export default LanguageMiddleware;
