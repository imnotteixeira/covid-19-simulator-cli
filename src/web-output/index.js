const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const webpack_config = require("../../webpack.config");
const template = require("./template");

webpack(webpack_config).run((err, stats) => {
    stats.compilation.errors.forEach(console.error);
});

const OUTPUT_PATH = path.resolve(__dirname, "../../out");

const exportHTML = () => {
    fs.writeFileSync(`${OUTPUT_PATH}/index.html`,
        template("My Title", { metrics: [{ id: "test", data: [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }] }] }));
};

exportHTML();

module.exports = exportHTML;
