const ncp = require('ncp').ncp;

const sourceDir = 'src/locales';
const destDir = 'dist/src/locales';

ncp(sourceDir, destDir, function (err) {
	if (err) {
		return console.error(err);
	}
	console.log('done!');
});
