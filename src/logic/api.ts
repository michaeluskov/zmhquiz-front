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
    rightAnswerNum: number;
}

function axiosPostAnswer(login, hash, questionNum, answerNum, quizId) {
    return axios.post(`${process.env.API_URL}/answer`, {
        login,
        hash,
        questionNum,
        answerNum,
        quiz: quizId
    });
}

export const postAnswer = (quizId, login, hash, questionNum, answerNum): Promise<PostAnswerInterface> => {
    return axiosPostAnswer(login, hash, questionNum, answerNum, quizId)
        .catch(() =>
            wait(2000)
                .then(() => axiosPostAnswer(login, hash, questionNum, answerNum, quizId)))
        .catch(() =>
            wait(2000)
                .then(() => axiosPostAnswer(login, hash, questionNum, answerNum, quizId)))
        .then(result => result.data)
};
