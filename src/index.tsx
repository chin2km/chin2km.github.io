import "core-js";
import "regenerator-runtime/runtime";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components";
import { registerServiceWorkerForPWA } from "./serviceWorker";
import { loadPolyfills } from "./utils/polyfil";
import "./index.css";

loadPolyfills();

let rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);

registerServiceWorkerForPWA();
