import Joi from 'joi';
import { AuthAttributes } from '@/users/interfaces/user.interface';
import { ValidationSchemaInterface } from '@/shared/interfaces/validation.interface';

export const getLoginSchema = (): ValidationSchemaInterface<AuthAttributes> => {
	return {
		rules: Joi.object<AuthAttributes>({
			email: Joi.string().required().email().label('Email').messages({}),
			password: Joi.string().required().label('Password').messages({}),
			remember: Joi.boolean().label('Remember me'),
		}),
		messages: {
			'any.required': 'required',
		},
	};
};

export const getRefreshTokenSchema = (): ValidationSchemaInterface<{
	refresh_token: string;
}> => {
	return {
		rules: Joi.object<{
			refresh_token: string;
		}>({
			refresh_token: Joi.string()
				.required()
				.label('Refresh Token')
				.messages({}),
		}),
		messages: {
			'any.required': 'required',
		},
	};
};
