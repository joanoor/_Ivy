// 获取命令行中是否包含jest，如果是，说明此时属于测试状态
const config = process.argv[1].includes('jest')
  ? {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
        '@babel/preset-typescript',
      ],
    }
  : {
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: {
              version: '3',
              proposals: true,
            },
          },
        ],
      ],
    }

module.exports = config
