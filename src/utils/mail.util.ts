import { transport, mailInfo } from '../configs/mail.config';

export const sendMail = async (
	toUsers: string,
	subject: string,
	text?: string,
	html?: string,
) => {
	const info = await transport.sendMail({
		from: mailInfo.from,
		to: toUsers,
		subject,
		text,
		html,
	});

	return info;
};
