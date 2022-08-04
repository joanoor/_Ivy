import type {
  EChartsOption,
  BarSeriesOption,
  XAXisComponentOption,
} from 'echarts'

type SeriesType =
  | 'vbar'
  | 'hbar'
  | 'pictorialBar'
  | 'pie'
  | 'pie_m'
  | 'line'
  | 'scatter'
  | 'map'
  | 'scatter-map'
  | 'sankey'
  | 'radar'
  | 'funnel'
  | 'gauge'
  | 'polarBar'
  | 'sunburst'
  | 'wordCloud'

type EchartOpt<T extends string = SeriesType> = {
  [P in T]: EChartsOption
}

interface CreateConfig {
  type?: SeriesType
  theme?: ThemeOpt
  isRealRefresh?: boolean
  moreOpt?: MoreOpt
}
// interface EchartOpt{
//   [P in ]
// }

// echarts主题
interface ThemeOpt {
  name: string
  theme: Recordable
}

// echarts更多设置
interface MoreOpt {
  notMerge?: boolean
  replaceMerge?: string | string[]
  lazyUpdate?: boolean
}

type PropValue<T, U extends keyof T> = NonNullable<T[U]>

// 由于每个series中的label、labelLine、itemStyle和axix等配置差不多，所以这里我们以BarSeriesOption为基础，可以得到我们需要的type
type LabelOption = PropValue<BarSeriesOption, 'label'>
type LabelLineOption = PropValue<BarSeriesOption, 'labelLine'>
type ItemStyleOption = PropValue<BarSeriesOption, 'itemStyle'>
type AxisTickOption = PropValue<XAXisComponentOption, 'axisTick'>
type AxisLabelOption = PropValue<XAXisComponentOption, 'axisLabel'>
type AxisLineOption = PropValue<XAXisComponentOption, 'axisLine'>
type AxisPointerOption = PropValue<XAXisComponentOption, 'axisPointer'>

export {
  ThemeOpt,
  MoreOpt,
  LabelOption,
  LabelLineOption,
  ItemStyleOption,
  AxisTickOption,
  AxisLabelOption,
  AxisLineOption,
  AxisPointerOption,
  // customize
  EchartOpt,
  CreateConfig,
}
