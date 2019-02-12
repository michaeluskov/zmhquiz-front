import {h, render, Component} from "preact";
import {Message} from "./src/views/message/Message";
import {Container} from "./src/logic/container";
import 'promise-polyfill/src/polyfill';

require("./index.css");

let App = () => <Message header="Вот и всё, ребята!" />;

render(<App />, document.getElementById("root"));
