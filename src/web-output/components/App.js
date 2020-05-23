const React = require("react");
const { GeneralChart } = require("@imnotteixeira/covid-19-simulator-ui-components");

const App = ({ initialState }) => {
    console.log(initialState);
    return (
        <div style={{ height: 500 }}>
            <GeneralChart data={initialState.metrics} />
        </div>
    );
};

module.exports = App;
