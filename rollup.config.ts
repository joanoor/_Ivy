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
import { visualizer } from 'rollup-plugin-visualizer'
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
      format: 'esm',
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
    babel({
      babelHelpers: 'runtime',
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      configFile: resolve(__dirname, '.babelrc'),
    }),
    terser(),
    filesize(),
    visualizer({
      filename: 'visualizer.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  external: [/@babel\/runtime-corejs3/],
})
