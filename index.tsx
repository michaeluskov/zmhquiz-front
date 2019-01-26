import {h, render, Component} from "preact";
import {QuestionView} from "./src/questionView/QuestionView";
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

const App = () => <QuestionView {...questionProps} />;

render(<App />, document.getElementById("root"));
