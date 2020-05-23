const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const webpack_config = require("../../webpack.config");
const template = require("./template");

webpack(webpack_config).run((err, stats) => {
    console.log(err, stats);
});

const OUTPUT_PATH = path.resolve(__dirname, "../../out");

const exportHTML = () => {
    fs.writeFileSync(`${OUTPUT_PATH}/index.html`, template("My Title", { test: "test123" }));
};

exportHTML();

module.exports = exportHTML;
