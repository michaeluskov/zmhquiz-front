import {FunctionalComponent, h} from "preact";
import {Results} from "../misc";
import {MainContainer} from "../../views/mainContainer/MainContainer";
import {Link} from "../../views/link/Link";
require("./ResultsView.css");

interface Props {
    results: Results;
    onGoBack: () => void;
}

export const ResultsView: FunctionalComponent<Props> = (props) => {
    return (
        <MainContainer>
            <div className="rv-root">
                <div className="rv-gobackplace">
                    <Link text={"Вернуться назад"} onClick={props.onGoBack}/>
                </div>
                <table className="rv-table">
                    <tr>
                        <th className="rv-firstheader" />
                        {props.results.quiz.questions.map((q, i) => (
                            <th alt={q.question}>{q.question}</th>
                        ))}
                        <th>Сумма</th>
                    </tr>
                    {props.results.userAnswers.map((ua, i) => {
                        const scores = props.results.quiz.questions.map((q, i) => {
                            const answer = ua.answers.find(a => a.questionNum == i) || {} as any;
                            const userAnswer = q.answers[answer.answerNum] || {} as any;
                            return userAnswer.isRight ? q.price : 0;
                        });
                        return (
                            <tr>
                                <td alt={ua._id}>{ua._id}</td>
                                {scores.map(score => {
                                    return ([
                                        <td>
                                            {score}
                                        </td>
                                    ]);
                                })}
                                <td>
                                    {scores.reduce((sum, score) => score + sum, 0)}
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </MainContainer>
    );
};
