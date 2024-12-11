import Redis from 'ioredis';
import { env } from '.';

const connectRedisServer = () => {
	const pubClient = new Redis({
		port: env.redis.port,
		host: env.redis.host,
	});
	const subClient = pubClient.duplicate();
	pubClient.on('error', (err) => {
		console.error('Redis Pub Client Error:', err);
		process.exit(1);
	});

	subClient.on('error', (err) => {
		console.error('Redis Sub Client Error:', err);
		process.exit(1);
	});

	return {
		pubClient,
		subClient,
	};
};

export default connectRedisServer;
