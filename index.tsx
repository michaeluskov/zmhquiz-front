import {h, render, Component} from "preact";
import {QuestionView} from "./src/views/questionView/QuestionView";
import {Message} from "./src/views/message/Message";
require("./index.css");

const questionProps = {
    question: "Как у тебя дела?",
    answers: [
        {title: "Отлично", isLoading: true},
        {title: "Замечательно", isRight: true},
        {title: "СуперСуперСуперСуперСуперСуперСуперСуперСуперСуперСупер", isWrong: true}
    ] as {
        title: string;
        isRight: boolean;
        isWrong: boolean;
        isLoading: boolean;
    }[],
    secondsLeft: 10,
    isDisabled: true,
    onAnswer: i => alert(i)
};

let App = () => <QuestionView {...questionProps} />;

App = () => <Message header={"Упс, что-то пошло не так"} content={"На самом деле, я наврал"}/>

render(<App />, document.getElementById("root"));
