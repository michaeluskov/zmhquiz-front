import {h} from "preact";
import * as Preact from "preact";
import {MainContainer} from "../mainContainer/MainContainer";
import {Question} from "../../logic/misc";
const styles = require("./QuestionView.css");

interface Props {
    question: Question;
    secondsLeft: number;
    isDisabled: boolean;
    onAnswer: (number: number) => void;
}

export const QuestionView = (props: Props) => (
    <MainContainer>
        <div className="qv-root">
            <div className="qv-top">
                <div className={`qv-timer ${props.secondsLeft <=4 ? "qv-timer-red" : ""}`}>
                    {props.secondsLeft}
                </div>
                <div className="qv-question">{props.question.question}</div>
            </div>
            <div className="qv-bottom">
                {props.question.answers.map((answer, i) => (
                    <QuestionButton {...answer} isDisabled={props.isDisabled} onClick={() => props.onAnswer(i)} />
                ))}
            </div>
        </div>
    </MainContainer>
);

interface QuestionButtonProps {
    title: string;
    isRight?: boolean;
    isWrong?: boolean;
    isLoading: boolean;
    isDisabled: boolean;
    onClick: () => void;
}

const PropToClassName = {
    isRight: "qv-button-right",
    isWrong: "qv-button-wrong",
    isLoading: "qv-button-loading",
    isDisabled: "qv-button-disabled"
};

const QuestionButton: Preact.FunctionalComponent<QuestionButtonProps> = (props) => (
    <button
        onClick={props.onClick}
        className={"qv-button " +
            Object.keys(PropToClassName)
            .filter(prop => props[prop])
            .map(prop => PropToClassName[prop])
            .join(" ")}
        disabled={props.isDisabled}>
        {props.title}
    </button>
);
