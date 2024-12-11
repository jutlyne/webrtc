import { t as lang, exists } from 'i18next';

export interface TransOptions {
	[key: string]: string | undefined;
}

export const isMessageDefined = (
	key: string,
	namespace: string = 'translation',
): boolean => {
	return exists(key, {
		ns: namespace,
	});
};

export const trans = (
	key: string,
	options?: TransOptions,
	namespace: string = 'translation',
): string => {
	if (isMessageDefined(key, namespace)) {
		return lang(key, {
			...options,
			ns: namespace,
		});
	}

	return options?.defaultValue ?? key;
};
