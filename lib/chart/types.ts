import type { EChartsOption, RegisteredSeriesOption } from 'echarts'
import type { Union } from 'ts-toolbelt'

interface ThemeOpt {
  name: string
  theme: Recordable
}

interface MoreOpt {
  notMerge?: boolean
  replaceMerge?: string | string[]
  lazyUpdate?: boolean
}

type IEChartsOption = Required<EChartsOption>
type E = IEChartsOption
type S = RegisteredSeriesOption

type GetType<T extends E, U extends keyof T> = Required<Union.Pop<T[U]>>
type GetSType<T extends S, U extends keyof T> = T[U]

type SeriesType = keyof RegisteredSeriesOption

type ITitleOption = GetType<E, 'title'>
type IGridOption = GetType<E, 'grid'>
type IXAXisOption = GetType<E, 'xAxis'>
type IYAXisOption = GetType<E, 'yAxis'>
type ITooltipOption = GetType<E, 'tooltip'>
type IDataZoomOption = GetType<E, 'dataZoom'>
type IVisualMapOption = GetType<E, 'visualMap'>
type ILegendOption = GetType<E, 'legend'>
type IToolboxOption = GetType<E, 'toolbox'>
type IGeoOption = GetType<E, 'geo'>
type IPolarOption = GetType<E, 'polar'>
type IRadarOption = GetType<E, 'radar'>
type IDataSetOptioin = GetType<E, 'dataset'>
type IAngleAxisOptioin = GetType<E, 'angleAxis'>
type IRadiusAxisOptioin = GetType<E, 'radiusAxis'>

type LineSeries = GetSType<S, 'line'>
type BarSeries = GetSType<S, 'bar'>
type ScatterSeries = GetSType<S, 'scatter'>
type PieSeries = GetSType<S, 'pie'>
type RadarSeries = GetSType<S, 'radar'>
type MapSeries = GetSType<S, 'map'>
type TreeSeries = GetSType<S, 'tree'>
type TreemapSeries = GetSType<S, 'treemap'>
type GraphSeries = GetSType<S, 'graph'>
type GaugeSeries = GetSType<S, 'gauge'>
type FunnelSeries = GetSType<S, 'funnel'>
type ParallelSeries = GetSType<S, 'parallel'>
type SankeySeries = GetSType<S, 'sankey'>
type BoxplotSeries = GetSType<S, 'boxplot'>
type CandlestickSeries = GetSType<S, 'candlestick'>
type EffectScatterSeries = GetSType<S, 'effectScatter'>
type LinesSeries = GetSType<S, 'lines'>
type HeatmapSeries = GetSType<S, 'heatmap'>
type PictorialBarSeries = GetSType<S, 'pictorialBar'>
type ThemeRiverSeries = GetSType<S, 'themeRiver'>
type SunburstSeries = GetSType<S, 'sunburst'>

type LabelOption = Omit<NonNullable<BarSeries['label']>, 'position'>
type LabelLineOption = NonNullable<BarSeries['labelLine']>
type ItemStyleOption = Omit<NonNullable<BarSeries['itemStyle']>, 'borderRadius'>
type AxisTickOption = NonNullable<IXAXisOption['axisTick']>
type AxisLabelOption = NonNullable<IXAXisOption['axisLabel']>
type AxisLineOption = NonNullable<IXAXisOption['axisLine']>
type AxisPointerOption = NonNullable<IXAXisOption['axisPointer']>

export {
  SeriesType,
  ThemeOpt,
  MoreOpt,
  // echart options
  ITitleOption as Title,
  IGridOption as Grid,
  IXAXisOption as XAxis,
  IYAXisOption as YAxis,
  ITooltipOption as Tooltip,
  IDataZoomOption as DataZoom,
  IVisualMapOption as VisualMap,
  ILegendOption as Legend,
  IToolboxOption as Toolbox,
  IGeoOption as Geo,
  IPolarOption as Polar,
  IRadarOption as Radar,
  IDataSetOptioin as DataSet,
  IAngleAxisOptioin as AngleAxis,
  IRadiusAxisOptioin as RadiusAxis,
  // series
  LineSeries as LineS,
  BarSeries as BarS,
  ScatterSeries as ScatterS,
  PieSeries as PieS,
  RadarSeries as RadarS,
  MapSeries as MapS,
  TreeSeries as TreeS,
  TreemapSeries as TreemapS,
  GraphSeries as GraphS,
  GaugeSeries as GaugeS,
  FunnelSeries as FunnelS,
  ParallelSeries as ParallelS,
  SankeySeries as SankeyS,
  BoxplotSeries as BoxplotS,
  CandlestickSeries as CandlestickS,
  EffectScatterSeries as EffectScatterS,
  LinesSeries as LinesS,
  HeatmapSeries as HeatmapS,
  PictorialBarSeries as PictorialBarS,
  ThemeRiverSeries as ThemeRiverS,
  SunburstSeries as SunburstS,
  // more precise minimize
  LabelOption,
  LabelLineOption,
  ItemStyleOption,
  AxisTickOption,
  AxisLabelOption,
  AxisLineOption,
  AxisPointerOption,
}
