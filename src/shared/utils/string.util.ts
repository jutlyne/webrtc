export const removeQuotes = (str: string) => str.replace(/['"]+/g, '');

export const generateRandom = (length: number, chars?: string): string => {
	const randomChars =
		chars ??
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += randomChars.charAt(
			Math.floor(Math.random() * randomChars.length),
		);
	}
	return result;
};

export const isTrueSet = (boolString: string): boolean => {
	return boolString?.toLowerCase?.() === 'true';
};

export const removeVietnameseTones = (str: string) => {
	str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');
	return str;
};

export const generateIdFromText = (text: string) => {
	return removeVietnameseTones(text)
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
};
