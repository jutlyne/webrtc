import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer;

export const setSocketServer = (ioInstance: SocketIOServer) => {
	io = ioInstance;
};

export const getSocketServer = (): SocketIOServer => {
	if (!io) {
		throw new Error('Socket.IO server is not initialized!');
	}
	return io;
};

export const handleEventWebRtc = () => {
	const io = getSocketServer();

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
};
