import { AxisLabelOption, AxisTickOption, EchartOpt } from './types'
import type {
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from 'echarts'

// 标题
const title: TitleComponentOption = {
  text: '',
  top: '5',
  left: '10',
  textStyle: {
    fontSize: '16',
    fontWeight: 'normal',
  },
}

// 图例
const legend: LegendComponentOption = {
  top: '0',
  icon: 'circle',
  itemHeight: 10,
  type: 'scroll', // 图例多的时候出现滚动条
  width: '70%', // 图例最多占一半的宽度
  selectedMode: false, // 图标不可点
  right: '60', // 图例居中对齐
  textStyle: {
    fontSize: '14',
  },
}

// 笛卡尔坐标轴下图表的间距
export const setGrid = (grid: GridComponentOption): GridComponentOption => {
  return {
    containLabel: true, // 区域是否包含坐标轴的刻度标签。
    left: '32',
    top: '35', // 上部需要放置坐标轴名称和图例
    bottom: '75', // 下边会有拖动轴
    right: '32',
    ...grid
  }
}

// 坐标轴刻度相关
export const setAxisTick = (axisTick: AxisTickOption): AxisTickOption => {
  return {
    show: true,
    interval: 'auto',
    length: 5,
    alignWithLabel: true,
    inside: false, // true 刻度线朝内，false 刻度线朝外
    ...axisTick
  }
}


const axisLabel: AxisLabelOption = {
  // 函数参数分别为刻度数值（类目），刻度的索引
  formatter: function (value: string) {
    return value && value.length > 6 ? value.substring(0, 5) + '...' : value
  },
}

const textStyle = {
  fontFamily: 'Microsoft YaHei',
  fontSize: '14',
}

// 横坐标轴
const xAxis: XAXisComponentOption = {
  type: 'category',
  data: [],
  splitLine: {
    show: true,
  },
  axisLabel,
  nameLocation: 'end',
  name: '',
}

// 纵坐标轴
const yAxis: YAXisComponentOption = {
  type: 'value',
  splitLine: {
    show: true,
  },
  axisLabel,
  axisTick: {
    show: false,
  },
  name: '',
}

const BaseChart: EchartOpt = {
  vbar: {}, // 垂直柱状图
  hbar: {}, // 水平柱状图
  pictorialBar: {},
  pie: {
    series: {
      type: 'pie',
      radius: ['0%', '55%'],
      center: ['50%', '50%'],
      data: [],
      label: {
        show: true,
        formatter: '{b}:\n{c} ({d}%)',
      },
      labelLine: {
        show: true,
      },
    },
  },
  pie_m: {
    series: {
      type: 'pie',
      // clockWise: true,
      itemStyle: {
        // label: {
        //   show: true,
        //   position: 'outside'
        // },
        // labelLine: {
        //   show: true
        // }
      },
    },
  },
  line: {},
  scatter: {},
  map: {},
  'scatter-map': {},
  sankey: {},
  radar: {},
  funnel: {},
  gauge: {},
  polarBar: {},
  sunburst: {},
  wordCloud: {},
}

export { BaseChart }
