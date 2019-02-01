import {h, Component, render} from "preact";
import {AdminContainer} from "./src/admin/adminContainer/AdminContainer";
import 'promise-polyfill/src/polyfill';

require("./index.css");

render(<AdminContainer/>, document.getElementById("root"));
