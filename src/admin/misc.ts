import {Quiz} from "../logic/misc";

export interface Results {
    quiz: Quiz;
    userAnswers: {
        _id: string;
        answers: {
            questionNum: number;
            answerNum: number;
        }[];
    }[];
}
