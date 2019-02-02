import {h, Component, FunctionalComponent} from "preact";
import {MainContainer} from "../mainContainer/MainContainer";
import {Quiz} from "../../logic/misc";
import {Link} from "../link/Link";
require("./QuizList.css");

interface Props {
    quizes: Quiz[];
    onEdit: (quizNum: number) => void;
    onGetResults: (quizNum: number) => void;
    onAddQuiz: () => void;
}

export const QuizList: FunctionalComponent<Props> = props => (
    <MainContainer>
        <div className="ql-root">
            <div className="ql-addquizplace">
                <Link text={"Добавить квиз"} onClick={props.onAddQuiz}/>
            </div>
            {props.quizes.map((quiz, i) =>
                <div className="ql-quiz">
                    <div className="ql-name">{quiz.name || "Кто-то молодец и не вписал название квиза"}</div>
                    <div className="ql-actions">
                        <span className="ql-action"><Link text={"Редактировать"} onClick={() => props.onEdit(i)}/></span>
                        <span class="ql-action"><Link text={"Результаты"} onClick={() => props.onGetResults(i)}/></span>
                    </div>
                </div>
            )}
        </div>
    </MainContainer>
);
