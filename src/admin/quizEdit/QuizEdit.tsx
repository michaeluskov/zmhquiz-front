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

const localeOptions = {

};

export class QuizEdit extends Component<Props, State> {

    constructor(state, context) {
        super(state, context);
        this.state = {
            editedQuiz: this.props.quiz || {
                from: new Date().toString(),
                till: new Date().toString(),
                questions: []
            } as Quiz
        }
    }

    produceState(f: (state: State) => void) {
        this.setState(produce<State>(this.state, f));
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
                    <Input value={this.state.editedQuiz.from} onChange={v => this.produceState(s => {s.editedQuiz.from = v})} />
                </div>
                <div className="qe-formitem">
                  <span className="qe-label">Конец квиза</span>
                  <Input value={this.state.editedQuiz.from} onChange={v => this.produceState(s => {s.editedQuiz.from = v})} />
                </div>
              </div>
          </div>
        </MainContainer>;
    }
}
