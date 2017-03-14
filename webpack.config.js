const path = require('path');

module.exports = {

    entry: './src/app.js',

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
    },

    rules: [
        {
            test: /\.jsx?$/,
            loader: "babel-loader",
        },
    ]
};