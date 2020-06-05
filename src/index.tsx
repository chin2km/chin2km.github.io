import "intersection-observer";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components";
import {registerServiceWorker} from "./serviceWorker";
import "./index.css";

let rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);

registerServiceWorker();
