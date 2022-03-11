import { ErrorMessageMode } from './types'

/**
 * 对网络请求返回状态进行处理
 * @param status
 * @param msg
 * @param errorMessageMode
 */
export function checkStatus(
  status: number,
  msg?: string,
  errorMessageMode: ErrorMessageMode = 'message'
): {
  errMessage: string
  errorMessageMode: string
} {
  let errMessage = ''
  switch (status) {
    case 400:
      errMessage = msg || '网络请求参数错误，请联系管理员!'
      break
    case 401:
      errMessage = msg || '用户没有权限（令牌、用户名、密码错误）!'
      break
    case 403:
      errMessage = msg || '用户得到授权，但是访问是被禁止的。!'
      break
    case 404:
      errMessage = msg || '网络请求错误，未找到该资源!'
      break
    case 405:
      errMessage = msg || '网络请求错误，请求方法未允许!'
      break
    case 408:
      errMessage = msg || '网络请求超时!'
      break
    case 500:
      errMessage = msg || '服务器错误，请联系管理员!'
      break
    case 501:
      errMessage = msg || '网络未实现!'
      break
    case 502:
      errMessage = msg || '网络错误!'
      break
    case 503:
      errMessage = msg || '服务不可用，服务器暂时过载或维护!'
      break
    case 504:
      errMessage = msg || '网络超时!'
      break
    case 505:
      errMessage = msg || 'http版本不支持该请求!'
      break
    default:
      errMessage = '未知的网络错误，请联系管理员处理'
  }

  return {
    errMessage,
    errorMessageMode,
  }
}
