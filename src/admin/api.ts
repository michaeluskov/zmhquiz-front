import axios from "axios";

export const getSession = (password: string) => {
  return axios.post(`${process.env.API_URL}/admin/session`, {
      password
  }, {
      validateStatus: (status) => status == 200 || status == 403
  })
};

export const getQuizes = (sessionId: string) => axios.get(`${process.env.API_URL}/admin/quizes?sessionId=${sessionId}`)
    .then(response => response.data);
