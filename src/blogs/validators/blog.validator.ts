import Joi from 'joi';
import { ValidationSchemaInterface } from '@/shared/interfaces/validation.interface';
import {
	BlogAttributes,
	BlogCondtionsInterface,
} from '../interfaces/blog.interface';

export const getListBlogSchema =
	(): ValidationSchemaInterface<BlogCondtionsInterface> => {
		return {
			rules: Joi.object<BlogCondtionsInterface>({
				limit: Joi.string().required().label('Limit').messages({}),
				skip: Joi.string().required().label('Skip').messages({}),
				tag: Joi.string().label('Tag'),
			}),
			messages: {
				'any.required': 'required',
			},
		};
	};

export const createBlogSchema =
	(): ValidationSchemaInterface<BlogAttributes> => {
		return {
			rules: Joi.object({
				title: Joi.string().max(200).required().label('Title'),
				read_minutes: Joi.number()
					.integer()
					.min(0)
					.max(60)
					.required()
					.label('Read Minutes'),
				body: Joi.string().required().label('Body'),
				image: Joi.alternatives()
					.try(Joi.string().uri(), Joi.object())
					.optional()
					.label('Image'),
				short_text: Joi.string()
					.max(200)
					.required()
					.label('Short Text'),
				categories: Joi.array()
					.items(Joi.number().integer().required().label('Tag ID'))
					.required()
					.label('Categories'),
				anchors: Joi.array()
					.items(
						Joi.object({
							title: Joi.string()
								.max(255)
								.required()
								.label('Anchor Title'),
							href: Joi.string()
								.pattern(/^#[a-zA-Z0-9_-]+$/, {
									name: 'slug starting with #',
								})
								.required()
								.label('Anchor Href'),
							children: Joi.array()
								.items(
									Joi.object({
										title: Joi.string()
											.max(255)
											.required()
											.label('Child Title'),
										href: Joi.string()
											.pattern(/^#[a-zA-Z0-9_-]+$/, {
												name: 'slug starting with #',
											})
											.required()
											.label('Anchor Href'),
									}),
								)
								.optional()
								.label('Anchor Children'),
						}),
					)
					.required()
					.label('Anchors'),
			}),
			messages: {
				'any.required': 'required',
			},
		};
	};
