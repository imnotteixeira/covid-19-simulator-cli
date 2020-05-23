const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    // node: { fs: "empty" },
    entry: {
        main: path.resolve(__dirname, "src/web-output/components/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "out"),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [
                    path.resolve(__dirname, "node_modules"),
                ],
                // include: [
                //     path.resolve(__dirname, "src/web-output"),
                // ],
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
};
