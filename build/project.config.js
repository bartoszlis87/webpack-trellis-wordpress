/* eslint-disable */

const path = require('path');
const merge = require('webpack-merge');
const { argv } = require('yargs');
const desire = require('./util/desire');

const userConfig = desire(`${__dirname}/config`);
const config = merge({
    isProduction: !!((argv.env && argv.env.production) || argv.p),
    rootPath: (userConfig.paths && userConfig.paths.root) ? userConfig.paths.root : process.cwd(),
},userConfig);

module.exports = merge(config, {
    env: (config.isProduction) ? 'prod' : 'dev',
    assetsFilenames: (config.cacheBusting) ? config.cacheBusting : '[name]',
    assetsPath: path.join(config.rootPath, 'assets'),
    distPath: path.join(config.rootPath, 'dist/'),
});
