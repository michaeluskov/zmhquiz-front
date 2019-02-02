import {Quiz} from "../logic/misc";

export interface Results {
    quiz: Quiz;
    userAnswers: {
        login: string;
        answers: {
            questionNum: number;
            answerNum: number;
        }[];
    }
}
