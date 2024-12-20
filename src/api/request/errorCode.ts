/**
 * @author OKOK
 * @date 2024-04-02
 * @desc 统一的错误状态码方法
 */

import { ElMessage } from 'element-plus'
import { EnumStatusCode } from './enumStatusCode'
import { useRouter } from 'vue-router'
export const getErrorCode = (code: number, error: any) => {
  let message = ''
  console.log(error)
  switch (code) {
    case EnumStatusCode.AUTH_CODE:
      const router = useRouter()
      router.push('/login')
      message = '未登录'
      break
    case 404:
      message = '网络请求不存在'
      break
    case 500:
      message = '服务器出现问题'
      break
    default:
      message = error.data?.message
      break
  }
  ElMessage({
    type: 'error',
    message,
  })
}
