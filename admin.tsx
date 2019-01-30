import {h, Component, render} from "preact";
import {AdminContainer} from "./src/admin/adminContainer/AdminContainer";

require("./index.css");

render(<AdminContainer/>, document.getElementById("root"));
