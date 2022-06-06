import * as request from '..'

describe('测试request请求', () => {
  jest.spyOn(request, 'createAxios')
  const http = request.createAxios()
  test('基础请求之get', async () => {
    const httpMock = jest.spyOn(http, 'get').mockResolvedValue({
      userId: 1,
      id: 2,
      title: 'delectus aut autem',
      completed: false,
    })

    const res = await http.get({
      url: 'https://jsonplaceholder.typicode.com/todos',
    })

    expect(httpMock).toBeCalled()
    expect(res).toEqual({
      userId: 1,
      id: 2,
      title: 'delectus aut autem',
      completed: false,
    })
  })
  test('基础请求之post', async () => {
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
    const httpMock = jest.spyOn(http, 'delete').mockResolvedValue({})

    const res = await http.delete({
      url: 'https://jsonplaceholder.typicode.com/posts/1',
    })

    expect(httpMock).toBeCalled()
    expect(res).toEqual({})
  })

  test('基础请求之request', async () => {
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

  // test('下载文档流', async () => {
  //   const httpMock = jest.spyOn(http, 'downloadByStream').mockResolvedValue()

  //   const res = await http.downloadByStream({})
  //   expect(httpMock).toBeCalled()
  // })
})
