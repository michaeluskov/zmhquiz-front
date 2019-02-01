import {h, Component} from "preact";
import {Question, Quiz} from "../../logic/misc";
import {MainContainer} from "../../views/mainContainer/MainContainer";
import {Link} from "../../views/link/Link";
import {Input} from "../../views/input/Input";
import produce from "immer";
import {Button} from "../../views/button/Button";
require("./QuizEdit.css");

interface Props {
    quiz: Quiz;
    onEdit: (quiz: Quiz) => void;
    onGoBack: () => void;
}

interface State {
    editedQuiz: Quiz;
}

const padLeft = (n: number): string => n >= 10 ? `${n}` : `0${n}`;

const formatDate = (d: Date | string) => {
    if (typeof d == "string")
        d = new Date(d);
    return [padLeft(d.getDate()),
            padLeft(d.getMonth()+1),
            padLeft(d.getFullYear())].join('.')+' '+
           [padLeft(d.getHours()),
            padLeft(d.getMinutes())].join(':');
};

const addTenMinutes = (date: Date) => {
    const ret = new Date(date);
    ret.setTime(ret.getTime() + 10*60000);
    return ret;
};

const stringToDate = (str: string) => {
    const match = str.match(/^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})/);
    if (!match)
        return null;
    const d = new Date();
    d.setFullYear(Number(match[3]));
    d.setMonth(Number(match[2]) - 1);
    d.setDate(Number(match[1]));
    d.setHours(Number(match[4]));
    d.setMinutes(Number(match[5]));
    d.setSeconds(0);
    return d;
};

const emptyQuestion = {
    answers: [{}, {}, {}]
} as Question;

export class QuizEdit extends Component<Props, State> {

    constructor(state, context) {
        super(state, context);
        this.state = {
            editedQuiz: this.props.quiz || {
                from: formatDate(new Date()),
                till: formatDate(addTenMinutes(new Date())),
                questions: [emptyQuestion]
            } as Quiz
        }
    }

    produceState(f: (state: State) => void) {
        this.setState(produce<State>(this.state, f));
    }

    setFrom(v: string) {
        const date = stringToDate(v);
        if (date) {
            this.produceState(s => {s.editedQuiz.from = date.toString()});
            this.produceState(s => {s.editedQuiz.till = addTenMinutes(date).toString()});
        }
    }

    setTill(v: string) {
        const date = stringToDate(v);
        if (date) {
            this.produceState(s => {s.editedQuiz.till = date.toString()});
        }
    }

    onChangeRightAnswer(questionNum: number, answerNum: number) {
        this.produceState(state => {
           state.editedQuiz.questions[questionNum].answers.forEach(a => a.isRight = false);
           state.editedQuiz.questions[questionNum].answers[answerNum].isRight = true;
        });
    }

    render() {
        const quiz = this.props.quiz || {
            questions: []
        };
        return <MainContainer>
          <div class="qe-root">
              <div class="qe-goback">
                  <Link text={"Вернуться назад"} onClick={this.props.onGoBack} />
              </div>
              <div className="qe-form">
                <div className="qe-formitem">
                    <span className="qe-label">Id квиза</span>
                    <Input value={this.state.editedQuiz.id} onChange={v => this.produceState((s) => {s.editedQuiz.id = v})} />
                </div>
                <div className="qe-formitem">
                    <span className="qe-label">Ссылка на квиз: </span>
                    <Input value={this.state.editedQuiz.id ? `https://zmh.wtf/${this.state.editedQuiz.id}` : ""} onChange={() => {}}/>
                </div>
              <div className="qe-formitem">
                  <span className="qe-label">Название квиза: </span>
                  <Input value={this.state.editedQuiz.name} onChange={v => this.produceState((s) => {s.editedQuiz.name = v})} />
              </div>
                <div className="qe-formitem">
                    <span className="qe-label">Старт квиза</span>
                    <Input value={formatDate(this.state.editedQuiz.from)} onBlur={v => this.setFrom(v)} />
                </div>
                <div className="qe-formitem">
                  <span className="qe-label">Конец квиза</span>
                  <Input value={formatDate(this.state.editedQuiz.till)} onBlur={v => this.setTill(v)} />
                </div>
                {this.state.editedQuiz.questions.map((q: Question, i) => (
                    <div className="qe-questionform">
                        <div className="qe-questiontitle">
                            Вопрос {i + 1}
                        </div>
                        <div className="qe-formitem">
                            <span className="qe-label">Текст вопроса</span>
                            <Input value={q.question} onChange={v => this.produceState(s => {s.editedQuiz.questions[i].question = v})} />
                        </div>
                        <div className="qe-formitem">
                            <span className="qe-label">Время для ответа в секундах</span>
                            <Input value={q.timeToAnswer || "10"} onChange={v => this.produceState(s => {s.editedQuiz.questions[i].timeToAnswer = Number(v)})} />
                        </div>
                        <div className="qe-formitem">
                            <span className="qe-label">Ответ 1</span>
                            <Input value={q.answers[0].title} onChange={v => this.produceState(s => {s.editedQuiz.questions[i].answers[0].title = v})} />
                            <label className="qe-formlabel">
                                <input type="checkbox" checked={q.answers[0].isRight} onChange={e => this.onChangeRightAnswer(i, 0)} />
                                Правильный ответ
                            </label>
                        </div>
                        <div className="qe-formitem">
                            <span className="qe-label">Ответ 2</span>
                            <Input value={q.answers[1].title} onChange={v => this.produceState(s => {s.editedQuiz.questions[i].answers[1].title = v})} />
                            <label className="qe-formlabel">
                                <input type="checkbox" checked={q.answers[1].isRight} onChange={e => this.onChangeRightAnswer(i, 1)} />
                                Правильный ответ
                            </label>
                        </div>
                        <div className="qe-formitem">
                            <span className="qe-label">Ответ 3</span>
                            <Input value={q.answers[2].title} onChange={v => this.produceState(s => {s.editedQuiz.questions[i].answers[2].title = v})} />
                            <label className="qe-formlabel">
                                <input type="checkbox" checked={q.answers[2].isRight} onChange={e => this.onChangeRightAnswer(i, 2)} />
                                Правильный ответ
                            </label>
                        </div>
                    </div>
                ))}
                <div className="qe-buttonsplace">
                    <Button
                        title={"Добавить вопрос"}
                        onClick={() => this.produceState(s => {s.editedQuiz.questions.push(emptyQuestion)})}
                    />
                </div>
                <div>
                    <Button title={"Сохранить"} onClick={() => this.props.onEdit(this.state.editedQuiz)}/>
                </div>
              </div>
          </div>
        </MainContainer>;
    }
}
