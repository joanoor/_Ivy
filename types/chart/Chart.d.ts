/**
 * 封装echarts
 * warning：通常情况下不需要安装@types/echarts，因为发现里面的type和echarts里的不同
 */
import * as echarts from 'echarts';
import type { ECharts, EChartsOption, EChartsCoreOption } from 'echarts';
import type { MoreOpt, ThemeOpt } from './types';
export declare class IChart {
    private echartInstance;
    constructor(el: HTMLElement, isRealRefresh?: boolean, theme?: ThemeOpt);
    /**
     * 初始化echart对象
     * @param el 传进来的dom对象
     * @param isRealRefresh 是否实时刷新，当接口实时返回数据，实时跟新图表的时候，可以设置为true
     * @param theme 主题
     */
    private initChart;
    /**
     * 获取echart实例
     */
    getChartInstance(): echarts.ECharts;
    /**
     * 设置echart对象的option
     * @param chartOption 等同于echart的option
     * @param moreOpt 设置是否合并(默认合并)，懒更新，静默模式
     * [查看官方配置详情](https://echarts.apache.org/zh/api.html#echartsInstance.setOption)
     */
    setOption(chartOption: EChartsOption, moreOpt?: MoreOpt): void;
    /**
     * 当页面变化的时候，重新resize图表
     * @param chart
     */
    resizeChart(chart: ECharts): void;
    /**
     * 更新chart
     * @param chartOption
     * @param option
     */
    refreshChart(chartOption: EChartsOption, option?: MoreOpt): void;
    /**
     * 销毁chart实例
     */
    disposeChart(): void;
    /**
     * 返回chart的option
     * @param el
     */
    getChartOption(el: HTMLCanvasElement): EChartsCoreOption | boolean;
}
