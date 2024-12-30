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

export const redis = redisInstance;

export default connectRedisServer;
