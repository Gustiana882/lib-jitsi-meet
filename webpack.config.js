const process = require('process');

const sharedConfig = require('./webpack-shared-config');

module.exports = (_env, argv) => {
    // Despite what whe docs say calling webpack with no arguments results in mode not being set.
    const mode = typeof argv.mode === 'undefined' ? 'production' : argv.mode;
    const config
        = sharedConfig(mode === 'production' /* minimize */, Boolean(process.env.ANALYZE_BUNDLE) /* analyzeBundle */);

    return [
        Object.assign({}, config, {
            entry: {
                'libvideoapi': './index.js'
            },
            output: Object.assign({}, config.output, {
                library: 'LibVideoAPI.js',
                libraryTarget: 'umd',
                path: process.cwd()
            })
        }),
        {
            entry: {
                worker: './modules/e2ee/Worker.js'
            },
            mode,
            output: {
                filename: 'libvideoapi.e2ee-worker.js',
                path: process.cwd()
            },
            optimization: {
                minimize: false
            }
        }
    ];
};
