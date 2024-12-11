import env from './env.config';
import { createTransport, TransportOptions } from 'nodemailer';

export const transport = createTransport({
	host: env.mail.host,
	port: env.mail.port,
	auth: {
		user: env.mail.user,
		pass: env.mail.pass,
	},
} as TransportOptions);

export const mailInfo = { ...env.mail };
