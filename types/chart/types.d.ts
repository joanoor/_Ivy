import type { EChartsOption, BarSeriesOption, XAXisComponentOption } from 'echarts';
declare type SeriesType = 'vbar' | 'hbar' | 'pictorialBar' | 'pie' | 'pie_m' | 'line' | 'scatter' | 'map' | 'scatter-map' | 'sankey' | 'radar' | 'funnel' | 'gauge' | 'polarBar' | 'sunburst' | 'wordCloud';
declare type EchartOpt<T extends string = SeriesType> = {
    [P in T]: EChartsOption;
};
interface CreateConfig {
    type?: SeriesType;
    theme?: ThemeOpt;
    isRealRefresh?: boolean;
    moreOpt?: MoreOpt;
}
interface ThemeOpt {
    name: string;
    theme: Recordable;
}
interface MoreOpt {
    notMerge?: boolean;
    replaceMerge?: string | string[];
    lazyUpdate?: boolean;
}
declare type PropValue<T, U extends keyof T> = NonNullable<T[U]>;
declare type LabelOption = PropValue<BarSeriesOption, 'label'>;
declare type LabelLineOption = PropValue<BarSeriesOption, 'labelLine'>;
declare type ItemStyleOption = PropValue<BarSeriesOption, 'itemStyle'>;
declare type AxisTickOption = PropValue<XAXisComponentOption, 'axisTick'>;
declare type AxisLabelOption = PropValue<XAXisComponentOption, 'axisLabel'>;
declare type AxisLineOption = PropValue<XAXisComponentOption, 'axisLine'>;
declare type AxisPointerOption = PropValue<XAXisComponentOption, 'axisPointer'>;
export { ThemeOpt, MoreOpt, LabelOption, LabelLineOption, ItemStyleOption, AxisTickOption, AxisLabelOption, AxisLineOption, AxisPointerOption, EchartOpt, CreateConfig, };
