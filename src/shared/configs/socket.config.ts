import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { corsOptions } from './cors.config';
import { handleEventWebRtc, setSocketServer } from '@utils/socket.util';
import { createAdapter } from '@socket.io/redis-adapter';
import connectRedisServer from './redis.config';

const setupSocketServer = (httpServer: HttpServer): Server => {
	const { pubClient, subClient } = connectRedisServer();

	const io = new Server(httpServer, {
		cors: corsOptions,
		adapter: createAdapter(pubClient, subClient),
	});

	setSocketServer(io);
	handleEventWebRtc();

	io.use((socket, next) => {
		const token = socket.handshake.auth?.token;
		console.log(token);
		next();
		// TODO verify jwt token
	});

	return io;
};

export default setupSocketServer;
