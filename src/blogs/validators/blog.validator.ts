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

export const createBlogSchema = (
	isRequired = true,
): ValidationSchemaInterface<BlogAttributes> => {
	return {
		rules: Joi.object({
			title: Joi.string().max(200).required().label('Title'),
			read_minutes: Joi.number()
				.integer()
				.min(0)
				.max(60)
				.when('$isRequired', {
					is: true,
					then: Joi.required(),
					otherwise: Joi.optional(),
				})
				.label('Read Minutes'),
			body: Joi.string()
				.when('$isRequired', {
					is: true,
					then: Joi.required(),
					otherwise: Joi.optional(),
				})
				.label('Body'),
			image: Joi.alternatives()
				.try(Joi.string().uri(), Joi.object())
				.optional()
				.label('Image'),
			short_text: Joi.string()
				.max(200)
				.when('$isRequired', {
					is: true,
					then: Joi.required(),
					otherwise: Joi.optional(),
				})
				.label('Short Text'),
			categories: Joi.array()
				.items(
					Joi.number()
						.integer()
						.when('$isRequired', {
							is: true,
							then: Joi.required(),
							otherwise: Joi.optional(),
						})
						.label('Tag ID'),
				)
				.when('$isRequired', {
					is: true,
					then: Joi.required(),
					otherwise: Joi.optional(),
				})
				.label('Categories'),
			anchors: Joi.array()
				.items(
					Joi.object({
						title: Joi.string()
							.max(255)
							.when('$isRequired', {
								is: true,
								then: Joi.required(),
								otherwise: Joi.optional(),
							})
							.label('Anchor Title'),
						href: Joi.string()
							.pattern(/^#[a-zA-Z0-9_-]+$/, {
								name: 'slug starting with #',
							})
							.when('$isRequired', {
								is: true,
								then: Joi.required(),
								otherwise: Joi.optional(),
							})
							.label('Anchor Href'),
						children: Joi.array()
							.items(
								Joi.object({
									title: Joi.string()
										.max(255)
										.when('$isRequired', {
											is: true,
											then: Joi.required(),
											otherwise: Joi.optional(),
										})
										.label('Child Title'),
									href: Joi.string()
										.pattern(/^#[a-zA-Z0-9_-]+$/, {
											name: 'slug starting with #',
										})
										.when('$isRequired', {
											is: true,
											then: Joi.required(),
											otherwise: Joi.optional(),
										})
										.label('Anchor Href'),
								}),
							)
							.optional()
							.label('Anchor Children'),
					}),
				)
				.when('$isRequired', {
					is: true,
					then: Joi.required(),
					otherwise: Joi.optional(),
				})
				.label('Anchors'),
		}),
		messages: {
			'any.required': 'required',
		},
	};
};
