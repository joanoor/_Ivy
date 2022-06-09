import qs from 'qs'
import { ContentTypeEnum, createAxios } from '..'
import { IAxios } from '../Axios'

describe('测试request请求模块', () => {
  describe('createAxios：返回IAxios实例', () => {
    test('不带参数返回IAxios实例', () => {
      const http = createAxios()
      expect(http instanceof IAxios).toEqual(true)
    })

    test('带参数返回IAxios实例', () => {
      const http = createAxios({
        timeout: 30000,
        requestOptions: {
          ignoreCancelToken: false,
        },
      })
      expect(http instanceof IAxios).toEqual(true)
    })
  })

  describe('测试IAxios基础非请求方法', () => {
    test('getAxiosInstance', () => {
      const http = createAxios()
      const mockGetAxiosInstance = jest.spyOn(http, 'getAxiosInstance')
      const instance = http.getAxiosInstance()
      expect(mockGetAxiosInstance).toBeCalled()
      expect(typeof mockGetAxiosInstance.mock.results[0].value).toEqual(
        typeof instance
      )
    })

    test('configAxios', () => {
      const http = createAxios()
      const mockConfigAxios = jest.spyOn(http, 'configAxios')
      http.configAxios({
        timeout: 80000,
      })
      expect(mockConfigAxios).toBeCalled()
    })

    test('setHeader', () => {
      const http = createAxios()
      const mockSetHeader = jest.spyOn(http, 'setHeader')
      http.setHeader({
        name: 'xixi',
      })
      expect(mockSetHeader).toBeCalled()
    })
  })

  describe('测试IAxios基础请求', () => {
    test('get请求', async () => {
      const http = createAxios({
        requestOptions: {
          ignoreCancelToken: false,
          isReturnNativeResponse: false,
          isTransformResponse: false,
        },
      })
      const httpMock = jest.spyOn(http, 'get')
      const res = await http.get(
        {
          url: 'https://jsonplaceholder.typicode.com/todos/1',
        },
        {
          ignoreCancelToken: false,
        }
      )
      expect(httpMock).toBeCalled()
      expect(res).toEqual({
        userId: 1,
        id: 1,
        title: 'delectus aut autem',
        completed: false,
      })
    })

    test('post请求', async () => {
      const http = createAxios()
      const httpMock = jest.spyOn(http, 'post')
      const res = await http.post(
        {
          url: 'https://jsonplaceholder.typicode.com/posts',
          data: {
            title: 'foo',
            body: 'bar',
            userId: 1,
          },
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        },
        {
          isReturnNativeResponse: false,
          isTransformResponse: false,
        }
      )
      expect(httpMock).toBeCalled()
      expect(res).toEqual({
        id: 101,
        title: 'foo',
        body: 'bar',
        userId: 1,
      })
    })

    test('post请求(x-www-form-urlencoded方式)', async () => {
      const http = createAxios()
      const httpMock = jest.spyOn(http, 'post')
      const res = await http.post(
        {
          url: 'https://jsonplaceholder.typicode.com/posts',
          data: {
            title: 'foo',
            body: 'bar',
            userId: 1,
          },
          headers: {
            'Content-Type': ContentTypeEnum.FORM_URLENCODED,
          },
        },
        {
          isReturnNativeResponse: false,
          isTransformResponse: false,
        }
      )
      expect(httpMock).toBeCalled()
      expect(res).toEqual({
        id: 101,
        title: 'foo',
        body: 'bar',
        userId: '1',
      })
    })

    test('put请求', async () => {
      const http = createAxios()
      const httpMock = jest.spyOn(http, 'put')

      const res = await http.put(
        {
          url: 'https://jsonplaceholder.typicode.com/posts/1',
          data: {
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1,
          },
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        },
        {
          isReturnNativeResponse: false,
          isTransformResponse: false,
        }
      )
      expect(httpMock).toBeCalled()
      expect(res).toEqual({
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
      })
    })

    test('delete请求', async () => {
      const http = createAxios()
      const httpMock = jest.spyOn(http, 'delete')
      const res = await http.delete(
        {
          url: 'https://jsonplaceholder.typicode.com/posts/1',
        },
        {
          isReturnNativeResponse: false,
          isTransformResponse: false,
        }
      )

      expect(httpMock).toBeCalled()
      expect(res).toEqual({})
    })

    test('request请求', async () => {
      const http = createAxios()
      const httpMock = jest.spyOn(http, 'request')
      const res = await http.request({
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        method: 'get',
      })
      expect(httpMock).toBeCalled()
      // expect(res).toEqual({
      //   userId: 1,
      //   id: 1,
      //   title: 'delectus aut autem',
      //   completed: false,
      // })
    })
  })
})
