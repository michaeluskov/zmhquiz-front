import {h, Component, VNode} from "preact";
import * as Api from "./api";
import {Question} from "./misc";
import {Message} from "../views/message/Message";
import {QuestionView} from "../views/questionView/QuestionView";
import {Button} from "../views/button/Button";

interface Props {
    login: string;
    quizId: string;
    hash: string;
}

interface State {
    error: string | VNode;
    started: true;
    questions: Question[];
    currentQuestion: number;
    intervalId: number;
    freeTime: number;
    messageHeader: string;
    messageText: string;
    areButtonsDisabled: boolean;
}

export class Container extends Component<Props, State> {

    componentDidMount() {
        Api.getQuestionMeta(this.props.quizId, this.props.login, this.props.hash)
            .then(meta => {
                this.setState({
                   error: meta.error,
                   questions: meta.questions
                });
            })
            .catch(e => this.handleError(e))
    }

    handleError(e, text = "Произошло что-то вообще непонятное. Даже не знаю, куда смотреть.") {
        e && console.log(e.message);
        e && console.log(e.stack);
        this.setState({ error: text });
    }

    getCurrentQuestion = (): Question => this.state.questions[this.state.currentQuestion];

    runQuestion(num: number) {
        this.setState({
            areButtonsDisabled: false
        });
        this.setState({
            currentQuestion: num,
        });
        if (num < this.state.questions.length) {
            this.setState({
                freeTime: this.getCurrentQuestion().timeToAnswer
            });
            const intervalId: any = setInterval(() => this.onInterval(), 1000);
            this.setState({ intervalId });
        }
    }

    clearInterval() {
        clearInterval(this.state.intervalId as any);
        this.setState({ intervalId: undefined});
    }

    onInterval() {
        if (this.state.freeTime == 0) {
            this.clearInterval();
            this.setState({
                messageHeader: "Увы, твое время истекло"
            });
        } else {
            this.setState({ freeTime: this.state.freeTime - 1 });
        }
    }

    onAnswer(answerNum: number) {
        this.clearInterval();
        this.setState({
            areButtonsDisabled: true
        });
        const questions = this.state.questions;
        questions[this.state.currentQuestion].answers[answerNum].isLoading = true;
        this.setState({ questions });
        Api.postAnswer(this.props.quizId, this.props.login, this.props.hash, this.getCurrentQuestion().id, answerNum)
            .then(result => {
                const questions = this.state.questions;
                const rightNum = result.rightAnswerNum;
                questions[this.state.currentQuestion].answers[answerNum].isRight = answerNum == rightNum;
                questions[this.state.currentQuestion].answers[answerNum].isWrong = answerNum !== rightNum;
                questions[this.state.currentQuestion].answers[rightNum].isRight = true;
                questions[this.state.currentQuestion].answers[answerNum].isLoading = false;
                this.setState({
                    questions
                });
                setTimeout(() => this.runQuestion(this.state.currentQuestion + 1), 2000);
            })
            .catch(e => this.handleError(e));
    }

    render() {
        if (this.state.error)
            return <Message header={"Упс! Произошла ошибка"} content={this.state.error}/>;
        if (this.state.messageHeader)
            return <Message header={this.state.messageHeader} content={this.state.messageText}/>;
        if (this.state.questions === undefined)
            return <Message header={"Загружаем"}/>;
         if (this.state.currentQuestion === undefined)
             return <Message
                 header={"Готов?"}
                 content={<div>
                     <Button title={"Готов!"} isLoading={false} isDisabled={false} onClick={() => this.runQuestion(0)}/>
                 </div>}
             />;
        if (this.state.currentQuestion >= this.state.questions.length)
            return <Message header="Ты молодец!"/>
        return <QuestionView
            secondsLeft={this.state.freeTime}
            isDisabled={this.state.areButtonsDisabled}
            onAnswer={i => this.onAnswer(i)}
            question={this.getCurrentQuestion()}/>;
    }

}

