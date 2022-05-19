import { scrollToTop, _console } from '../utils'

describe(`test "utils" module`, () => {
  test('_console', () => {
    _console.log('test _console')
    _console.warn('test _console')
    _console.error('test _console')
    _console.success('test _console')
  })

  test('scrollToTop', () => {
    document.body.innerHTML = `
      <div id="app"></div>
    `
    const myDiv = document.getElementById('app')
    if (myDiv) {
      scrollToTop(myDiv)
    }
  })
})
