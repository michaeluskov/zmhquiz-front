import axios from "axios";
import {Quiz} from "../logic/misc";

export const getSession = (password: string) => {
  return axios.post(`${process.env.API_URL}/admin/session`, {
      password
  }, {
      validateStatus: (status) => status == 200 || status == 403
  })
};

export const getQuizes = (sessionId: string) => axios.get(`${process.env.API_URL}/admin/quizes?sessionId=${sessionId}`)
    .then(response => response.data);

export const updateQuiz = (sessionId: string, quiz: Quiz) => axios.post(`${process.env.API_URL}/admin/quiz`, {
    sessionId,
    quiz
});

export const getResults = (sessionId: string, quizId: string) => axios.get(`${process.env.API_URL}/admin/results?quizId=${quizId}&sessionId=${sessionId}`)
    .then(res => res.data);
