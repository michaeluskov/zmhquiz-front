import {h} from "preact";
import * as Preact from "preact";
import {MainContainer} from "../mainContainer/MainContainer";
import {Question} from "../../logic/misc";
import {Button} from "../button/Button";
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
            <div className="qv-timer-place">
                <div className="qv-price">
                    {props.question.price}&nbsp;₽
                </div>
                <div className={`qv-timer ${props.secondsLeft <=4 ? "qv-timer-red" : ""}`}>
                    {props.secondsLeft}
                </div>
            </div>
            <div className="qv-top">
                <div className="qv-question">{props.question.question}</div>
            </div>
            <div className="qv-bottom">
                {props.question.answers.map((answer, i) => (
                    <Button {...answer} isFullWidth={true} isDisabled={props.isDisabled} onClick={() => props.onAnswer(i)} />
                ))}
            </div>
        </div>
    </MainContainer>
);
