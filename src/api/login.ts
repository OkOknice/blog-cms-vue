import client from "./request";
import { ILoginParams } from "./types/login-types";


enum LOGIN_API_ENUM {
  LOGIN_API = '/api/v1/users/login'
}


export const loginApi = (params: ILoginParams) => {
  return client.post({
    url: LOGIN_API_ENUM.LOGIN_API,
    data: params
  });
}