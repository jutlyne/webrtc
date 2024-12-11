import Redis from 'ioredis';

const connectRedisServer = () => {
	const pubClient = new Redis();
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
