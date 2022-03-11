import { axisTick, axisLabel } from './constant'
import type { XAXisComponentOption } from 'echarts'

const defaultXAxisConfig: XAXisComponentOption = {
  type: 'category',
  axisTick,
  splitLine: {
    show: false,
  },
  axisLabel,
  nameLocation: 'end',
}

export { defaultXAxisConfig }
