<div align="center" style="font-weight:600">
  <h1>ivy2 

  ![GitHub](https://img.shields.io/github/license/joanor/Ivy?style=plastic) 

  </h1>
</div>

**English** | [中文](./README.zh-CN.md)

## Introduction

Ivy2 is a free and open source typescript toolbox.can be used in `Vue`,  `React`, `Angular`

## Feature

use 👍*eslint+prettier+rollup+typescript+babel*. The dependency package includes the following parts(That is to say, you can directly import and use the following packages in your project):

1. [async-validator](https://www.npmjs.com/package/async-validator) - form validator
2. [element-resize-detector](https://www.npmjs.com/package/element-resize-detector)
3. [qs](https://www.npmjs.com/package/qs)

If you want to use the related functions of axios and echarts, you need to install axios and echarts after installing ivy2 by yourself.
```shell
$ npm i axios
$ npm i echarts
```
## Install and usage

**INSTALL**  

```$ npm i ivy2 --save```  
Note: ivy2 encapsulates axios and echarts, if you want to enable related operations, execute:  
```$ npm i ivy2 axios echarts--save```

**API Reference**  

🥇 <span style="color:#1e90ff;font-size:16px;font-weight:600">axios related:<span>  

By encapsulating axios to implement error handling (when the interface uses async await, error handling can also be performed by default), and provide cancel request service, and you can also set whether to return native response...  

 **🌞 type**  
 * ```IAxios``` - When a new IAxios instance is created, axios is automatically initialized and a unified interceptor that handles request errors is generated by default.
 * ```CreateAxiosOptions```  
 * ```AxiosTransform```  
 * ```Result```  
  
 **🌙 method**   
 * ```createAxios``` - Generate an instance of the IAxios type  
 * ```getAxiosInstance``` - IAxios instance method, get axios instance
 * ```configAxios``` - IAxios instance method, configure axios instance
 * ```setHeader``` - IAxios instance method, set custom instance default headers
 * ```supportFormData``` - IAxios instance method, by judging whether the post request is made with application/x-www-form-urlencoded, and the config is processed
 * ```uploadFile``` - IAxios instance method, use formData to upload files (you can also upload multiple at a time)
 * ```get``` - IAxios instance method, same as get in axios
 * ```post``` - IAxios instance method, same as post in axios
 * ```put``` - IAxios instance method, same as put in axios
 * ```delete``` - IAxios instance method, same as delete in axios
 * ```request``` - IAxios instance methods, do not use aliases get, post, put, delete. Use the request method directly, and implement the calling interface by passing in parameters
 * ```downloadByStream``` - IAxios instance method, download the file stream, and return the native response directly (through configuration)
 * ```checkStatus``` - The network request returns the status check set

🥇 <span style="color:#1e90ff;font-size:16px;font-weight:600">echarts related:<span>  
 
By encapsulating ```echarts`` and ```element-resize-detector``` to implement echarts adaptive window changes, and you can set whether to implement refresh echarts  

  **🌞 type**   
  * ```IChart``` - When a new IChart instance is created, the echarts instance is automatically initialized

  **🌙 method**  
  * ```createChart``` - Generate an instance of the IChart type
  * ```getChartInstance``` - IChart instance method, get echarts instance
  * ```setOption``` - IChart instance method, set the options of echarts
  * ```refreshChart``` - IChart instance method, refresh echarts
  * ```disposeChart``` - IChart instance method, destroy the echarts instance
  * ```getChartOption``` - IChart instance method, get the option configuration of echarts


🥇 <span style="color:#1e90ff;font-size:16px;font-weight:600">form related:<span>  

Through the api, we finally generate an object of {_form, _rules} structure, _form is the form data, _rules is the form validation, these two values ​​can be obtained by destructuring assignment  

  **🌞 type**   
  * ```BaseStructs``` - Prepare an array of type BaseStructs for generating {_form,_rules}
    
  **🌙 method**  
  * ```formChecker``` - 
The validation rule set that comes with ivy2 is implemented through ``async-validator``` (in the array of BaseStructs type, the validator in the rule field can directly use the rules in the formChecker rule set in addition to customization) Currently include:  
    1. scoreChecker - Check if scoring rule is empty  
    2. phoneChecker - Verify that the entered mobile number is correct  
    3. easyPasswordChecker - 
Check the simple password, whether the length range is between 6-20 digits

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;More rules are still being enriched...
  * ```generateFormAndRules``` - for generating { _form, _rules }

example:
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
      rule: [{ required: true, message: 'please input user name', trigger: 'blur' }],
      id: '',
    },
    {
      label: 'password',
      default: '',
      required: true,
      rule: [
        { required: true, message: 'please input password', trigger: 'blur' },
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
// The first parameter of generateFormAndRules is an array of strings consisting of the field names of the form
// The generated loginForm and loginFormRules are responsive data conforming to element-ui plus
```

🥇 <span style="color:#1e90ff;font-size:16px;font-weight:600">other:<span> 
  
&nbsp;&nbsp;&nbsp;&nbsp;🐻 Determine if it is of a certain type (type predicate)
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
* ```isServer```  - is server-side
* ```isFunction```
* ```isUrl```
* ```isEmpty``` - is an empty array | an empty string | an empty Map | an empty Set | an empty object
* ```isDef``` - is undefined
* ```isUnDef``` - is not undefined
* ```isNullOrUnDef``` - is undefined or null
* ```isPromise```
* ```isHexColor```  - is hex color value
* ```getTypeOfValue``` - the type of the return parameter

&nbsp;&nbsp;&nbsp;&nbsp;😽 Regular check expression   
&nbsp;&nbsp;&nbsp;&nbsp;Instance methods of the Pattern class:
* ```testIdCardNo``` - ID rule detection
* ```testCn``` - Check if it is Chinese
* ```testMobile``` - Mobile number detection
* ```testEmail``` - Mailbox detection
* ```testUrl``` - URL detection
* ```testCarId``` - License plate detection
* ```testDate``` - Check if the input is a date
* ```testHKMc``` - Hong Kong and Macau Pass Testing
* ```testTaiWan``` - Taiwan Pass Inspection
* ```testPassport``` - Passport detection
* ```testNum``` - Integer detection
* ```testDecimal``` - Check for decimals
* ```testTwCome``` - Taiwan compatriot certificate test
* ```testHmHid``` - Residence Permit for Hong Kong, Macao and Taiwan Residents
  example:
  ```ts
  import { pattern } from 'ivy2'
  const isTaiWan = pattern.testTaiWan('123456')
  const isDate = pattern.testDate('123456')
  ```

&nbsp;&nbsp;&nbsp;&nbsp;🐉 others:
* ```_console```  - Predefined four console.log colors
* ```scrollToTop``` - The scroll bar of the specified container scrolls back to the top smoothly
* ```autoImport``` - When the project adopts wepack, use this method to automatically import js or ts files or style files in a certain directory
* ```loadScript```  - Add script files in the head of html in the way of promise
* ```pollingAction```  - Define a polling method
* ```getPropValue```  - Returns the value of the specified object property
* ```deepMerge``` - deep merge
* ```awaitWrap```and```willInject``` - Ajax request that encapsulates promise (when using IAxios, these two methods can be omitted)
* ```setObjToUrlParams``` - Serialize object to string and append to url
* ```randomHexColorCode``` - Generate random hex color codes
* ```hexToRGB``` - Convert hexadecimal color to rgb color
* ```RGBToHex``` - Convert rgb color to hexadecimal color
