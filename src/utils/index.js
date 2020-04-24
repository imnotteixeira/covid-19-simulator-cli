const config = require("../config");

// This can be memoized
const convertToLinearCoord = ([line, col]) => (line * config.MATRIX_SIDE) + col;
const convertToXYCoord = (index) => ([Math.floor(index / config.MATRIX_SIDE), index % config.MATRIX_SIDE]);

const StateRepresentation = Object.freeze({
    HEALTHY: "☺",
    CARRIER: "C",
    CONFIRMED_CARRIER: "C*",
    DEAD: "D",
    CURED: "*",
    QUARANTINED: "Q",
    HOSPITALIZED: "H",
});

// Does not render states like quarantined and stuff, because they are not a .state of the individual
const getRepresentation = (individual) => {
    if (individual.isHospitalized) return StateRepresentation.HOSPITALIZED;
    if (individual.isQuarantined) return StateRepresentation.QUARANTINED;
    return StateRepresentation[individual.state];
};

const displayMatrix = (m) => {
    console.info("-".repeat(config.MATRIX_SIDE));
    for (let i = 0; i < config.MATRIX_SIDE; i++) {
        let str = "";
        for (let j = 0; j < config.MATRIX_SIDE; j++) {
            str += `${getRepresentation(m[convertToLinearCoord([i, j])])}, `;

        }
        console.info(str);
    }
    console.info("-".repeat(config.MATRIX_SIDE));
};

module.exports = {
    displayMatrix,
    convertToLinearCoord,
    convertToXYCoord,
};
