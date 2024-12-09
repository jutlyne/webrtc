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
