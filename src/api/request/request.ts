/**
 * @author OKOK
 * @date 2024-04-02
 * @desc Axios 二次封装
 */

import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestConfig } from './types'
import { getErrorCode } from './errorCode'
import { EnumStatusCode } from './enumStatusCode'

// 拦截器: 蒙版Loading/token/修改配置

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

class Request {
  instance: AxiosInstance

  // request实例 => axios的实例
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (config.headers) {
          if (localStorage.getItem('token')) {
            config.headers['Authorization'] =
              `Bearer ${localStorage.getItem('token')}`
          }
        }
        console.log('全局请求成功的拦截')
        return config
      },
      (err) => {
        console.log('全局请求失败的拦截')
        return err
      },
    )
    this.instance.interceptors.response.use(
      (res) => {
        if ([200, 201].includes(res.status)) {
          console.log(res)
          console.log('全局响应成功的拦截')
          const { code, data } = res.data
          if (code === EnumStatusCode.SUCCESS_CODE) {
            return data
          } else {
            getErrorCode(code, res)
            return Promise.reject(res)
          }
          return res.data
        } else {
          getErrorCode(res.status, res)
          return Promise.reject(res)
        }
      },
      (err) => {
        console.log('全局响应失败的拦截')
        getErrorCode(err.status, err)
        return err
      },
    )

    // 针对特定的例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn as any,
      config.interceptors?.requestFailureFn,
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn,
    )
  }

  // 封装网络请求的方法
  // T => IHomeData
  request<T = any>(config: HYRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单词响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
  put<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'PUT' })
  }
}

export default Request
