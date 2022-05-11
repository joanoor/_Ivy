<div align="center" style="font-weight:600">
  <h1>ivy2 

  ![GitHub](https://img.shields.io/github/license/joanor/Ivy?style=plastic) 

  </h1>
</div>

## 简介

Ivy2是一个自由开源的typescript工具集，可以在流行的web框架`Vue`、`React`、`Angular`中使用

## 特点

采用技术栈 👍*eslint+prettier+rollup+typescript+babel*打包生成。依赖包包括如下部分（也就是说你可以直接在项目中引入并使用下列包）：

1. [async-validator](https://www.npmjs.com/package/async-validator) - 用于表单校验
2. [element-resize-detector](https://www.npmjs.com/package/element-resize-detector)
3. [qs](https://www.npmjs.com/package/qs)

如果要使用axios和echarts的相关功能，需要用户自己安装完ivy2之后，再安装axios和echarts
```shell
$ npm i axios
$ npm i echarts
```

## 安装和用法

**INSTALL**   
```$ npm i ivy2 --save```

**API Reference**  
  
🥇 <span style="color:#1e90ff;font-size:16px;font-weight:600">axios相关：<span>  

通过对axios进行封装，实现错误处理，（当接口使用async await时，也可以默认进行错误处理了），并提供了cancel请求服务，还可以设置是否返回原生响应......   
  **🌞 类型**   
  * ```IAxios``` - new 一个新的IAxios实例时，会自动初始化axios并默认生成一个对请求错误进行处理的统一拦截器
  * ```CreateAxiosOptions``` - 继承自axios中的AxiosRequestConfig
  * ```AxiosTransform``` - 转换数据抽象类
  * ```Result``` - 接口返回数据类型
  **🌙 方法**    
  * ```createAxios``` - 生成IAxios类型的实例
  * ```getAxiosInstance``` - IAxios实例方法，获取axios实例
  * ```configAxios``` - IAxios实例方法，配置axios实例
  * ```setHeader``` - IAxios实例方法，设置自定义实例默认headers
  * ```supportFormData``` - IAxios实例方法，通过判断是否以application/x-www-form-urlencoded来进行post请求，对config进行处理
  * ```uploadFile``` - IAxios实例方法，使用formData上传文件（也可以一次上传多个）
  * ```get``` - IAxios实例方法，同axios中的get
  * ```post``` - IAxios实例方法，同axios中的post
  * ```put``` - IAxios实例方法，同axios中的put
  * ```delete``` - IAxios实例方法，同axios中的delete
  * ```request``` - IAxios实例方法，不使用别名get, post, put, delete. 直接使用request方法，通过传入参数来实现调用接口
  * ```downloadByStream``` - IAxios实例方法，下载文件流，此时要直接返回native response（通过配置）
  * ```checkStatus``` - 网络请求返回状态校验集

🥇 <span style="color:#1e90ff;font-size:16px;font-weight:600">echarts相关：<span> 

通过封装```echarts```和```element-resize-detector```实现echarts自适应窗口变化而变化，并且可以设置是否实施刷新echarts  
  **🌞 类型**   
  * ```IChart``` - new一个新的IChart实例时，会自动初始化echarts实例

  **🌙 方法**  
  * ```createChart``` - 生成IChart类型的实例
  * ```getChartInstance``` - IChart实例方法，获取echarts实例
  * ```setOption``` - IChart实例方法，设置echarts的options
  * ```refreshChart``` - IChart实例方法，刷新echarts
  * ```disposeChart``` - IChart实例方法，销毁echarts实例
  * ```getChartOption``` - IChart实例方法，获取echarts的option配置


🥇 <span style="color:#1e90ff;font-size:16px;font-weight:600">form相关：<span>  

通过api我们最终生成一个{_form,_rules}结构的对象，_form就是表单数据，_rules就是表单校验，通过解构赋值可以拿到这两个值  
  **🌞 类型**   
  * ```BaseStructs``` - 准备一个BaseStructs类型的数组，用于生成{_form,_rules}
    
  **🌙 方法**  
  * ```formChecker``` - ivy2自带的校验规则集，通过```async-validator```实现，（在BaseStructs类型的数组中，rule字段中的validator除了自定义之外还可以直接使用formChecker规则集中的规则）目前包括：  
    1. scoreChecker - 校验得分规则是否为空  
    2. phoneChecker - 校验输入的手机号码是否正确  
    3. easyPasswordChecker - 校验简单密码，长度范围是否在6-20位之间  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更多规则还在丰富中............
  * ```generateFormAndRules``` - 用于生成 { _form, _rules }

一个例子：
```ts
// records.ts
import type { BaseStructs } from 'ivy2'
import { formChecker } from 'ivy2'

function createFormAndRule(): BaseStructs
function createFormAndRule() {
  return [
    {
      label: 'username',
      default: '',
      required: true,
      rule: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      id: '',
    },
    {
      label: 'password',
      default: '',
      required: true,
      rule: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: formChecker.easyPasswordChecker(), trigger: 'blur' },
      ],
      id: '',
    },
  ]
}
export const loginFormAndRule = createFormAndRule()

// login.vue
import { loginFormAndRule } from './records'
import { generateFormAndRules } from 'ivy2'
const { _form, _rules } = generateFormAndRules(
  ['username', 'password'],
  loginFormAndRule
)

const loginForm = reactive(_form)
const loginFormRules = reactive(_rules)
// generateFormAndRules的第一个参数是表单的字段名组成的字符串数组
// 生成的loginForm和loginFormRules是符合element-ui plus的响应式数据
```

🥇 <span style="color:#1e90ff;font-size:16px;font-weight:600">其它：<span> 
  
&nbsp;&nbsp;&nbsp;&nbsp;🐻 判断是否属于某种类型（类型谓词）
* ```isString```
* ```isNumber```
* ```isBoolean```
* ```isArray```
* ```isObject```
* ```isDate```
* ```isRegExp```
* ```isWindow```
* ```isElement```
* ```isMap```
* ```isServer```  - 是否为服务器端
* ```isFunction```
* ```isUrl```
* ```isEmpty``` - 是否为空数组 | 空字符串 | 空Map | 空Set | 空对象
* ```isDef``` - 是否不是undefined
* ```isUnDef``` - 是否是undefined
* ```isNullOrUnDef``` - 是否是undefined或者null
* ```isPromise```
* ```isHexColor```  - 是否是十六进制颜色值
* ```autoImport``` - webpack自动引入某一目录下js|ts文件或者样式文件

&nbsp;&nbsp;&nbsp;&nbsp;😽 正则校验表达式  
&nbsp;&nbsp;&nbsp;&nbsp;Pattern类的实例方法：
* ```testId``` - 身份证规则检测
* ```testCn``` - 检测是否为中文
* ```testMobile``` - 手机号码检测
* ```testEmail``` - 邮箱检测
* ```testUrl``` - URL检测
* ```testCarId``` - 车牌检测
* ```testCnName``` - 中文名检测
* ```testEnName``` - 英文名检测
* ```testUserName``` - 用户名检测
* ```testAddress``` - 地址检测
* ```testDate``` - 日期检测
* ```testNumVcode``` - 数字验证码检测
* ```testVcode``` - 其它验证码检测
* ```testCode``` - 编码检测
* ```testHKMc``` - 港澳通行证检测
* ```testTaiWan``` - 台湾通行证检测
* ```testPassport``` - 护照检测
* ```testNum``` - 整数检测
* ```testDecimal``` - 小数或负数，小数后面一位检测
* ```testMoney``` - 金额检测
* ```testTwCome``` - 台胞证检测
* ```testHmHid``` - 港澳台居民居住证
* ```matchRegion``` - 从输入的内容中获取行政区域（特定字符串）  
  一个例子：
  ```ts
  import { pattern } from 'ivy2'
  const isTaiWan = pattern.testTaiWan('123456')
  const isDate = pattern.testDate('123456')
  ```

&nbsp;&nbsp;&nbsp;&nbsp;🐉 其它：
* ```_console```  - 预定义四种console.log的颜色
* ```scrollToTop``` - 指定容器的滚动条平滑滚动回最上面
* ```autoImport``` - 当项目采用wepack时，使用此方法可以自动引入某一目录下js或ts文件或者样式文件
* ```loadScript```  - 以promise的方式在html的head中添加script文件
* ```immediateSetInterval```  - 立即执行的setInterval
* ```getTypeOfValue``` - 返回参数的类型
* ```getPropValue```  - 返回指定对象属性的值
* ```deepMerge``` - 深度合并
* ```awaitWrap```和```willInject``` - 封装promise的ajax请求（当使用IAxios时，可以不用这两个方法了）
* ```formatTime``` - 格式化时间，默认是'YYYY-MM-DD HH:mm:ss'这种格式
* ```setObjToUrlParams``` - 将对象序列化为字符串并添加到url的后面
* ```randomHexColorCode``` - 生成随机的十六进制颜色代码
* ```hexToRGB``` - 16进制颜色转换成rgb颜色
* ```RGBToHex``` - rgb颜色转换成16进制颜色