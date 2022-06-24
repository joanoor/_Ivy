import type { EChartsOption } from 'echarts'
import type { CreateConfig, MoreOpt, ThemeOpt } from './types'
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

export function createChart2(
  el: HTMLElement,
  opt: EChartsOption = {},
  config: CreateConfig = {}
) {
  let chart: IChart
  const { type, theme, isRealRefresh, moreOpt } = config
  if (!type) {
    chart = new IChart(el, isRealRefresh, theme)
    chart.setOption(opt, moreOpt)
  } else {
    chart = new IChart(el, isRealRefresh, theme)
  }
  return chart
}

export * from './types'
export { IChart }
