var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: './www/bundle.js'
    },
    resolve: {
        extensions: [ ".ts", "tsx", ".js" ]
    },
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: [
                    { loader: 'ts-loader' },
                    { loader: 'tslint-loader' }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    devServer: {
        contentBase: './www',
        port: 9000
    }
}
