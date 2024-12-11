import env from './env.config';
import { corsOptions } from './cors.config';
import header from './header.config';
import logger from './logger.config';
import i18nConfig from './i18n.config';
import setupSocketServer from './socket.config';
import connectRedisServer from './redis.config';

export {
	env,
	header,
	logger,
	corsOptions,
	i18nConfig,
	setupSocketServer,
	connectRedisServer,
};
