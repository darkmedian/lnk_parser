"use strict";

module.exports = {
    entry: './app/static/scripts/app.js',
    output: {
        path: "./app/static/",
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'babel'
                ]
            }
        ]
    }
}