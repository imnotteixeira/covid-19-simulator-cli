const config = require("./config");
const { displayMatrix } = require("./utils");
const { init, simulate } = require("@imnotteixeira/covid-19-simulator");

const simulationData = init({
    populationSize: config.POPULATION_SIZE,
    spreadRadius: config.SPREAD_RADIUS,
    hygieneDisregard: config.HYGIENE_DISREGARD,
    hospitalEffectiveness: config.HOSPITAL_EFFECTIVENESS,
    hospitalCapacity: config.HOSPITAL_CAPACITY,
});

simulate(simulationData, config.MAX_STEPS, {
    stepEnd: (simulationData) => {
        if (simulationData.population.length <= 100) {
            displayMatrix(simulationData.population);
        }
    },
});
