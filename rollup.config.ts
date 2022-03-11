/**
 * 参见：https://www.redream.cn/2021/01/25/rollup%e6%89%93%e5%8c%85%e5%8a%a0%e9%80%9f/
 * https://www.cnblogs.com/sue7/p/11759146.html
 */

import { defineConfig } from 'rollup'
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import path from 'path'
const resolveFile = filePath => path.join(__dirname, filePath)
import { resolve } from 'path'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json')

export default defineConfig({
  input: resolveFile('./index.ts'),
  output: [
    {
      file: resolveFile(pkg.main),
      format: 'es',
      name: 'ivy2',
    },
  ],
  plugins: [
    peerDepsExternal({
      includeDependencies: true,
    }),
    commonjs(),
    nodeResolve({ browser: true }),
    typescript({
      abortOnError: true,
      useTsconfigDeclarationDir: true,
    }),
    // babel({
    //   babelHelpers: 'runtime',
    //   extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
    //   // exclude: [
    //   //   'node_modules/echarts/**',
    //   //   'node_modules/axios/**',
    //   //   'node_modules/dayjs/**',
    //   // ],
    //   plugins: ['@babel/plugin-transform-runtime'],
    // }),
    babel({
      babelHelpers: 'runtime',
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      configFile: resolve(__dirname, '.babelrc'),
    }),
    terser(),
    filesize(),
  ],
  external: [/@babel\/runtime-corejs3/],
})

// export default [
//   {
//     input: resolveFile('./src/index.ts'),
//     output: {
//       file: resolveFile(pkg.main),
//       format: 'esm',
//       name: 'ivy2',
//     },
//     plugins: [
//       commonjs(),
//       nodeResolve({
//         extensions,
//       }),
//       babel({
//         exclude: 'node_modules/**',
//         extensions,
//         babelHelpers: 'bundled',
//       }),
//       terser(),
//     ],
//   },
//   {
//     input: resolveFile('./src/index.ts'),
//     output: {
//       file: resolveFile(pkg.types),
//       format: 'es',
//     },
//     plugins: [typescript()],
//   },
// ]

// export default {
//   input: resolveFile('./src/index.ts'),
//   output: [
//     {
//       file: resolveFile(pkg.main),
//       format: 'esm',
//       name: 'ivy2',
//     },
//     {
//       file: resolveFile(pkg.types),
//       format: 'es',
//     },
//   ],
//   plugins: [
//     commonjs(),
//     nodeResolve(),
//     babel({ babelHelpers: 'bundled' }),
//     typescript(),
//     terser(),
//   ],
// }
