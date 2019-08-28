const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, './src/blm.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'blm.js',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: { loader: 'babel-loader' },
            },
        ],
    },
};
