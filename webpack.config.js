const path = require('path');

module.exports = {

    entry: {
        app: [
            './src/app.js','./src/character.js, ./src/dice.js, ./src/combat.js'
        ],
        test: [
            './test/app.spec.js', './test/character.spec.js'
        ]
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