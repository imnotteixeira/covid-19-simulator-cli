const fs = require("fs").promises;
const path = require("path");
const webpack = require("webpack");
const webpack_config = require("../../webpack.config");
const template = require("./template");

webpack(webpack_config).run((err, stats) => {
    stats.compilation.errors.forEach(console.error);
});

const OUTPUT_PATH = path.resolve(__dirname, "../../out");

const exportHTML = async ({ metrics, simulationState }) => {
    await fs.writeFile(`${OUTPUT_PATH}/index.html`,
        template("COVID-19 Simulation Results", { metrics, simulationState }));
};


module.exports = exportHTML;
