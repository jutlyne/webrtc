import Joi from 'joi';
import { ValidationSchemaInterface } from '@/shared/interfaces/validation.interface';

export const getSlug = (): ValidationSchemaInterface<{
	slug: string;
}> => {
	return {
		rules: Joi.object<{ slug: string }>({
			slug: Joi.string()
				.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
				.required(),
		}),
		messages: {
			'any.required': 'required',
		},
	};
};

export const getId = (): ValidationSchemaInterface<{
	id: number;
}> => {
	return {
		rules: Joi.object<{ id: number }>({
			id: Joi.number().required(),
		}),
		messages: {
			'any.required': 'required',
		},
	};
};
