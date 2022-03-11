/**
 * dom相关操作
 */

import { trim, camelCase } from 'lodash-es'
import { _console } from '../utils'
type On = <T extends keyof DocumentEventMap>(
  element: Document,
  event: T,
  handler: (this: Document, ev: DocumentEventMap[T]) => any
) => void
type HasClass = (el: HTMLElement, cls: string) => boolean
type AddClass = (el: HTMLElement, cls: string) => void
type RemoveClass = (el: HTMLElement, cls: string) => void
type GetStyle = (el: HTMLElement, styleName: string) => string
type SetStyle = (el: HTMLElement, styleName: string, value: string) => void

class IDom {
  on: On = (element, event, handler) => {
    element.addEventListener(event, handler, false)
  }

  off: On = (element, event, handler) => {
    element.removeEventListener(event, handler, false)
  }

  hasClass: HasClass = (el, cls) => {
    if (cls.indexOf(' ') !== -1) {
      _console.error('className should not contain space.')
      return false
    }
    if (el.classList) return el.classList.contains(cls)
    else return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }

  addClass: AddClass = (el, cls) => {
    let curClass = el.className
    const classes = (cls || '').split(' ')

    for (let i = 0; i < classes.length; i++) {
      const clsName = classes[i]
      if (!clsName) continue
      if (el.classList) el.classList.add(clsName)
      else if (!this.hasClass(el, clsName)) curClass += ' ' + clsName
    }
    if (!el.classList) el.className = curClass
  }

  removeClass: RemoveClass = (el, cls) => {
    const classes = cls.split(' ')
    let curClass = ' ' + el.className + ' '

    for (let i = 0, j = classes.length; i < j; i++) {
      const clsName = classes[i]
      if (!clsName) continue

      if (el.classList) {
        el.classList.remove(clsName)
      } else if (this.hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ')
      }
    }
    if (!el.classList) {
      el.className = trim(curClass)
    }
  }

  getStyle: GetStyle = (element, styleName) => {
    styleName = camelCase(styleName)
    if (styleName === 'float') styleName = 'cssFloat'
    const computed = document.defaultView?.getComputedStyle(element, '')
    return computed ? computed[styleName] : element.style[styleName]
  }

  setStyle: SetStyle = (element, styleName, value) => {
    styleName = camelCase(styleName)
    element.style[styleName] = value
  }
}

export { IDom }
