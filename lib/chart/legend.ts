/**
 * 配置图例Legend
 */

import type { LegendComponentOption } from 'echarts'

/**
 * 默认配置
 */
const defaultLegendConfig: LegendComponentOption = {
  type: 'plain',
  icon: 'circle',
  show: true,
  left: 'center',
  top: 5,
  right: 'auto',
  bottom: 'auto',
  data: [],
  itemHeight: 10,
  width: '100%',
  textStyle: {
    fontSize: '10',
  },
}

export { defaultLegendConfig }
