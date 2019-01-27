import {h, render, Component} from "preact";
import {QuestionView} from "./src/views/questionView/QuestionView";
import {Message} from "./src/views/message/Message";
import {Container} from "./src/logic/container";
require("./index.css");

let App = () => <Container login={"aaa"} hash={"aaa"} quizId={"aaa"} />;

render(<App />, document.getElementById("root"));
