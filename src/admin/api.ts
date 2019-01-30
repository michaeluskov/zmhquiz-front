import axios from "axios";

export const getSession = (password: string) => {
  return axios.post(`${process.env.API_URL}/admin/session`, {
      password
  }, {
      validateStatus: (status) => status == 200 || status == 403
  })
};
