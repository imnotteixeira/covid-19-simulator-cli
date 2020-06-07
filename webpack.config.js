const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        main: path.resolve(__dirname, "src/web-output/components/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "out"),
    },
    resolve: {
        alias: {
            "@material-ui/core": path.resolve(__dirname, "./node_modules/@material-ui/core"),
            "react": path.resolve(__dirname, "./node_modules/react"),
            "react-router-dom": path.resolve(__dirname, "./node_modules/react-router-dom"),
        },
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
