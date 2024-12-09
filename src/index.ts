import cors from 'cors';
import path from 'path';
import { AddressInfo } from 'net';
import { HttpStatusCode } from 'axios';
import { Server as SocketIOServer } from 'socket.io';
import { createServer, Server as HttpServer } from 'http';
import { handle as i18Handle } from 'i18next-http-middleware';
import express, { Application, NextFunction, Request, Response } from 'express';
import routes from './routes';
// import databaseLoader from './database';
import { trans } from './utils/translation.util';
import formatResponse from './loaders/response.loader';
import ErrorHandler from './exceptions/error.exeption';
import LanguageMiddleware from './middleware/language.middleware';
import { verifyServerHealth } from './utils/response.util';
import {
	corsOptions,
	env,
	header,
	i18nConfig,
	setupSocketServer,
} from './configs';

class Server {
	public app: Application;
	public io: SocketIOServer;
	protected server: HttpServer;

	constructor() {
		this.app = express();
		this.server = createServer(this.app);
		this.io = setupSocketServer(this.server);
		this.config();
	}

	protected config(): void {
		const port = env.app.port;
		const { handleLanguage, errorHandler } = this.getMiddlewareFunctions();

		this.app.set('port', port);
		this.app.use(cors(corsOptions));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.static(path.join(process.cwd(), 'public')));
		this.app.use(i18Handle(i18nConfig));
		this.app.use(handleLanguage);

		// header
		header(this.app);

		// Setting up routes
		routes(this.app);

		// Applying middleware and error handling
		this.app.use(errorHandler);

		// Format response middleware
		this.app.use(formatResponse);

		// Handling not found routes
		this.app.all('*', (req: Request, res: Response) => {
			return res.status(HttpStatusCode.NotFound).json({
				message: trans('error.not_found', undefined, 'validation'),
			});
		});
	}

	protected getMiddlewareFunctions() {
		// Middleware to handle language
		const handleLanguage = (
			req: Request,
			res: Response,
			next: NextFunction,
		) => {
			LanguageMiddleware.handle(req, res, next);
		};

		// Error handling middleware
		const errorHandler = (
			err: Error,
			req: Request,
			res: Response,
			next: NextFunction,
		) => {
			ErrorHandler.handle(err, req, res, next);
		};

		return {
			handleLanguage,
			errorHandler,
		};
	}

	public async start(): Promise<void> {
		try {
			// await databaseLoader.connectToDatabase();
			this.server.listen(this.app.get('port'), async () => {
				const { port } = this.server.address() as AddressInfo;
				console.log(`Server listening on port ${port}`);

				if (env.app.node_env === 'testing') {
					await verifyServerHealth(port);
				}
			});
		} catch (error) {
			console.error(error);
			if (env.app.node_env === 'testing') {
				process.exit(1);
			}
		}
	}
}

const server = new Server();
server.start();
