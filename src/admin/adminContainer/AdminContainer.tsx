import {h, Component} from "preact";
import produce from "immer";

import {Message, MessageDivider} from "../../views/message/Message";
import {Input} from "../../views/input/Input";
import {Button} from "../../views/button/Button";
import {getQuizes, getSession} from "../api";
import {Quiz} from "../../logic/misc";
import {QuizList} from "../../views/quizList/QuizList";

interface State {
    error: string;
    sessionId: string;
    passwordValue: string;
    quizes: Quiz[];
    editingQuiz: Quiz;
}

export class AdminContainer extends Component<{}, State> {

    constructor(props, context) {
        super(props, context);
    }

    produceState(f: (state: State) => void) {
        this.setState(produce<State>(this.state, f));
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

    render() {
        if (this.state.error)
            return <Message header={"Ошибка"} content={this.state.error} />;
        if (!this.state.sessionId)
            return <Message
                header="Введи пароль"
                content={<div>
                    <MessageDivider>
                        <Input type="password" value={this.state.passwordValue} onChange={(v) => this.setState({ passwordValue: v})} onEnterPress={() => this.login()}/>
                    </MessageDivider>
                    <MessageDivider>
                        <Button title={"Войти"} onClick={() => this.login()}/>
                    </MessageDivider>
                </div>}
            />;
        if (!this.state.editingQuiz)
            return <QuizList quizes={this.state.quizes || []} onEdit={() => {}} onGetResults={() => {}} onAddQuiz={() => {}}/>
    }
}
