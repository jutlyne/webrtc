const ncp = require('ncp').ncp;

const sourceDir = 'src/shared/locales';
const destDir = 'dist/src/shared/locales';

ncp(sourceDir, destDir, function (err) {
	if (err) {
		return console.error(err);
	}
	console.log('done!');
});
