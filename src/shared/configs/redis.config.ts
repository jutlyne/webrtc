import Redis from 'ioredis';
import { env } from '.';

let redisInstance: Redis | null = null;

export const connectRedisServer = () => {
	if (!redisInstance) {
		redisInstance = new Redis({
			host: env.redis.host,
			port: env.redis.port,
		});

		redisInstance.on('error', (err) => {
			console.error('Redis Client Error:', err);
		});
	}

	// Duplicate clients only if necessary
	const pubClient = redisInstance.duplicate();
	const subClient = redisInstance.duplicate();

	return {
		pubClient,
		subClient,
	};
};

export const redisCacheInstance = () => {
	let redisCacheInstance: Redis | null = null;

	if (
		env.redis.host === env.redis_cache.host &&
		env.redis.port === env.redis_cache.port
	) {
		redisCacheInstance = redisInstance;
	} else {
		redisCacheInstance = new Redis({
			host: env.redis_cache.host,
			port: env.redis_cache.port,
		});
	}

	setInterval(function () {
		redisCacheInstance?.ping(console.log);
	}, 1000);

	return redisCacheInstance;
};

export const redis = redisInstance;

export default connectRedisServer;
