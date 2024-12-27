import path from 'path';
import { env } from '@shared/configs';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = env.database;
console.log(env.redis.host, env.redis.port);

export default new DataSource({
	type: config.dialect,
	host: config.host,
	port: config.port,
	username: config.username,
	password: config.password,
	database: config.name,
	synchronize: config.isSync,
	logging: config.logging,
	extra: {
		insecureAuth: true,
	},
	cache: {
		type: 'ioredis',
		options: {
			socket: {
				host: env.redis.host,
				port: env.redis.port,
			},
		},
		alwaysEnabled: true,
		duration: 2000,
		ignoreErrors: true,
	},
	entities: [path.join(__dirname, '../**/entities/*.entity.{ts,js}')],
	migrations: [path.join(__dirname, '../database/migrations/*.{ts,js}')],
	seeds: ['src/database/seeders/*{.ts,.js}'],
	seedTracking: false,
	factories: ['src/database/factories/*{.ts,.js}'],
} as DataSourceOptions);
