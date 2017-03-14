const path = require('path');

module.exports = {

    entry: {
        app: './src/app.js',
        test: './test/app.spec.js',
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
            }
        ]
    }
};