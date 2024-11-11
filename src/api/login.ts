import client from './request'
import { ILoginParams } from './types/login-types'

enum LOGIN_API_ENUM {
  LOGIN_API = '/api/v1/users/login',
  USER_INFO = '/api/v1/users/info',
}

// 登录
export const loginApi = (params: ILoginParams) => {
  return client.post({
    url: LOGIN_API_ENUM.LOGIN_API,
    data: params,
  })
}

// 获取用户信息
export const getUserInfoApi = () => {
  return client.get({
    url: LOGIN_API_ENUM.USER_INFO,
  })
}