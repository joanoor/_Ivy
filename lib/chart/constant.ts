/**
 * echarts的顶级基本配置，例如top、left、bottom、right...
 */

import type { AxisLabelOption, AxisTickOption } from './types'

// 坐标轴刻度相关
const axisTick: AxisTickOption = {
  show: true,
  interval: 0,
  alignWithLabel: true,
  inside: true,
}

const axisLabel: AxisLabelOption = {
  fontSize: 12,
  formatter: function (value): string {
    let back = value
    if (value && value.length > 12) {
      back = value.substring(0, 6) + '\r\n' + value.substring(6, 12) + '...'
    } else if (value.length > 6 && value.length <= 12) {
      back = value.substring(0, 6) + '\r\n' + value.substring(6, 12)
    } else {
      back = value
    }
    return back
  },
}

export { axisTick, axisLabel }
