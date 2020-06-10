import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@material-ui/core";
import { AppTheme } from "@imnotteixeira/covid-19-simulator-ui-components";

// Read the state sent with markup
const state = window.__STATE__;

// delete the state from global window object
delete window.__STATE__;

ReactDOM.render(
    <ThemeProvider theme={AppTheme}>
        <App initialState={state}/>
    </ThemeProvider>, document.getElementById("root"));
