const config = require("./config");
const { displayMatrix } = require("./utils");
const { init, simulate, MetricsService } = require("@imnotteixeira/covid-19-simulator");

const simulationData = init({
    populationSize: config.POPULATION_SIZE,
    spreadRadius: config.SPREAD_RADIUS,
    hygieneDisregard: config.HYGIENE_DISREGARD,
    hospitalEffectiveness: config.HOSPITAL_EFFECTIVENESS,
    hospitalCapacity: config.HOSPITAL_CAPACITY,
    populationPreset: config.POPULATION_PRESET,
    incubationPeriod: config.INCUBATION_PERIOD,
    infectionPeriod: config.INFECTION_PERIOD,
    quarantineEffectiveness: config.QUARANTINE_EFFECTIVENESS,
    quarantinePeriod: config.QUARANTINE_PERIOD,
    quarantineDelay: config.QUARANTINE_DELAY,
    quarantineType: config.QUARANTINE_TYPE,
    quarantinePercentage: config.QUARANTINE_PERCENTAGE,
    testRate: config.TEST_RATE,
    testCooldown: config.TEST_COOLDOWN,
});

if (simulationData.population.length > 100) {
    console.info("Population too big. Will not render population on each step.");
}

MetricsService.subscribe("carrier-count");
MetricsService.subscribe("dead-count");
MetricsService.subscribe("cured-count");
MetricsService.subscribe("hospitalized-count");
MetricsService.subscribe("quarantined-count");
MetricsService.subscribe("r0");
MetricsService.subscribe("r");
MetricsService.subscribe("positive-test-count");
MetricsService.subscribe("total-test-count");
MetricsService.subscribe("confirmed-carrier-count");

simulate(simulationData, config.MAX_STEPS, {
    stepEnd: (simulationData) => {
        if (simulationData.population.length <= 100) {
            console.info("Step:", simulationData.step);
            displayMatrix(simulationData.population);
        }
    },
});

const metricValues = MetricsService.export();
for (const metric of metricValues) {
    console.info(`[${metric.id}] ${metric.data}`);
}
