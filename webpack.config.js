const path = require("path");

module.exports = {
    mode: "production",
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
