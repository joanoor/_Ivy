import type { EChartsOption } from 'echarts'
import type { MoreOpt, ThemeOpt } from './types'
import { IChart } from './Chart'

export function createChart(
  el: HTMLElement,
  opt: EChartsOption = {},
  theme?: ThemeOpt,
  isRealRefresh = false,
  moreOpt: MoreOpt = {}
) {
  const chart = new IChart(el, isRealRefresh, theme)
  chart.setOption(opt, moreOpt)
  return chart
}

export * from './types'
export { IChart }
