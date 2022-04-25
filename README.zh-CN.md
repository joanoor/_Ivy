<div align="center" style="font-size:35px;font-weight:600">ivy2</div>

## 简介

Ivy2是一个自由开源的typescript工具集，可以在流行的web框架`Vue` `React` `Angular`中使用

## 特点

采用技术栈 👍*eslint+prettier+rollup+typescript+babel*打包生成。包括：

1. [axios](https://www.axios-http.cn/)
2. [dayjs](https://dayjs.fenxianglu.cn/)
3. [echarts](https://echarts.apache.org/handbook/zh/get-started/)
4. [element-resize-detector](https://www.npmjs.com/package/element-resize-detector)
5. [qs](https://www.npmjs.com/package/qs)
6. [lodash-es](https://www.npmjs.com/package/lodash-es)
7. [async-validator](https://www.npmjs.com/package/async-validator) 用于表单校验

受到vue-vben-admin启发，ivy2封装了axios，echarts以及生成表单结构和校验操作

## 安装和用法
* 安装   
```$ npm i ivy2 --save```

* 用法
```ts
// example1: 生成echarts
import { createChart, IChart } from 'ivy2'
const chart: IChart = createChart(el, seriesOption, undefined, isRealRefresh)


// example2: 发起网络请求（可以直接请求；也可以二次封装，配置统一拦截）
import { createAxios } from 'ivy2'


// example3: 生成表单解构和校验，简化项目中的代码
import { generateFormAndRules, formChecker } from 'ivy2'
import type { BaseStructs } from 'ivy2'

```
