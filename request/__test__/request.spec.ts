import { createAxios, IAxios } from '..'

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
    const http = createAxios()
    test('getAxiosInstance', () => {
      const mockGetAxiosInstance = jest.spyOn(http, 'getAxiosInstance')
      const instance = http.getAxiosInstance()
      expect(mockGetAxiosInstance).toBeCalled()
      expect(typeof mockGetAxiosInstance.mock.results[0].value).toEqual(
        typeof instance
      )
    })

    test('configAxios', () => {
      const mockConfigAxios = jest.spyOn(http, 'configAxios')
      http.configAxios({
        timeout: 80000,
      })
      expect(mockConfigAxios).toBeCalled()
    })

    test('setHeader', () => {
      const mockSetHeader = jest.spyOn(http, 'setHeader')
      http.setHeader({
        name: 'xixi',
      })
      expect(mockSetHeader).toBeCalled()
    })
  })

  describe('测试IAxios基础请求请求', () => {
    test('基础请求之get', async () => {
      const http = createAxios({
        transform: {
          requestInterceptors(config, option) {
            return config
          },
        },
        requestOptions: {
          ignoreCancelToken: false,
        },
      })
      const httpMock = jest.spyOn(http, 'get').mockResolvedValue({
        userId: 1,
        id: 2,
        title: 'delectus aut autem',
        completed: false,
      })

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
        id: 2,
        title: 'delectus aut autem',
        completed: false,
      })
    })
    test('基础请求之post', async () => {
      const http = createAxios()
      const httpMock = jest.spyOn(http, 'post').mockResolvedValue({
        id: 101,
        title: 'foo',
        body: 'bar',
        userId: 1,
      })

      const res = await http.post({
        url: 'https://jsonplaceholder.typicode.com/posts',
        data: {
          title: 'foo',
          body: 'bar',
          userId: 1,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      expect(httpMock).toBeCalled()
      expect(res).toEqual({
        id: 101,
        title: 'foo',
        body: 'bar',
        userId: 1,
      })
    })

    test('基础请求之put', async () => {
      const http = createAxios()
      const httpMock = jest.spyOn(http, 'put').mockResolvedValue({
        id: 101,
        title: 'foo',
        body: 'bar',
        userId: 1,
      })

      const res = await http.put({
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        data: {
          id: 1,
          title: 'foo',
          body: 'bar',
          userId: 1,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      expect(httpMock).toBeCalled()
      expect(res).toEqual({
        id: 101,
        title: 'foo',
        body: 'bar',
        userId: 1,
      })
    })

    test('基础请求之delete', async () => {
      const http = createAxios()
      const httpMock = jest.spyOn(http, 'delete').mockResolvedValue({})

      const res = await http.delete({
        url: 'https://jsonplaceholder.typicode.com/posts/1',
      })

      expect(httpMock).toBeCalled()
      expect(res).toEqual({})
    })

    test('基础请求之request', async () => {
      const http = createAxios()
      const httpMock = jest
        .spyOn(http, 'request')
        .mockResolvedValue({ id: 1, title: '...', body: '...', userId: 1 })
      const res = await http.request(
        {
          url: 'https://jsonplaceholder.typicode.com/todos',
          method: 'get',
        },
        {
          formatDate: true,
        }
      )
      expect(httpMock).toBeCalled()
      expect(res).toEqual({ id: 1, title: '...', body: '...', userId: 1 })
    })
  })
})
