import Redis from 'ioredis';
import { env } from '.';

let pubClient: Redis | null = null;
let subClient: Redis | null = null;

const connectRedisServer = () => {
	if (!pubClient || !subClient) {
		pubClient = new Redis({
			port: env.redis.port,
			host: env.redis.host,
		});
		subClient = pubClient.duplicate();
		pubClient.on('error', (err) => {
			console.error('Redis Pub Client Error:', err);
			process.exit(1);
		});

		subClient.on('error', (err) => {
			console.error('Redis Sub Client Error:', err);
			process.exit(1);
		});
	}

	return {
		pubClient,
		subClient,
	};
};

export const redis = new Redis({ host: env.redis.host, port: env.redis.port });

export default connectRedisServer;
