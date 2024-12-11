#!/usr/bin/env node

const yargs = require('yargs');
const { execSync } = require('child_process');

const {
	_: [type, name],
} = yargs.argv;

if (!name && type != 'seed-run') {
	console.error('Name missing!');
	process.exit(1);
}

if (type == 'migration') {
	const migrationPath = `src/database/migrations/${name}`;
	execSync(`typeorm migration:create ${migrationPath}`, { stdio: 'inherit' });
}

if (type == 'entity') {
	const entityName = name.endsWith('s') ? name : `${name}s`;
	const entityPath = `src/${entityName.toLowerCase()}/entities/${name.toLowerCase()}.entity`;
	execSync(`typeorm entity:create ${entityPath}`, { stdio: 'inherit' });
}

if (type == 'seed') {
	const seederPath = `src/database/seeders/${name}`;
	execSync(
		`ts-node ./node_modules/typeorm-extension/bin/cli.cjs seed:create --name ${seederPath}`,
		{ stdio: 'inherit' },
	);
}

if (type == 'seed-run') {
	let cmd =
		'ts-node ./node_modules/typeorm-extension/bin/cli.cjs seed:run -d src/database/datasource.ts';

	if (name) {
		cmd += ` -n ${name}`;
	}

	execSync(cmd, { stdio: 'inherit' });
}
