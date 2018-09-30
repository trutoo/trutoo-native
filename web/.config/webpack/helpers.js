const path = require('path');

/* DIRECTORIES */
module.exports.ROOT_DIR = process.cwd();
module.exports.WEB_DIR = path.resolve(process.cwd(), 'web');
module.exports.CONFIG_DIR = path.resolve(process.cwd(), 'web', '.config');
module.exports.BUILD_DIR = path.resolve(process.cwd(), 'web', 'dist');
module.exports.SOURCE_DIR = path.resolve(process.cwd(), 'src');

/* VARIABLES */
module.exports.CPUS = require('os').cpus().length;
module.exports.CHUNK_ORDER = ['index'];
module.exports.IS_DEV_SERVER = process.argv.find(v => v.includes('webpack-dev-server'));
module.exports.PUBLIC_PATH = '/';
