import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';
import { removeQuotes } from './string.util';
import { AppError } from '../utils/errror.util';
import { TransOptions, isMessageDefined, trans } from './translation.util';
import { ValidationSchemaInterface } from '../interfaces/validation.interface';

interface ValidationErrorItem {
	message: string;
	path: Array<string | number>;
	type: string;
	context?: Context;
}

interface Context {
	[key: string]: any;
	key?: string;
	label?: string;
	value?: any;
}

const namespace = 'validation';

const getMessage = (
	key: string,
	defaultValue?: string,
	options?: TransOptions,
): string => {
	if (isMessageDefined(key, namespace)) {
		return trans(key, options, namespace);
	}

	return defaultValue ?? key;
};

const transValidate = (errDetail: ValidationErrorItem): string => {
	const errorMessage = removeQuotes(errDetail.message);
	const label = getMessage(errDetail.context?.label as string);

	return getMessage(errorMessage, errorMessage, {
		...errDetail.context,
		label,
	});
};

export function validateBody<T>(
	validationSchema: ValidationSchemaInterface<T>,
	type?: 'body' | 'params' | 'query',
) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			let dataToValidate = req.query;
			const { rules, messages } = validationSchema;
			if (req.method == 'POST' || req.method == 'PUT') {
				dataToValidate = req.body;
			}

			if (type) {
				dataToValidate = req[type];
			}

			const { error } = rules.validate(dataToValidate, {
				messages,
				abortEarly: true,
			});

			if (error) {
				throw new AppError(
					transValidate(error.details[0]),
					HttpStatusCode.BadRequest,
				);
			}

			return next();
		} catch (error) {
			next(error);
		}
	};
}

export async function validateAsync<T>(
	validationSchema: ValidationSchemaInterface<T>,
	type?: 'body' | 'params' | 'query',
) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			let dataToValidate = req.query;
			const { rules, messages } = validationSchema;
			if (req.method == 'POST' || req.method == 'PUT') {
				dataToValidate = req.body;
			}

			if (type) {
				dataToValidate = req[type];
			}

			await rules.validateAsync(dataToValidate, {
				messages,
				abortEarly: true,
			});

			return next();
		} catch (error: any) {
			handleValidationError(error, next);
		}
	};
}

function handleValidationError(error: any, next: NextFunction) {
	try {
		const errorMessage = transValidate(error.details[0]);
		throw new AppError(errorMessage, HttpStatusCode.BadRequest);
	} catch (err) {
		next(err);
	}
}
