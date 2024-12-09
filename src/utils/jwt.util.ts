import jwt from 'jsonwebtoken';
import { env } from '@/configs';

const { expires_in, scret } = env.jwt;

export const sign = (
	data: string | Buffer | object,
	expiresIn: number,
): string => {
	return jwt.sign(data, scret, { expiresIn });
};

export const getExpiresIn = (remember = false) => {
	const currentDate = new Date();
	let defaultExpiresInDate = expires_in;
	if (remember) {
		defaultExpiresInDate = 30;
	}

	currentDate.setDate(currentDate.getDate() + defaultExpiresInDate);
	return Math.floor(currentDate.getTime() / 1000);
};
