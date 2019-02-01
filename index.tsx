import {h, render, Component} from "preact";
import {QuestionView} from "./src/views/questionView/QuestionView";
import {Message} from "./src/views/message/Message";
import {Container} from "./src/logic/container";
import 'promise-polyfill/src/polyfill';

require("./index.css");

const quizId = document.location.pathname.slice(1);
const queryParams: any = document.location.search
    .slice(1)
    .split('&')
    .map(param => param.split('=').map(e => decodeURIComponent(e)))
    .reduce((prev, param) => ({...prev, [param[0]]: param[1]}), {});

let App = () => <Container login={queryParams.login} hash={queryParams.hash} quizId={quizId} />;

render(<App />, document.getElementById("root"));
