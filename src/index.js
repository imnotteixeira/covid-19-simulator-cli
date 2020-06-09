const config = require("./config");
const { displayMatrix } = require("./utils");
const { init, simulate, MetricsService, SimulationPresets } = require("@imnotteixeira/covid-19-simulator");
const exportHTML = require("./web-output");

const { Command } = require("commander");
const version = require("../package.json").version;
const program = new Command();
program
    .version(version)
    .option("-w, --web", "Generate static HTML with results")
    .option("-v, --verbose", "Print metric results");

program.parse(process.argv);

const options = (config.SIMULATION_PRESET) ? { ...SimulationPresets[config.SIMULATION_PRESET] } : {
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
    numberOfZones: config.NUM_ZONES,
    zoneIsolationBehavior: config.ZONE_ISOLATION_BEHAVIOR,
    zoneIsolationThreshold: config.ZONE_ISOLATION_THRESHOLD,
    zoneIsolationTimeout: config.ZONE_ISOLATION_TIMEOUT,
};

const simulationData = init(options);

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
MetricsService.subscribe("carriers-history");

const renderMatrix = (simulationData) => {
    if (simulationData.population.length <= 100) {
        console.info("Step:", simulationData.step);
        displayMatrix(simulationData.population);
    }
};

simulate(simulationData, config.MAX_STEPS, {
    stepEnd: renderMatrix,
    onSimulationStart: renderMatrix,
});

const metricValues = MetricsService.export();

if (program.verbose) {
    const metricValues = MetricsService.export();
    for (const metricId in metricValues) {
        console.info(`[${metricId}] ${metricValues[metricId]}`);
    }
}

if (program.web) {
    console.info("Generating HTML file with results...");
    exportHTML({ metrics: metricValues, simulationState: simulationData })
        .then(() => console.info("HTML generated, check out/ folder."));
}
