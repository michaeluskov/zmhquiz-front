import {h, Component} from "preact";

import {Message, MessageDivider} from "../../views/message/Message";
import {Input} from "../../views/input/Input";
import {Button} from "../../views/button/Button";
import {getQuizes, getResults, getSession, updateQuiz} from "../api";
import {Quiz} from "../../logic/misc";
import {QuizList} from "../../views/quizList/QuizList";
import {QuizEdit} from "../quizEdit/QuizEdit";
import {Results} from "../misc";
import {ResultsView} from "../resultsView/ResultsView";

interface State {
    error: string;
    sessionId: string;
    passwordValue: string;
    quizes: Quiz[];
    editingQuiz: number;
    showingResults: Results;
}

export class AdminContainer extends Component<{}, State> {

    constructor(props, context) {
        super(props, context);
    }

    handleError(e, text = "Произошло что-то вообще непонятное. Даже не знаю, куда смотреть.") {
        e && console.error(e.message);
        e && console.error(e.stack);
        this.setState({ error: text });
    }

    login() {
        getSession(this.state.passwordValue)
            .then(response => {
                this.setState({ passwordValue: undefined });
                if (response.data.error)
                    return this.setState({ error: response.data.error });
                this.setState({ sessionId: response.data.sessionId });
                this.showQuizes();
            })
            .then(() => this.state.error && this.state.error.indexOf("пароль") !== -1 &&
                setTimeout(() => this.setState({ error: undefined }), 900))
            .catch(e => this.handleError(e));
    }

    showQuizes() {
        getQuizes(this.state.sessionId)
            .then(res => {
               if (res.error)
                   return this.setState({error: res.error });
               this.setState({ quizes: res.quizes });
            })
            .catch(e => this.handleError(e));
    }

    onEdit(quizNum: number, quiz: Quiz) {
        updateQuiz(this.state.sessionId, quiz)
            .then(() => this.showQuizes())
            .then(() => this.setState({ editingQuiz: undefined }))
            .catch(e => this.handleError(e));
    }

    showResults(num: number) {
        getResults(this.state.sessionId, this.state.quizes[num].id)
            .then(data => this.setState({ showingResults: data }));
    }

    render() {
        if (this.state.error)
            return <Message header={"Ошибка"} content={this.state.error} />;
        if (!this.state.sessionId)
            return <Message
                header="Введи пароль"
                content={<div>
                    <MessageDivider>
                        <Input type="password" isBig value={this.state.passwordValue} onChange={(v) => this.setState({ passwordValue: v})} onEnterPress={() => this.login()}/>
                    </MessageDivider>
                    <MessageDivider>
                        <Button title={"Войти"} onClick={() => this.login()}/>
                    </MessageDivider>
                </div>}
            />;
        if (this.state.showingResults)
            return <ResultsView results={this.state.showingResults} onGoBack={() => this.setState({ showingResults: undefined })} />;
        if (this.state.editingQuiz === undefined)
            return <QuizList
                quizes={this.state.quizes || []}
                onEdit={i => this.setState({ editingQuiz: i })}
                onGetResults={num => this.showResults(num)}
                onAddQuiz={() => this.setState(({ editingQuiz: -1 }))}
            />;
        return <QuizEdit
            quiz={this.state.quizes[this.state.editingQuiz]}
            onEdit={q => this.onEdit(this.state.editingQuiz, q)}
            onGoBack={() => this.setState({ editingQuiz: undefined })}
        />;
    }
}
