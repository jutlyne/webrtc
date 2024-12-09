import Joi from 'joi';

export interface ValidationSchemaInterface<T> {
	rules: Joi.ObjectSchema<T>;
	messages: {
		[key: string]: string;
	};
}
