import {h, Component} from "preact";
import {Quiz} from "../../logic/misc";
import {MainContainer} from "../../views/mainContainer/MainContainer";
import {Link} from "../../views/link/Link";
import {Input} from "../../views/input/Input";
import produce from "immer";

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
    console.log(d);
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

export class QuizEdit extends Component<Props, State> {

    constructor(state, context) {
        super(state, context);
        this.state = {
            editedQuiz: this.props.quiz || {
                from: formatDate(new Date()),
                till: formatDate(addTenMinutes(new Date())),
                questions: []
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
        }
    }

    setTill(v: string) {
        const date = stringToDate(v);
        if (date) {
            this.produceState(s => {s.editedQuiz.till = date.toString()});
        }
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
                    <Input value={`https://zmh.wtf/${this.state.editedQuiz.id}`} onChange={() => {}}/>
                </div>
                <div className="qe-formitem">
                    <span className="qe-label">Старт квиза</span>
                    <Input value={formatDate(this.state.editedQuiz.from)} onBlur={v => this.setFrom(v)} />
                </div>
                <div className="qe-formitem">
                  <span className="qe-label">Конец квиза</span>
                  <Input value={formatDate(this.state.editedQuiz.till)} onBlur={v => this.setTill(v)} />
                </div>
              </div>
          </div>
        </MainContainer>;
    }
}
