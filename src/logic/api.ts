import {Question, wait} from "./misc";
import axios from "axios";

interface QuestionMeta {
    questions: Question[];
    error?: string;
}

export const getQuestionMeta = (quizId, login, hash): Promise<QuestionMeta> => {
    return axios.get(`${process.env.API_URL}/questionMeta?quiz=${quizId}&login=${login}&hash=${hash}`, {
        validateStatus: function (status) {
            return status == 200 || status == 403;
        }
    })
        .then(result => {
            return result.data;
        });
};

interface PostAnswerInterface {
    error?: string;
    isRight: boolean;
}

export const postAnswer = (quizId, login, hash, questionId, answerNum): Promise<PostAnswerInterface> => {
    return axios.post(`${process.env.API_URL}/answer`, {
        quiz: quizId,
        login,
        hash,
        questionId,
        answerNum
    })
        .then(result => result.data);
};
