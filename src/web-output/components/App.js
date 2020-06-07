import React from "react";
import { GeneralChart, MatrixHeatMap } from "@imnotteixeira/covid-19-simulator-ui-components";
import { Grid } from "@material-ui/core";

const GENERAL_CHART_METRIC_IDS = [
    "carrier-count",
    "dead-count",
    "cured-count",
    "hospitalized-count",
];

const App = ({ initialState }) => {
    const metricData = initialState.metrics;
    const carriersHistory = metricData["carriers-history"];
    const generalChartMetrics = [];
    if (metricData)
        Object.keys(metricData).forEach((metricId) => {
            if (GENERAL_CHART_METRIC_IDS.includes(metricId)) {
                generalChartMetrics.push({
                    id: metricId,
                    data: metricData[metricId].map((val, i) => ({ x: i, y: val })),
                });
            }
        });

    return (
        <Grid container style={{ height: "500px" }}>
            {metricData ?
                <>
                    <Grid item xs={12} md={6} style={{ height: "500px" }}>
                        <GeneralChart data={generalChartMetrics}/>
                    </Grid>
                    <Grid item xs={12} md={6} style={{ height: "500px" }}>
                        {carriersHistory.length > 0 &&
                            <MatrixHeatMap
                                values={carriersHistory}
                                showLatestStep={false}
                            />
                        }
                    </Grid>
                </>
                : <p>No Metrics yet..</p>
            }
        </Grid>
    );
};

export default App;
