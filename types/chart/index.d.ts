import type { EChartsOption } from 'echarts';
import type { CreateConfig, MoreOpt, ThemeOpt } from './types';
import { IChart } from './Chart';
export declare function createChart(el: HTMLElement, opt?: EChartsOption, theme?: ThemeOpt, isRealRefresh?: boolean, moreOpt?: MoreOpt): IChart;
export declare function createChart2(el: HTMLElement, opt?: EChartsOption, config?: CreateConfig): IChart;
export * from './types';
export { IChart };
