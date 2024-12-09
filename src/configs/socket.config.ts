import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { corsOptions } from './cors.config';
import { setSocketServer } from '@/utils/socket.util';
import Redis from 'ioredis';
import { createAdapter } from '@socket.io/redis-adapter';

const setupSocketServer = (httpServer: HttpServer): Server => {
	const pubClient = new Redis();
	const subClient = pubClient.duplicate();

	const io = new Server(httpServer, {
		cors: corsOptions,
		adapter: createAdapter(pubClient, subClient),
	});

	io.on('connection', (socket) => {
		console.log(socket.id);

		socket.on('offer', (data) => {
			socket.to(data.roomId).emit('offer', data.data);
		});

		socket.on('answer', (data) => {
			socket.to(data.roomId).emit('answer', data.data);
		});

		socket.on('ice-candidate', (data) => {
			socket.to(data.roomId).emit('ice-candidate', data.data);
		});

		socket.on('join-room', async (data) => {
			socket.join(data);
			io.to(data).emit('user-joined', { socketId: socket.id });
		});

		socket.on('get-clients', (data) => {
			const room = io.sockets.adapter.rooms.get(data);

			if (room) {
				const clients = Array.from(room);
				io.to(data).emit('list-users', clients);
			} else {
				io.to(socket.id).emit('list-users', []);
			}
		});

		socket.on('disconnecting', () => {
			socket.rooms.forEach((room) => {
				if (room !== socket.id) {
					socket.to(room).emit('user-left', socket.id);
				}
			});
		});

		socket.on('disconnect', () => {
			console.log('User disconnected:', socket.id);
		});

		socket.on('connect_error', (err) => {
			console.error('Socket connection error:', err);
		});
	});

	setSocketServer(io);

	io.use((socket, next) => {
		const token = socket.handshake.auth?.token;
		console.log(token);
		// TODO verify jwt token
	});

	return io;
};

export default setupSocketServer;
