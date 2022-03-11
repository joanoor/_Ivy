import type { EChartsOption } from 'echarts'
import type { MoreOpt, ThemeOpt } from './types'
import { deepMerge } from '../utils'
import { IChart } from './Chart'
import { defaultLegendConfig } from './legend'
import { defaultTitleConfig } from './title'
import { defaultGridConfig } from './grid'
import { defaultTooltipConfig } from './tooltip'
import { defaultXAxisConfig } from './xAxis'
import { defaultYAxisConfig } from './yAxis'

export function createChart(
  el: HTMLElement,
  opt: EChartsOption = {},
  isRealRefresh = false,
  theme?: ThemeOpt,
  moreOpt: MoreOpt = {}
) {
  const chart = new IChart(el, isRealRefresh, theme)
  chart.setOption(
    deepMerge<EChartsOption>(
      {
        title: defaultTitleConfig,
        legend: defaultLegendConfig,
        grid: defaultGridConfig,
        tooltip: defaultTooltipConfig,
        xAxis: defaultXAxisConfig,
        yAxis: defaultYAxisConfig,
      },
      opt || {}
    ),
    moreOpt
  )
  return chart
}

export * from './types'
export { IChart }
