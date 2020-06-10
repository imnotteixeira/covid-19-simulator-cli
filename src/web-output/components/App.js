import React from "react";
import PropTypes from "prop-types";

import { VisualizationsLayout } from "@imnotteixeira/covid-19-simulator-ui-components";

const App = ({ initialState }) => {
    const { metrics: metricData, simulationState } = initialState;

    return (
        <VisualizationsLayout
            metricData={metricData}
            simulationState={simulationState}
        />
    );
};

App.propTypes = {
    initialState: PropTypes.shape({
        metrics: PropTypes.object.isRequired,
        simulationState: PropTypes.object.isRequired,
    }),
};


export default App;
