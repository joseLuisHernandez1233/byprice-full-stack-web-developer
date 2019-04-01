const path = require("path");
const webpack = require('webpack');
module.exports = {
    devtool: 'source-map',
    entry: "./public-src/index.js",
    output: {
        path: path.join(__dirname, "/public/js"),
        filename: "main.js"
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        }]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
}
