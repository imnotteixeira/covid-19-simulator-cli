import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Read the state sent with markup
const state = window.__STATE__;

// delete the state from global window object
delete window.__STATE__;

ReactDOM.render(<App initialState={state}></App>, document.getElementById("root"));
