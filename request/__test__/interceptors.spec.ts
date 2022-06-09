import { AxiosResponse } from 'axios'
import { checkStatus, createAxios, Result, ResultEnum } from '..'

// jest.mock('..')

const http = createAxios({
  transform: {
    responseInterceptorsCatch(error: any) {
      const { response, code, message, config } = error || {}
      // console.log('错误了', error)
      const errorMessageMode =
        config?.requestOptions?.errorMessageMode || 'none'
      const msg: string = response?.data?.error?.message ?? ''
      const err: string = error?.toString?.() ?? ''
      // return res
      checkStatus(error?.response?.status, msg, errorMessageMode)
      return Promise.reject(error)
    },
    responseInterceptors(res: AxiosResponse<Result, any>) {
      const resp = res.data
      if (resp.code === ResultEnum.SUCCESS) {
        return res
      }
      const [errMessage, errorMessageMode] = checkStatus(
        resp.code,
        resp.message
      )
      console.log(errMessage)
      throw new Error('错误Oh......')
    },
  },
})

describe('测试统一拦截器', () => {
  test('返回报错400', async () => {
    const httpMock = jest.spyOn(http, 'get').mockResolvedValue({
      code: 400,
      message: '请求的参数不正确',
      data: null,
    })

    await http.get({
      url: 'https://jsonplaceholder.typicod.com/todos/1',
    })
  })
})
