import path from 'path';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import { LanguageDetector } from 'i18next-http-middleware';
import { AcceptLanguage } from '@/shared/constants/common.constant';

const preloadLanguage: string[] = Object.values(AcceptLanguage);

i18next
	.use(Backend)
	.use(LanguageDetector)
	.init({
		fallbackLng: 'vi',
		backend: {
			loadPath: path.join(
				__dirname,
				'../shared/locales/{{lng}}/{{ns}}.json',
			),
		},
		detection: {
			order: ['querystring', 'cookie'],
			caches: ['cookie'],
		},
		preload: preloadLanguage,
		ns: ['validation', 'translation', 'errors'],
		defaultNS: 'translation',
	});

export default i18next;
