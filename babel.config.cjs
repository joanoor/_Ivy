const config =
  process.env.NODE_ENV === 'test'
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
